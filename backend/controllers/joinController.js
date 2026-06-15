const JoinRequest = require('../models/JoinRequest');

// @desc    Submit a join request
// @route   POST /api/join
// @access  Public
exports.submitJoinRequest = async (req, res) => {
  try {
    const { name, email, phone, interestArea, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone number are required' });
    }

    const joinRequest = new JoinRequest({ name, email, phone, interestArea, message });
    await joinRequest.save();

    res.status(201).json({ message: 'Join request submitted successfully!', joinRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all join requests
// @route   GET /api/join
// @access  Private (Admin only)
exports.getJoinRequests = async (req, res) => {
  try {
    const requests = await JoinRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
