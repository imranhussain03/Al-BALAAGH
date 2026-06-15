const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const Volunteer = require('../models/Volunteer');

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
      { folder: 'albalaagh_volunteers' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// @desc    Register a new volunteer
// @route   POST /api/volunteers
// @access  Public
exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, aadhar, education, department, message } = req.body;

    if (!name || !email || !phone || !aadhar || !education || !department) {
      return res.status(400).json({ message: 'Name, email, phone, aadhar, education, and department are required' });
    }

    let photoUrl = '';
    
    if (req.file) {
      if (isCloudinaryConfigured) {
        try {
          photoUrl = await uploadToCloudinary(req.file.buffer);
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
          photoUrl = `/uploads/${filename}`;
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
        photoUrl = `/uploads/${filename}`;
      }
    }

    const volunteer = new Volunteer({
      name,
      email,
      phone,
      aadhar,
      education,
      photo: photoUrl,
      department,
      message
    });

    await volunteer.save();

    res.status(201).json({ message: 'Volunteer registered successfully!', volunteer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all volunteers
// @route   GET /api/volunteers
// @access  Private (Admin only)
exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
