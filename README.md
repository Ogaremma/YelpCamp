YelpCamp — Backend Service

YelpCamp is a backend-driven web application that exposes RESTful endpoints for managing campgrounds and reviews with secure user authentication and authorization.

The project demonstrates practical backend engineering concepts such as data modeling, access control, middleware composition, and server-side architecture using Node.js and MongoDB.

Backend Responsibilities

This backend is responsible for:

User authentication and session management

Authorization and ownership enforcement

Persistent storage of campgrounds and reviews

Data validation and error handling

RESTful API routing and controller separation

Tech Stack

Node.js — server runtime

Express.js — HTTP server and routing

MongoDB — primary datastore

Mongoose — schema definition and data relationships

Passport.js — authentication strategy

Express-session — session persistence

Architecture & Design

The application follows a modular MVC-inspired architecture:

Models encapsulate database schemas and relationships

Routes define HTTP endpoints and apply middleware

Controllers handle business logic

Middleware enforces authentication, authorization, and validation

This separation improves maintainability and makes it easier to reason about request flow and access control.

Authentication & Authorization

Authentication is implemented using Passport.js (local strategy)

Sessions are managed using signed cookies

Authorization middleware ensures:

Only authenticated users can create resources

Only resource owners can modify or delete campgrounds and reviews

This prevents unauthorized access and enforces ownership at the server level.

Data Modeling

Primary models:

User

Username

Hashed password

Associated campgrounds and reviews

Campground

Title

Description

Price

Location

Author reference

Associated reviews

Review

Rating

Body

Author reference

Campground reference

Relationships are modeled using ObjectId references to maintain integrity while keeping queries flexible.

API Overview

Below is a high-level overview of the main backend routes.

Authentication
Method	Route	Description
POST	/register	Create a new user
POST	/login	Authenticate user
POST	/logout	End user session
Campgrounds
Method	Route	Description	Auth
GET	/campgrounds	Get all campgrounds	Public
GET	/campgrounds/:id	Get single campground	Public
POST	/campgrounds	Create campground	Required
PUT	/campgrounds/:id	Update campground	Owner only
DELETE	/campgrounds/:id	Delete campground	Owner only
Reviews
Method	Route	Description	Auth
POST	/campgrounds/:id/reviews	Add review	Required
DELETE	/reviews/:id	Delete review	Owner only
Error Handling

Invalid routes return appropriate HTTP errors

Authorization failures are handled via middleware

Server errors are caught and rendered gracefully

This ensures predictable behavior and safer failure modes.

Local Development
Clone repository
git clone https://github.com/Ogaremma/YelpCamp.git
cd YelpCamp

Install dependencies
npm install

Environment configuration

Create a .env file:

DB_URL=mongodb://localhost:27017/yelpcamp
SESSION_SECRET=your_secret

Start server
npm start


Server runs on:

http://localhost:3000

Design Trade-offs & Notes

Server-rendered views were used for simplicity instead of a separate frontend client

Session-based authentication was chosen over JWT for ease of stateful auth

MongoDB was selected for flexible schema evolution during development

These choices prioritize clarity and learning over production-scale optimization.

Why This Project Matters

This repository serves as proof of backend competency in:

RESTful API design

Authentication and authorization

Database relationships

Middleware-driven request flow

Writing maintainable server-side code