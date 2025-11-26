const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Get all transactions for user
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id })
            .populate('relatedUser', 'name phone')
            .sort({ createdAt: -1 })
            .limit(100);

        res.json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('relatedUser', 'name phone');

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        // Check if transaction belongs to user
        if (transaction.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this transaction'
            });
        }

        res.json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Add test purchase (for development/testing)
// @route   POST /api/transactions/add-purchase
// @access  Private
const addPurchase = async (req, res) => {
    try {
        const { amount, description, points } = req.body;

        if (!amount || !points) {
            return res.status(400).json({
                success: false,
                message: 'Please provide amount and points'
            });
        }

        const user = await User.findById(req.user._id);

        // Add points to user
        user.points += points;
        await user.save();

        // Create transaction record
        const transaction = await Transaction.create({
            userId: user._id,
            type: 'earn',
            amount: points,
            description: description || `Purchase: ${amount} gas cylinders`
        });

        res.json({
            success: true,
            data: {
                transaction,
                newBalance: user.points
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
    getTransactions,
    getTransaction,
    addPurchase
};
