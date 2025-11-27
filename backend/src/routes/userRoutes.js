const express = require('express');
const { createUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Route to create a new user with admin role
router.post('/', protect, admin, createUser);

module.exports = router;
