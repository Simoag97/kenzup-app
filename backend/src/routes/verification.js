const express = require('express');
const { sendVerificationCode, verifyCode } = require('../controllers/verificationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/send', protect, sendVerificationCode);
router.post('/verify', protect, verifyCode);

module.exports = router;
