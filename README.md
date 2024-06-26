# Social Media Backend

This project is a backend for a social media website where users can create an account, login, verify their account via email, create posts, edit posts, delete posts, like posts, dislike posts if liked earlier, comment on post and view other users' profiles and their posts.

## Features

- User Registration
- User Login
- Email Verification with OTP
- Create Posts
- Edit Posts
- Delete Posts
- Like Posts
- Dislike Posts if liked earlier
- Comment on Posts
- View All Posts
- View Other Users' Profiles and Their Posts

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- zod (for schema validation)
- nodemailer (for email sending)

## Installation

**Clone the repository:**

   ```bash
    git clone https://github.com/subx6789/social-media-website.git
    cd social-media-backend
   ``` 

**Install the dependencies:**

   ```bash
    npm install
   ``` 

**Create a .env file in the root directory and add the following environment variables:**

   ```bash
    PORT=your_port_no
    MONGO_URL=your_mongo_db_connection_string
    JWT_PASSWORD=your_jwt_secret
    EMAIL=your_email@gmail.com
    EMAIL_PASSWORD=your_app_password
   ``` 

**Start the server:**

   ```bash
    npm start
   ``` 

## API Endpoints

**Authentication Routes**

- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Login an existing user.
- `POST /auth/send-otp` - Send OTP for email verification.
- `POST /auth/verify-otp` - Verify OTP to complete email verification.

**User Routes**

- `GET /profile/:id` - Get a user's profile and their posts.

**Post Routes**

- `GET /` - Get all posts.
- `POST /` - Create a new post.
- `PUT /:id` - Update an existing post.
- `DELETE /:id` - Delete a post.
- `POST /:id/like` - Like a post.
- `POST /:id/comment` - Comment on a post.
- `POST /:id/dislike` - Dislike a post (if liked previously).

## Project Structure

   ```lua
    backend/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── postController.js
    │   └── userController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── validate.js
    ├── models/
    │   ├── User.js
    │   └── Post.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── userRoutes.js
    ├── schema/
    │   └── userSchema.js
    ├── .env
    ├── package.json
    ├── package-lock.json
    └── server.js
   ``` 

## Usage

**Register a User**

Send a POST request to `/auth/register` with the following JSON body:

   ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": "25",
      "username": "johndoe",
      "password": "password123"
    }
   ``` 

**Login a User**
Send a POST request to `/auth/login` with the following JSON body:

   ```json
    {
      "username": "johndoe",
      "password": "password123"
    }
   ``` 

**Create a Post**

Send a POST request to `/` with the following JSON body (requires authentication):

   ```json
    {
      "postLink": "http://example.com/your-post"
    }
   ```

**Edit a Post**

Send a PUT request to `/:id` with the following JSON body (requires authentication):

   ```json
    {
      "postLink": "http://example.com/your-updated-post"
    }
   ```

**Delete a Post**

Send a DELETE request to `/:id` (requires authentication).

**View a User's Profile**

Send a GET request to `/profile/:id` (requires authentication).

**Like a Post**

Send a POST request to `/:id/like` (requires authentication).

**Comment on a Post**

Send a POST request to `/:id/comment` with the following JSON body (requires authentication):

   ```json
    {
      "text": "This is a comment"
    }
   ```

**Dislike a Post**

Send a POST request to `/:id/dislike` (requires authentication).

**Contributing**

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

**License**

This project is licensed under the MIT License. [Click](./LICENSE) here for complete details.