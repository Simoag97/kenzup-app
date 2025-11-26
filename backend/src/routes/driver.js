const express = require('express');
const { generateToken, getDriverTokens } = require('../controllers/driverController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/generate-token', protect, generateToken);
router.get('/tokens', protect, getDriverTokens);

module.exports = router;
