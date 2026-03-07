const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { identifyUser, requireAdmin } = require('../middlewares/authMiddleware.js');

// Route POST: http://localhost:5000/api/users
router.post('/add', identifyUser, requireAdmin, userController.addUser);
// Route PATCH: http://localhost:5000/api/users/status/:id
router.patch('/status/:id', identifyUser, requireAdmin, userController.toggleStatus);
router.put('/edit/:id', identifyUser, requireAdmin, userController.updateUser);
module.exports = router;