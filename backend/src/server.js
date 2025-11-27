require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth');
const pointsRoutes = require('./routes/points');
const transfersRoutes = require('./routes/transfers');
const transactionsRoutes = require('./routes/transactions');
const verificationRoutes = require('./routes/verification');
const driverRoutes = require('./routes/driver');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/userRoutes');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://primordial-aphelion-abazx6uyf-simoaglaou0-gmailcoms-projects.vercel.app',
        /\.vercel\.app$/
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/points', pointsRoutes);
app.use('/api/transfers', transfersRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ success: true, message: 'Server is running' });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
