const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const TransparencyReport = require('../models/TransparencyReport');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloudinary_name' &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_KEY !== 'your_cloudinary_api_key';

// Cloudinary upload promise helper
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'albalaagh_reports' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// @desc    Get all transparency reports
// @route   GET /api/transparency
// @access  Public
exports.getTransparencyReports = async (req, res) => {
  try {
    const reports = await TransparencyReport.find()
      .populate('uploadedBy', 'name')
      .sort({ year: -1, month: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create transparency report
// @route   POST /api/transparency
// @access  Private (Admin only)
exports.createTransparencyReport = async (req, res) => {
  try {
    const { reportType = 'Monthly', title, month, year, totalCollected, totalSpent, description } = req.body;
    
    // Input validation
    if (!['Monthly', 'Half-Yearly', 'Annual', 'Other'].includes(reportType)) {
      return res.status(400).json({ message: 'Invalid report type' });
    }

    if (!year || isNaN(year) || parseInt(year) < 2000) {
      return res.status(400).json({ message: 'A valid year is required' });
    }

    if (!description || description.trim() === '') {
      return res.status(400).json({ message: 'A description is required' });
    }

    if (reportType === 'Monthly') {
      if (!month || parseInt(month) < 1 || parseInt(month) > 12) {
        return res.status(400).json({ message: 'A valid month (1-12) is required for monthly reports' });
      }
      if (totalCollected === undefined || isNaN(totalCollected) || parseFloat(totalCollected) < 0) {
        return res.status(400).json({ message: 'A valid collected amount is required' });
      }
      if (totalSpent === undefined || isNaN(totalSpent) || parseFloat(totalSpent) < 0) {
        return res.status(400).json({ message: 'A valid spent amount is required' });
      }
    } else {
      if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'A title/period is required for non-monthly reports' });
      }
      if (totalCollected !== undefined && totalCollected !== '' && (isNaN(totalCollected) || parseFloat(totalCollected) < 0)) {
        return res.status(400).json({ message: 'Total collected must be a positive number' });
      }
      if (totalSpent !== undefined && totalSpent !== '' && (isNaN(totalSpent) || parseFloat(totalSpent) < 0)) {
        return res.status(400).json({ message: 'Total spent must be a positive number' });
      }
    }

    let screenshotUrl = '';
    
    if (req.file) {
      if (isCloudinaryConfigured) {
        try {
          screenshotUrl = await uploadToCloudinary(req.file.buffer);
        } catch (cloudinaryErr) {
          console.error('Cloudinary upload failed, falling back to local file storage:', cloudinaryErr.message);
          // Fallback to local storage
          const filename = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
          const uploadsDir = path.join(__dirname, '../uploads');
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          const filepath = path.join(uploadsDir, filename);
          fs.writeFileSync(filepath, req.file.buffer);
          screenshotUrl = `/uploads/${filename}`;
        }
      } else {
        // Save locally fallback
        const filename = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
        const uploadsDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filepath = path.join(uploadsDir, filename);
        fs.writeFileSync(filepath, req.file.buffer);
        screenshotUrl = `/uploads/${filename}`;
      }
    } else {
      return res.status(400).json({ message: 'Screenshot/evidence image or file is required' });
    }
    
    const reportData = {
      reportType,
      year: parseInt(year),
      screenshot: screenshotUrl,
      description,
      uploadedBy: req.user._id
    };

    if (reportType === 'Monthly') {
      reportData.month = month;
      reportData.totalCollected = parseFloat(totalCollected);
      reportData.totalSpent = parseFloat(totalSpent);
    } else {
      reportData.title = title;
      if (totalCollected !== undefined && totalCollected !== '') {
        reportData.totalCollected = parseFloat(totalCollected);
      }
      if (totalSpent !== undefined && totalSpent !== '') {
        reportData.totalSpent = parseFloat(totalSpent);
      }
    }

    const report = new TransparencyReport(reportData);

    await report.save();
    await report.populate('uploadedBy', 'name');
    
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
