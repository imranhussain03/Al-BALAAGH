const Donation = require('../models/Donation');

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Public (Optional Auth)
exports.createDonation = async (req, res) => {
  try {
    const { amount, donorName, donorEmail, paymentMethod, transactionId, isMonthly } = req.body;
    
    // Validation checks
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ message: 'A valid donation amount is required' });
    }
    if (!donorName || donorName.trim() === '') {
      return res.status(400).json({ message: 'Donor name is required' });
    }
    if (!donorEmail || !donorEmail.includes('@')) {
      return res.status(400).json({ message: 'A valid donor email is required' });
    }
    if (!['PhonePe', 'GooglePay', 'UPI'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'A valid payment method is required' });
    }

    const donation = new Donation({
      user: req.user?._id,
      amount: parseFloat(amount),
      donorName,
      donorEmail,
      paymentMethod,
      transactionId,
      isMonthly: !!isMonthly,
      status: 'completed' // In this system, self-reported transactions are auto-completed
    });

    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user donations
// @route   GET /api/donations/my-donations
// @access  Private
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all donations
// @route   GET /api/donations/all
// @access  Private (Admin only)
exports.getAllDonations = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const donations = await Donation.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get donation stats
// @route   GET /api/donations/stats
// @access  Public
exports.getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    const monthlyDonations = await Donation.aggregate([
      { $match: { status: 'completed', isMonthly: true } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    res.json({
      total: totalDonations[0]?.total || 0,
      count: totalDonations[0]?.count || 0,
      monthlyTotal: monthlyDonations[0]?.total || 0,
      monthlyCount: monthlyDonations[0]?.count || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
