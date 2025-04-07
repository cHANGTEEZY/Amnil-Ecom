# Amnil-Ecom

Amnil-Ecom is a modern e-commerce web application that demonstrates the implementation of various state management solutions and third-party integrations. The application uses Context API, Redux, and localStorage for state management, while leveraging JSON Server for user data and the Fake Store API for product data.

## Features

- **Multiple State Management Solutions**:
  - Context API for global state
  - Redux for complex state management
  - localStorage for persistent state
- **User Authentication**:

  - Login/Registration
  - User profile management
  - Session persistence

- **Product Management**:
  - Product listing with category filters
  - Product search
  - Product details
- **Shopping Cart**:

  - Add/remove items
  - Adjust quantities
  - Calculate totals

## Tech Stack

- **React.js**: Frontend library
- **Redux**: State management
- **Context API**: Alternative state management
- **Ant Design**: UI component library
- **React Router**: Routing
- **Axios**: HTTP client
- **JSON Server**: Local REST API for user data
- **Fake Store API**: External API for product data
- **localStorage**: Browser storage for state persistence

## Installation

Follow these steps to get the application running on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/cHANGTEEZY/Amnil-Ecom.git
   cd Amnil-Ecom
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up JSON Server for user data**:

   ```bash
   npm install -g json-server
   ```

4. **Create a db.json file in the root directory**:

   ```json
   {
     "users": []
   }
   ```

5. **Start JSON Server**:

   ```bash
   json-server --watch db.json --port 3001
   ```

6. **Start the development server**:
   ```bash
   npm start
   ```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
AMNIL-ECOM/
├── node_modules/
├── public/
│   ├── purple.jpg
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── db.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## State Management

The application demonstrates three different approaches to state management:

1. **Redux**: Used for complex state that needs to be accessed across multiple components, such as cart state and user authentication.

2. **Context API**: Used for theme settings, notifications, and other global UI states.

3. **localStorage**: Used to persist user preferences, cart items, and authentication tokens between sessions.

## API Integration

### JSON Server

The application uses JSON Server to simulate a backend API for user data. User information is stored in the `/users` route.

### Fake Store API

Product data is fetched from the Fake Store API, which provides a comprehensive set of e-commerce endpoints including products, categories, and carts.

## Using Ant Design

The project leverages Ant Design for UI components. The component library provides a consistent design system and speeds up development.
