const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Get user points balance
// @route   GET /api/points/balance
// @access  Private
const getBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.json({
            success: true,
            data: {
                points: user.points
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Cash in points
// @route   POST /api/points/cash-in
// @access  Private
const cashIn = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid amount'
            });
        }

        const user = await User.findById(req.user._id);

        if (user.points < amount) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient points'
            });
        }

        // Deduct points
        user.points -= amount;
        await user.save();

        // Create transaction record
        await Transaction.create({
            userId: user._id,
            type: 'cash_in',
            amount: amount,
            description: `Cashed in ${amount} points`
        });

        res.json({
            success: true,
            data: {
                points: user.points,
                cashedIn: amount
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getBalance,
    cashIn
};
