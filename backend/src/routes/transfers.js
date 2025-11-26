const express = require('express');
const { sendPoints, getTransferHistory } = require('../controllers/transfersController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/send', protect, sendPoints);
router.get('/history', protect, getTransferHistory);

module.exports = router;
