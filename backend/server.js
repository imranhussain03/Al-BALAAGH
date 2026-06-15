const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dns = require('dns');
require('dotenv').config();

// Force IPv4 first DNS lookup to resolve querySrv Atlas connection issues
dns.setDefaultResultOrder('ipv4first');

const app = express();

app.use(cors());
app.use(express.json());

// Ensure uploads folder exists and serve it statically
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/transparency', require('./routes/transparency'));
app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/join', require('./routes/join'));

// Serve static assets in production (or if the build folder exists)
const frontendBuildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}


// Robust database connection retry loop
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    console.log('Server is running but database connection failed. Retrying in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error after initial connection:', err);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));