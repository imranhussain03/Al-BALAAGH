const express = require('express');
const multer = require('multer');
const { registerVolunteer, getVolunteers } = require('../controllers/volunteerController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('photo'), registerVolunteer);
router.get('/', adminAuth, getVolunteers);

module.exports = router;
