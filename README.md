Event Management System

A full-stack Event Management Web Application built with React.js, Node.js, Express, MongoDB, and Tailwind CSS.
Users can view events, register for them, and manage their registrations. Authentication is handled using JWT tokens stored in cookies.

Table of Contents

Features

Technologies Used

Folder Structure

Setup Instructions

Environment Variables

API Endpoints

Authentication

Screenshots

License

Features

User registration and login with JWT authentication

View upcoming and past events

Search and filter events by location and category

Register for events (with seat availability check)

View event details in a modal popup

Responsive design using Tailwind CSS

Auto-disable registration button for past events or when seats are full

Logout functionality with token removal

Technologies Used

Frontend: React.js, Tailwind CSS, Axios, React Icons, js-cookie

Backend: Node.js, Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken, Joi validation

Other Tools: Postman for API testing

Folder Structure
event-management/
├── backend/
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── validators/ # Joi validation
│ ├── server.js # Express server
├── frontend/
│ ├── src/
│ │ ├── components/ # Navbar, Loader, etc.
│ │ ├── context/ # AuthContext for user state & login/logout
│ │ ├── pages/ # Home, Login, Profile pages
│ │ ├── App.js
│ │ ├── index.js
│ │ └── index.css
├── package.json
└── README.md

Setup Instructions
Backend

Clone the repository:

git clone
cd backend

Install dependencies:

npm install

Create .env file in the backend folder:

PORT=5000
MONGO_URI=<your-mongodb-uri>
MY_SECRET=<your-jwt-secret>

Run the server:

npm run dev

Frontend

Navigate to frontend:

cd frontend

Install dependencies:

npm install

Create .env file in the frontend folder (optional for API URL):

REACT_APP_API_URL=http://localhost:5000/api

Start the React app:

npm start

Environment Variables

PORT - Backend server port

MONGO_URI - MongoDB connection URI

MY_SECRET - JWT secret for token generation

REACT_APP_API_URL - Base URL for frontend API calls

API Endpoints
Auth
Method Endpoint Description
POST /api/register Register new user
POST /api/login Login user & return token
POST /api/logout Clear token / logout
Events
Method Endpoint Description
GET /api/events Get events (with search & filters)
POST /api/register/:eventId Register user for an event
Authentication

JWT token is stored in cookies using js-cookie

AuthContext manages user state across the app

Logout removes token and clears local storage

Frontend Features

Search: Filter events by name

Location & Category Filters: Dropdown filters for events

Conditional Buttons: Register button disables automatically if seats are full or event is past

Modals: View event details or confirm registration in a popup
