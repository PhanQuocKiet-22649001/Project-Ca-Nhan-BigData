const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const { identifyUser } = require('../middlewares/authMiddleware.js'); // Import middleware

// API trang chủ: Sử dụng identifyUser để phân loại khách/admin
router.get('/home', identifyUser, homeController.getHomeData);

module.exports = router;