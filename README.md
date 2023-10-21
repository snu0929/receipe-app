# Recipe App

Welcome to the Recipe App! This application allows users to search for recipes, view recipe details, and save their favorite recipes.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Recipe App is a web application that enables users to explore a wide variety of recipes. Users can register, log in, and search for recipes. They can view detailed information about each recipe, including ingredients and instructions. Additionally, users can save their favorite recipes.

## Technologies Used

The Recipe App is built using the following technologies and tools:

- Frontend:
  - React
  - React Router
  - Chakra UI
  - Axios

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JSON Web Tokens (JWT) for authentication

## Features

- User Registration: Users can create accounts by providing their email and password.

- User Login: Registered users can log in using their email and password.

- Recipe Search: Users can search for recipes by entering keywords.

- View Recipe Details: Users can click on a recipe to view its details, including ingredients and instructions.

- Save as Favorite: Logged-in users can save recipes as favorites.

## Getting Started

To run the Recipe App locally, follow these steps:

1. Clone this repository to your local machine.

2. Install the required dependencies for both the frontend and backend by running the following commands in the respective directories:
   
   - Frontend:
     ```bash
     cd frontend/recipe-app
     npm install
     ```
   
   - Backend:
     ```bash
     cd backend
     npm install
     ```

3. Configure environment variables for the backend. Create a `.env` file in the `backend` directory and define the following variables:

   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secret key for generating JWT tokens.

4. Start the frontend and backend servers. Run the following commands in their respective directories:

   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

   - Backend:
     ```bash
     cd backend
     npm start
     ```

5. Access the Recipe App in your web browser at `http://localhost:3000`.

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in a user.
- `GET /api/recipes/search`: Search for recipes.
- `GET /api/recipes/details/:recipeId`: Get detailed information about a recipe.
- `POST /api/users/favorites`: Save a recipe as a favorite.

## Environment Variables

- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret key for generating JWT tokens.

## Deployment

You can deploy the Recipe App on platforms like Vercel for the frontend and Heroku for the backend.

## Contributing

We welcome contributions from the community. If you'd like to contribute to this project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
