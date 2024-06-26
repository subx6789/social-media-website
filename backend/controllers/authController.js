const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let otpMap = new Map();

exports.registerUser = async (req, res) => {
  const { name, email, age, username, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      age,
      username,
      password,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD);
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        res.status(400).json({
          message: "Invalid Credentials",
        });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD);
        return res.json({
          token,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpMap.set(email, otp);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Account Verification OTP",
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const storedOtp = otpMap.get(email);

    if (storedOtp === otp) {
      otpMap.delete(email);

      const user = await User.findOne({ email });
      if (user) {
        user.isVerified = true;
        await user.save();
        res.status(200).json({
          message: "Account verified successfully",
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid OTP",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
