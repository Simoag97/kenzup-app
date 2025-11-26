const express = require('express');
const { getTransactions, getTransaction, addPurchase } = require('../controllers/transactionsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getTransactions);
router.get('/:id', protect, getTransaction);
router.post('/add-purchase', protect, addPurchase);

module.exports = router;
