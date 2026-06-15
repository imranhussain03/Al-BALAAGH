const express = require('express');
const { createDonation, getMyDonations, getAllDonations, getDonationStats } = require('../controllers/donationController');
const { auth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Create donation (optionally authenticated to link to user account)
router.post('/', optionalAuth, createDonation);

// Get user donations
router.get('/my-donations', auth, getMyDonations);

// Get all donations (admin only)
router.get('/all', auth, getAllDonations);

// Get donation statistics
router.get('/stats', getDonationStats);

module.exports = router;