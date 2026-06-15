const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');
const JoinRequest = require('../models/JoinRequest');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, isVolunteer: false, isMember: false }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Check volunteer and membership status on login too
    const volunteer = await Volunteer.findOne({ email });
    const joinRequest = await JoinRequest.findOne({ email });
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVolunteer: !!volunteer,
        volunteerDetails: volunteer ? { department: volunteer.department } : null,
        isMember: !!joinRequest,
        memberDetails: joinRequest ? { interestArea: joinRequest.interestArea } : null
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getCurrentUser = async (req, res) => {
  try {
    const email = req.user.email;
    const volunteer = await Volunteer.findOne({ email });
    const joinRequest = await JoinRequest.findOne({ email });

    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        isVolunteer: !!volunteer,
        volunteerDetails: volunteer ? { department: volunteer.department } : null,
        isMember: !!joinRequest,
        memberDetails: joinRequest ? { interestArea: joinRequest.interestArea } : null
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
