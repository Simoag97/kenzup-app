const mongoose = require('mongoose');

const purchaseTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    points: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'redeemed', 'expired'],
        default: 'pending'
    },
    redeemedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    redeemedAt: {
        type: Date
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
purchaseTokenSchema.index({ status: 1, expiresAt: 1 });
purchaseTokenSchema.index({ driverId: 1, createdAt: -1 });

module.exports = mongoose.model('PurchaseToken', purchaseTokenSchema);
