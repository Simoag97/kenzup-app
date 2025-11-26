const express = require('express');
const { getBalance, cashIn } = require('../controllers/pointsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/balance', protect, getBalance);
router.post('/cash-in', protect, cashIn);

module.exports = router;
