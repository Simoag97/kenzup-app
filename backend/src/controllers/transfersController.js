const User = require('../models/User');
const Transfer = require('../models/Transfer');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// @desc    Send points to another user
// @route   POST /api/transfers/send
// @access  Private
const sendPoints = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { recipientPhone, amount } = req.body;

        if (!recipientPhone || !amount) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Please provide recipient phone and amount'
            });
        }

        if (amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Amount must be greater than 0'
            });
        }

        // Get sender
        const sender = await User.findById(req.user._id).session(session);

        if (sender.points < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Insufficient points'
            });
        }

        // Get recipient
        const recipient = await User.findOne({ phone: recipientPhone }).session(session);

        if (!recipient) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Recipient not found'
            });
        }

        if (sender._id.toString() === recipient._id.toString()) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Cannot transfer to yourself'
            });
        }

        // Deduct from sender
        sender.points -= amount;
        await sender.save({ session });

        // Add to recipient
        recipient.points += amount;
        await recipient.save({ session });

        // Create transfer record
        const transfer = await Transfer.create([{
            senderId: sender._id,
            recipientPhone: recipientPhone,
            recipientId: recipient._id,
            amount: amount,
            status: 'completed'
        }], { session });

        // Create transaction records
        await Transaction.create([
            {
                userId: sender._id,
                type: 'transfer_out',
                amount: amount,
                description: `Transferred ${amount} points to ${recipient.name}`,
                relatedUser: recipient._id
            },
            {
                userId: recipient._id,
                type: 'transfer_in',
                amount: amount,
                description: `Received ${amount} points from ${sender.name}`,
                relatedUser: sender._id
            }
        ], { session });

        await session.commitTransaction();

        res.json({
            success: true,
            data: {
                transfer: transfer[0],
                newBalance: sender.points
            }
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({
            success: false,
            message: error.message
        });
    } finally {
        session.endSession();
    }
};

// @desc    Get transfer history
// @route   GET /api/transfers/history
// @access  Private
const getTransferHistory = async (req, res) => {
    try {
        const transfers = await Transfer.find({
            $or: [
                { senderId: req.user._id },
                { recipientId: req.user._id }
            ]
        })
            .populate('senderId', 'name phone')
            .populate('recipientId', 'name phone')
            .sort({ createdAt: -1 })
            .limit(50);

        res.json({
            success: true,
            count: transfers.length,
            data: transfers
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    sendPoints,
    getTransferHistory
};
