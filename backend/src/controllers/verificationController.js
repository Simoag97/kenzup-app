const User = require('../models/User');

// @desc    Send verification code
// @route   POST /api/verification/send
// @access  Private
const sendVerificationCode = async (req, res) => {
    try {
        const { method } = req.body; // 'email' or 'phone'
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.verified) {
            return res.status(400).json({
                success: false,
                message: 'Account already verified'
            });
        }

        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // In production, you would:
        // - Send email via SendGrid/Mailgun
        // - Send SMS via Twilio/Vonage
        // For now, we'll just store it and return it (for testing)

        user.verificationCode = code;
        user.verificationCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // In production, don't send the code in response
        // For development/testing, we'll send it
        res.json({
            success: true,
            message: `Verification code sent to your ${method}`,
            // Remove this in production:
            code: code // Only for testing
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Verify code
// @route   POST /api/verification/verify
// @access  Private
const verifyCode = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.verified) {
            return res.status(400).json({
                success: false,
                message: 'Account already verified'
            });
        }

        if (!user.verificationCode || !user.verificationCodeExpires) {
            return res.status(400).json({
                success: false,
                message: 'No verification code found. Please request a new one.'
            });
        }

        if (Date.now() > user.verificationCodeExpires) {
            return res.status(400).json({
                success: false,
                message: 'Verification code expired. Please request a new one.'
            });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification code'
            });
        }

        // Verify the user
        user.verified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();

        res.json({
            success: true,
            message: 'Account verified successfully!',
            data: {
                verified: true
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
    sendVerificationCode,
    verifyCode
};
