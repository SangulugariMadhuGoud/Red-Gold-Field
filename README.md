# RGF - MERN Stack E-commerce Website

A full-stack e-commerce website for Red Sandalwood products built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Project Structure

```
├── backend/              # Express.js server
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   └── server.js        # Main server file
├── frontend/            # React frontend
│   ├── src/            # React source code
│   ├── index.html      # HTML entry point
│   ├── vite.config.js  # Vite configuration
│   └── package.json    # Frontend dependencies
└── package.json        # Root project configuration
```

## Features

- User authentication and authorization
- Product catalog with detailed product pages
- Shopping cart functionality
- Order management
- User profile management
- Shipping address management
- Responsive design with Tailwind CSS
- Modern UI components with ShadCN/UI

## Tech Stack

### Frontend
- React 18 with JSX
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- ShadCN/UI components
- React Query for state management

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install all dependencies:
   ```bash
   npm run install:all
   ```

### Configuration

1. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/rgf
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

2. Update the MongoDB URI if using MongoDB Atlas

### Running the Application

1. **Start both frontend and backend**:
   ```bash
   npm run dev
   ```

2. **Or start them separately**:
   ```bash
   # Terminal 1 - Backend
   npm run dev:backend

   # Terminal 2 - Frontend
   npm run dev:frontend
   ```

3. **Seed the database** (in a new terminal):
   ```bash
   npm run seed
   ```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:slug` - Get product by slug

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `GET /api/profile/addresses` - Get shipping addresses
- `POST /api/profile/addresses` - Add shipping address
- `PUT /api/profile/addresses/:id` - Update shipping address
- `DELETE /api/profile/addresses/:id` - Delete shipping address

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

### Building for Production
```bash
npm run build:frontend
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
