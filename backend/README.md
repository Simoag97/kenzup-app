# Kenz'up Backend API

Backend REST API for the Kenz'up loyalty points application built with Node.js, Express, and MongoDB.

## Features

- 🔐 User authentication with JWT
- 💰 Points management system
- 🔄 Transfer points between users
- 📊 Transaction history
- 🔒 Secure password hashing
- ✅ Input validation
- 🛡️ Security middleware (Helmet, CORS)

## Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Setup environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string for JWT signing
- `PORT` - Server port (default: 5000)

3. **Start the server:**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Points
- `GET /api/points/balance` - Get points balance (protected)
- `POST /api/points/cash-in` - Cash in points (protected)

### Transfers
- `POST /api/transfers/send` - Send points to another user (protected)
- `GET /api/transfers/history` - Get transfer history (protected)

### Transactions
- `GET /api/transactions` - Get all transactions (protected)
- `GET /api/transactions/:id` - Get specific transaction (protected)

### Health Check
- `GET /health` - Server health status

## Database Setup

### Option 1: Local MongoDB
Install MongoDB locally and it will run on `mongodb://localhost:27017/kenzup`

### Option 2: MongoDB Atlas (Cloud - Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `MONGODB_URI` in `.env`

## Testing with Postman/Thunder Client

Example requests are provided in the implementation plan.

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   └── server.js        # Entry point
├── .env.example         # Environment template
├── .gitignore
└── package.json
```

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Helmet security headers
- CORS configuration
- Input validation
- Error handling

## License

ISC
