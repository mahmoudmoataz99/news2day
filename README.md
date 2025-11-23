# News2Day - Full Stack Application

A modern full-stack web application built with React frontend and NestJS backend, featuring article management, user authentication, and category organization.

## Overview

News2Day is a content management platform that enables users to create, read, organize, and manage articles. The application provides a seamless experience for content creators and readers with intuitive article browsing, category filtering, user profiles, and account management.

### Key Features

- **Article Management** - Create, view, edit, and delete articles with rich content
- **Category System** - Organize articles by categories for easy discovery and filtering
- **User Authentication** - Secure signup and login with JWT-based authentication
- **User Profiles** - Manage personal profiles and view user information
- **Settings Management** - Customize user preferences and account settings
- **Article Discovery** - Browse all articles with category-based filtering
- **Responsive Design** - Mobile-friendly interface built with Tailwind CSS
- **Modern Architecture** - Scalable backend with modular NestJS design

### What You Can Do

1. **Create Content** - Write and publish new articles
2. **Discover Articles** - Browse articles on the homepage or view the complete article catalog
3. **Filter by Category** - Find articles related to specific categories
4. **Read Details** - View full article content with article detail pages
5. **Manage Account** - Sign up, log in, customize profile, and adjust settings
6. **User Context** - Maintain authenticated user state across the application

## Project Structure

```
Project/
├── client/          # React frontend application
└── server/          # NestJS backend API
```

## Tech Stack

### Frontend
- **React** 19.0.0 - UI library
- **React Router** 7.5.3 - Client-side routing
- **Tailwind CSS** 4.1.4 - Utility-first CSS framework
- **Axios** 1.8.4 - HTTP client
- **Vite** 6.3.0 - Build tool and dev server

### Backend
- **NestJS** 10.0.0 - Progressive Node.js framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication via @nestjs/jwt and Passport
- **Class Validator** - Data validation
- **AWS Lambda** - Serverless deployment support

## Getting Started

### Prerequisites
- Node.js >= 22.x
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd News2Day
```

2. Install client dependencies
```bash
cd client
npm install
```

3. Install server dependencies
```bash
cd ../server
npm install
```

### Environment Setup

Create a `.env` file in the `server` directory with your configuration:
```
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Running the Application

#### Development Mode

**Frontend:**
```bash
cd client
npm run dev
```
Runs on `http://localhost:5173` (default Vite port)

**Backend:**
```bash
cd server
npm run start:dev
```
Runs on `http://localhost:3000` (default NestJS port)

#### Production Mode

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

**Backend:**
```bash
cd server
npm run build
npm run start:prod
```

## Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Server
- `npm run start` - Start production server
- `npm run start:dev` - Start development server with watch mode
- `npm run start:prod` - Run compiled production code
- `npm run build` - Build TypeScript to JavaScript

## API Features

- **Articles** - Create, read, update, delete articles
- **Users** - User management and profiles
- **Categories** - Organize articles by categories
- **Authentication** - JWT-based authentication with Passport

## Project Features

- Responsive UI with Tailwind CSS
- RESTful API with NestJS
- MongoDB database integration
- JWT authentication
- Input validation and error handling
- Development hot-reload support
- Production-ready build configuration

## License

Mahmoud Abou El-Regal
