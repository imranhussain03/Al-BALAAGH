# AL BALAAGH FOUNDATION - MERN Website

> **"Uplifting the Ummah, Empowering the Future"**

A professional MERN stack website for AL BALAAGH FOUNDATION dedicated to uplifting the Muslim community through education, socioeconomic empowerment, charitable initiatives, and comprehensive Zakat counseling.

## 🌟 Features

- **🌗 Light/Dark Theme Toggle** - Seamless theme switching with localStorage persistence
- **🔐 Authentication System** - JWT-based login/register with protected routes
- **🖼️ Image Carousel** - Auto-playing hero carousel with navigation controls
- **💰 Donation System** - Secure donation forms with multiple payment methods
- **✨ Mission Statement** - Clear presentation of foundation's Islamic values and goals
- **📸 Transparency Reports** - Monthly collection screenshots and impact updates
- **📱 Responsive Design** - Mobile-first design optimized for all devices
- **🎨 Islamic Theme** - Green and gold color scheme with cultural aesthetics
- **👤 User Dashboard** - Personal donation history and contribution tracking
- **🛡️ Admin Panel** - Complete admin dashboard for managing reports and users

## 🛠️ Tech Stack

### Frontend
- **React.js 19.2.0** - Modern UI library with hooks
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **React Router 7.9.5** - Client-side routing
- **Axios 1.13.2** - HTTP client for API calls
- **Context API** - Global state management

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Fast web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing and security
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AlBlaagh
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/albalaagh
   JWT_SECRET=your_super_secret_jwt_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**
   
   **Option 1: Using batch files (Windows)**
   - Double-click `start-backend.bat`
   - Double-click `start-frontend.bat`
   
   **Option 2: Manual start**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```
   
   **Option 3: Concurrent start**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
AlBlaagh/
├── 📁 backend/                    # Express.js API server
│   ├── 📁 models/                 # MongoDB schemas
│   │   ├── User.js               # User authentication model
│   │   ├── Donation.js           # Donation tracking model
│   │   └── TransparencyReport.js # Monthly reports model
│   ├── 📁 routes/                # API endpoints
│   │   ├── auth.js              # Authentication routes
│   │   ├── donations.js         # Donation management
│   │   └── transparency.js      # Report management
│   ├── 📁 middleware/           # Custom middleware
│   │   └── auth.js             # JWT authentication
│   ├── server.js               # Main server file
│   ├── .env                    # Environment variables
│   └── package.json           # Backend dependencies
├── 📁 frontend/                  # React.js client
│   ├── 📁 public/              # Static assets
│   │   ├── index.html         # Main HTML template
│   │   └── favicon.ico        # Website icon
│   ├── 📁 src/                # Source code
│   │   ├── 📁 components/     # Reusable components
│   │   │   ├── Navbar.js     # Navigation with theme toggle
│   │   │   ├── Footer.js     # Footer with contact info
│   │   │   ├── Carousel.js   # Image carousel component
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── 📁 pages/         # Main pages
│   │   │   ├── Home.js       # Landing page with carousel
│   │   │   ├── About.js      # Foundation information
│   │   │   ├── Donate.js     # Donation forms
│   │   │   ├── Transparency.js # Monthly reports
│   │   │   ├── Login.js      # User login
│   │   │   ├── Register.js   # User registration
│   │   │   └── Dashboard.js  # User/Admin dashboard
│   │   ├── 📁 context/       # React Context
│   │   │   ├── AuthContext.js # Authentication state
│   │   │   └── ThemeContext.js # Theme management
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── postcss.config.js    # PostCSS configuration
│   └── package.json         # Frontend dependencies
├── 📄 README.md              # This file
├── 📄 SETUP.md               # Setup instructions
├── 📄 .gitignore             # Git ignore rules
├── 📄 package.json           # Root package configuration
├── 🚀 start-backend.bat      # Backend startup script
├── 🚀 start-frontend.bat     # Frontend startup script
└── 🚀 start.bat              # Main startup guide
```

## 🎨 Design & UI Features

### Color Palette
- **Primary Green**: `#22c55e` (Islamic green theme)
- **Gold Accents**: `#f59e0b` (Elegant highlights)
- **Dark Mode**: Complete dark theme with `#1f2937` backgrounds
- **Text Colors**: High contrast for accessibility

### Typography & Fonts
- **Inter Font**: Modern, clean typography from Google Fonts
- **Font Weights**: 300-700 for proper hierarchy
- **Responsive Text**: Scales beautifully across devices

### Islamic Design Elements
- Geometric patterns in backgrounds
- Crescent moon and sun icons for theme toggle
- Cultural color scheme respecting Islamic aesthetics
- Arabic-inspired spacing and layouts

## 💳 Payment Integration

### Supported Payment Methods
- **PhonePe**: 7217286593
- **Google Pay**: 7217286593  
- **UPI**: 7217286593@ybl

### Donation Features
- One-time donations
- Monthly recurring contributions (₹30/month)
- Donation history tracking
- Receipt generation
- Transparent fund usage reports

## 🔒 Security & Authentication

- **JWT Tokens**: Secure authentication with 7-day expiry
- **Password Hashing**: bcryptjs with salt rounds
- **Protected Routes**: Client and server-side protection
- **Input Validation**: Comprehensive form validation
- **CORS Configuration**: Secure cross-origin requests
- **Environment Variables**: Sensitive data protection

## 📊 Admin Features

### Admin Dashboard
- **User Management**: View all registered users
- **Donation Analytics**: Total collections and statistics
- **Report Upload**: Monthly transparency reports
- **Impact Tracking**: Monitor community impact

### Transparency System
- Monthly collection screenshots
- Detailed expenditure reports
- Impact stories and updates
- Public accessibility for all reports

## 🌐 Pages & Functionality

### 1. **Home Page** (`/`)
- Hero carousel with community images
- Mission statement and values
- Donation call-to-action
- Impact statistics
- Islamic quotes and inspiration

### 2. **About Page** (`/about`)
- Foundation's vision and mission
- Core values and principles
- What we do (4 main areas)
- Team information
- Contact details

### 3. **Donate Page** (`/donate`)
- Secure donation forms
- Multiple payment options
- Monthly contribution setup
- Donation amount suggestions
- Payment information display

### 4. **Transparency Page** (`/transparency`)
- Monthly collection reports
- Screenshot evidence
- Impact summaries
- Financial breakdowns
- Public accountability

### 5. **Authentication** (`/login`, `/register`)
- User registration with validation
- Secure login system
- Password requirements
- Error handling and feedback

### 6. **Dashboard** (`/dashboard`)
- Personal donation history
- Contribution statistics
- Admin panel (for admins)
- Profile management
- Report upload (admin only)

## 🌍 Responsive Design

- **Mobile First**: Optimized for smartphones
- **Tablet Friendly**: Perfect iPad and tablet experience
- **Desktop Enhanced**: Full-featured desktop layout
- **Touch Optimized**: Smooth touch interactions
- **Fast Loading**: Optimized images and code splitting

## 🔧 Development

### Available Scripts
```bash
# Root level
npm run dev          # Start both frontend and backend
npm run install-deps # Install all dependencies

# Backend
npm start           # Start production server
npm run dev         # Start development server with nodemon

# Frontend  
npm start           # Start development server
npm run build       # Build for production
```

### Environment Variables
```env
# Backend (.env)
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000
GENERATE_SOURCEMAP=false
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact Information

**AL BALAAGH FOUNDATION**
- **Email**: contact@albalaghfoundation.org
- **Phone**: 7217286593
- **Payment Methods**:
  - PhonePe/Google Pay: 7217286593
  - UPI: 7217286593@ybl

**Social Media**
- Facebook: [AL BALAAGH FOUNDATION]
- Instagram: [@albalaghfoundation]
- YouTube: [AL BALAAGH FOUNDATION]

## 📜 License

This project is created for AL BALAAGH FOUNDATION. All rights reserved.

## 🙏 Islamic Values & Acknowledgments

> **"Charity does not decrease wealth."** – Prophet Muhammad ﷺ

> **"The believers in their mutual kindness, compassion, and sympathy are just one body; if a limb suffers, the whole body responds to it with wakefulness and fever."** – Prophet Muhammad ﷺ

> **"The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains."** – Quran 2:261

---

**Built with ❤️ for the Muslim Ummah** | Supporting education, empowerment, and charitable initiatives | **May Allah accept our efforts** 🤲