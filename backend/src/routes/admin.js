const express = require('express');
const { createDriver, getDrivers } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create-driver', protect, createDriver);
router.get('/drivers', protect, getDrivers);

module.exports = router;
