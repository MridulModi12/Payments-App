
# PayTM Clone

This project is a basic version of PayTM, a popular digital wallet and payment app. It includes features such as user signup, signin, balance checking, and money transfer between users.

## Features

- **User Signup**: Users can create a new account by providing their first name, last name, email, and password.
- **User Signin**: Existing users can sign in using their email and password.
- **Dashboard**: Users can view their account balance and a list of other users.
- **Send Money**: Users can transfer money to other users by selecting a user from the list and entering the amount.
- **Transaction Success**: Users are notified when a transaction is successful.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Deployment**: Vercel

## Environment Variables

The project uses the following environment variables:

- **Frontend**: 
  - `VITE_API_BACKEND_URL`: URL of the backend API

- **Backend**:
  - `FRONTEND_URL`: URL of the frontend
  - `PORT`: Port number for the backend server
  - `jwtSecret`: Secret key for JWT
  - `mongoURL`: MongoDB connection URL

## Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/paytm-clone.git
   cd paytm-clone
   
2. **Install dependencies**:
   - **Frontend**:
     ```sh
     cd frontend
     npm install
     ```
   - **Backend**:
     ```sh
     cd backend
     npm install
     ```

3. **Create `.env` files**:
   - **Frontend**: Create a `.env` file in the [frontend](http://_vscodecontentref_/0) directory with the following content:
     ```
     VITE_API_BACKEND_URL=http://localhost:3000
     ```
   - **Backend**: Create a `.env` file in the `backend` directory with the following content:
     ```
     FRONTEND_URL=http://localhost:5173
     PORT=3000
     jwtSecret=your_jwt_secret
     mongoURL=your_mongo_url
     ```

4. **Run the application**:
   - **Frontend**:
     ```sh
     cd frontend
     npm run dev
     ```
   - **Backend**:
     ```sh
     cd backend
     npm run devStart
     ```

5. **Access the application**:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## Deployed Application

The application is deployed on Vercel. You can access it using the following link:

[https://payments-app-43qo.vercel.app/signup](https://payments-app-43qo.vercel.app/signup)

## Project Structure

- **frontend**: Contains the React frontend code.
  - **src**: Contains the source code for the frontend.
    - **components**: Contains reusable React components.
    - **pages**: Contains the main pages of the application.
  - **public**: Contains static assets.
  - **index.html**: The main HTML file.
  - **vite.config.js**: Vite configuration file.
  - **tailwind.config.js**: Tailwind CSS configuration file.
  - **postcss.config.js**: PostCSS configuration file.

- **backend**: Contains the Node.js backend code.
  - **routes**: Contains the API routes.
  - **middleware.js**: Contains the authentication middleware.
  - **db.js**: Contains the MongoDB models and connection setup.
  - **index.js**: The main entry point for the backend server.
  - **config.js**: Contains configuration settings.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or inquiries, please contact [modi.mridul0828@gmail.com](mailto:modi.mridul0828@gmail.com).
