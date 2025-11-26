const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Create driver account (Admin only)
// @route   POST /api/admin/create-driver
// @access  Private (Admin only)
const createDriver = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if requester is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admins can create driver accounts'
            });
        }

        // Validate required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email or phone already exists'
            });
        }

        // Create driver account
        const driver = await User.create({
            name,
            email,
            phone,
            password,
            role: 'driver'
        });

        res.status(201).json({
            success: true,
            data: {
                id: driver._id,
                name: driver.name,
                email: driver.email,
                phone: driver.phone,
                role: driver.role
            },
            message: 'Driver account created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all drivers
// @route   GET /api/admin/drivers
// @access  Private (Admin only)
const getDrivers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admins can access this'
            });
        }

        const drivers = await User.find({ role: 'driver' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: drivers.length,
            data: drivers
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createDriver,
    getDrivers
};
