const express = require('express');
const { submitJoinRequest, getJoinRequests } = require('../controllers/joinController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', submitJoinRequest);
router.get('/', adminAuth, getJoinRequests);

module.exports = router;
