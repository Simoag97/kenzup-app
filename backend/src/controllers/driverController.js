const crypto = require('crypto');
const PurchaseToken = require('../models/PurchaseToken');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// @desc    Generate purchase token (Driver creates QR code)
// @route   POST /api/driver/generate-token
// @access  Private (Driver only)
const generateToken = async (req, res) => {
    try {
        const { amount, description } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid amount'
            });
        }

        // Check if user is a driver
        if (req.user.role !== 'driver') {
            return res.status(403).json({
                success: false,
                message: 'Only drivers can generate purchase tokens'
            });
        }

        // Calculate points: 1 point per 100 DH
        const points = Math.floor(amount / 100);

        // Generate unique token
        const tokenString = crypto.randomBytes(32).toString('hex');

        // Token expires in 24 hours
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        // Create purchase token
        const purchaseToken = await PurchaseToken.create({
            token: tokenString,
            driverId: req.user._id,
            amount,
            points,
            description: description || `Purchase: ${amount} DH`,
            expiresAt
        });

        res.json({
            success: true,
            data: {
                token: purchaseToken.token,
                amount: purchaseToken.amount,
                points: purchaseToken.points,
                description: purchaseToken.description,
                expiresAt: purchaseToken.expiresAt
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get driver's token history
// @route   GET /api/driver/tokens
// @access  Private (Driver only)
const getDriverTokens = async (req, res) => {
    try {
        if (req.user.role !== 'driver') {
            return res.status(403).json({
                success: false,
                message: 'Only drivers can access this'
            });
        }

        const tokens = await PurchaseToken.find({ driverId: req.user._id })
            .populate('redeemedBy', 'name phone')
            .sort({ createdAt: -1 })
            .limit(50);

        res.json({
            success: true,
            count: tokens.length,
            data: tokens
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Redeem purchase token (Shop owner scans QR)
// @route   POST /api/shop/redeem-token
// @access  Private (Shop owner only)
const redeemToken = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { token } = req.body;

        if (!token) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Please provide a token'
            });
        }

        // Find the purchase token
        const purchaseToken = await PurchaseToken.findOne({ token }).session(session);

        if (!purchaseToken) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // Check if already redeemed
        if (purchaseToken.status === 'redeemed') {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'This token has already been redeemed'
            });
        }

        // Check if expired
        if (new Date() > purchaseToken.expiresAt) {
            purchaseToken.status = 'expired';
            await purchaseToken.save({ session });
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'This token has expired'
            });
        }

        // Prevent driver from redeeming their own token
        if (purchaseToken.driverId.toString() === req.user._id.toString()) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Cannot redeem your own token'
            });
        }

        // Get shop owner
        const shopOwner = await User.findById(req.user._id).session(session);

        // Add points to shop owner
        shopOwner.points += purchaseToken.points;
        await shopOwner.save({ session });

        // Mark token as redeemed
        purchaseToken.status = 'redeemed';
        purchaseToken.redeemedBy = shopOwner._id;
        purchaseToken.redeemedAt = new Date();
        await purchaseToken.save({ session });

        // Create transaction record
        await Transaction.create([{
            userId: shopOwner._id,
            type: 'earn',
            amount: purchaseToken.points,
            description: purchaseToken.description
        }], { session });

        await session.commitTransaction();

        res.json({
            success: true,
            data: {
                points: purchaseToken.points,
                amount: purchaseToken.amount,
                description: purchaseToken.description,
                newBalance: shopOwner.points
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

module.exports = {
    generateToken,
    getDriverTokens,
    redeemToken
};
