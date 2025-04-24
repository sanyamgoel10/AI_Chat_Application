const express = require("express");
const router = express.Router();

// Controllers
const { homepage, startChat } = require('../controllers/HomepageController.js');

// Routes
router.get('/', homepage);
router.post('/startchat', startChat);

module.exports = router;