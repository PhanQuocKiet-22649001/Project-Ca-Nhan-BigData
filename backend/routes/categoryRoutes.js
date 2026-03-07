const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { identifyUser, requireAdmin } = require('../middlewares/authMiddleware');

// Route: POST http://localhost:5000/api/categories/add
router.post('/add', identifyUser, requireAdmin, categoryController.addCategory);
// Route PATCH: http://localhost:5000/api/users/status/:id
router.patch('/status/:id', identifyUser, requireAdmin, categoryController.toggleStatus);
router.put('/edit/:id', identifyUser, requireAdmin, categoryController.updateCategory);


module.exports = router;