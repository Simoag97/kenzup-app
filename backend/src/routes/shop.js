const express = require('express');
const { redeemToken } = require('../controllers/driverController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/redeem-token', protect, redeemToken);

module.exports = router;
