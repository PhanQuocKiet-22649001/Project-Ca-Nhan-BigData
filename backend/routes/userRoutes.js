const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { identifyUser, requireAdmin } = require('../middlewares/authMiddleware.js');

// Route POST: http://localhost:5000/api/users
// identifyUser: để giải mã lấy thông tin admin
// requireAdmin: để chặn nếu không phải admin
router.post('/add', identifyUser, requireAdmin, userController.addUser);

module.exports = router;