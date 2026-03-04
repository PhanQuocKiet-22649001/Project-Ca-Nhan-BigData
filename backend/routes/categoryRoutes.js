const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { identifyUser, requireAdmin } = require('../middlewares/authMiddleware');

// Route: POST http://localhost:5000/api/categories/add
router.post('/add', identifyUser, requireAdmin, categoryController.addCategory);

module.exports = router;