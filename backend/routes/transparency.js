const express = require('express');
const multer = require('multer');
const { getTransparencyReports, createTransparencyReport } = require('../controllers/transparencyController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all transparency reports
router.get('/', getTransparencyReports);

// Create transparency report (admin only)
router.post('/', adminAuth, upload.single('screenshot'), createTransparencyReport);

module.exports = router;