const User = require('../models/User');

// @desc    Create a new user
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    try {
        const user = new User({
            name,
            email,
            phone,
            password,
            role,
        });

        await user.save();

        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                error: 'User with this email or phone number already exists',
            });
        }
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
