import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import axios from 'axios';

const Home = () => {
  const [stats, setStats] = useState({ total: 0, count: 0, monthlyTotal: 0, monthlyCount: 0 });
  const [paymentTab, setPaymentTab] = useState('upi'); // 'upi' or 'qr'
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/donations/stats`);
      setStats(response.data);
    } catch (error) {
      // Error handled silently
    }
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50/40 via-white to-amber-50/20 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900/50 py-10 sm:py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Message */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-6">
              <span className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-350 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
                AL BALAAGH FOUNDATION
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Uplifting the Ummah, <span className="text-primary-600 dark:text-primary-400">Empowering</span> the Future
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Join us in our mission to strengthen the Muslim community through taking initiatives in education, socioeconomic empowerment, charitable initiatives, and comprehensive Zakat counseling.
              </p>
              <div className="pt-2">
                <Link
                  to="/donate"
                  className="bg-gold-500 hover:bg-gold-650 text-white px-8 py-3.5 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all inline-block"
                >
                  Donate Now
                </Link>
              </div>
            </div>

            {/* Right Column: Carousel */}
            <div className="lg:col-span-7 w-full">
              <Carousel />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                The mission of our organization is to uplift the Muslim community through taking initiatives in 
                <span className="font-semibold text-primary-600 dark:text-primary-400"> education</span>, 
                <span className="font-semibold text-primary-600 dark:text-primary-400"> socioeconomic empowerment</span>, 
                <span className="font-semibold text-primary-600 dark:text-primary-400"> charitable initiatives</span>, and 
                <span className="font-semibold text-primary-600 dark:text-primary-400"> comprehensive counseling</span> on 
                the principles and significance of Zakat.
              </p>
              <div className="mt-8">
                <Link
                  to="/join"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg inline-block"
                >
                  Join Us
                </Link>
              </div>
            </div>
          </div>

          {/* What We Do Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/services/education" className="group block">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center border-t-4 border-amber-500 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Education</h3>
                <p className="text-gray-650 dark:text-gray-300 text-sm">Providing quality Islamic and modern education to empower our community</p>
              </div>
            </Link>

            <Link to="/services/empowerment" className="group block">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center border-t-4 border-blue-500 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Empowerment</h3>
                <p className="text-gray-655 dark:text-gray-300 text-sm">Creating opportunities for socioeconomic growth and development</p>
              </div>
            </Link>

            <Link to="/services/charitable-aid" className="group block">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center border-t-4 border-purple-500 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Charitable Aid</h3>
                <p className="text-gray-655 dark:text-gray-300 text-sm">Distributing aid and support to those most in need</p>
              </div>
            </Link>

            <Link to="/services/zakat-counseling" className="group block">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center border-t-4 border-emerald-500 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🕌</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Zakat Counseling</h3>
                <p className="text-gray-655 dark:text-gray-300 text-sm">Guidance on proper Zakat calculation and distribution</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* Support Us Section */}
      <section className="py-16 bg-primary-600 dark:bg-primary-750">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Support Us
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md mx-auto shadow-xl transition-all duration-300 hover:shadow-2xl">
            <p className="text-lg text-gray-900 dark:text-white mb-6">
              Contribute just <span className="font-bold text-primary-600 dark:text-primary-450">₹30 per month</span> and be a part of this noble cause.
            </p>
            
            {/* Interactive Tabs */}
            <div className="flex border-b border-gray-250 dark:border-gray-700 mb-6 bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded-lg">
              <button
                type="button"
                onClick={() => setPaymentTab('upi')}
                className={`flex-1 py-2 px-3 text-center text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 ${
                  paymentTab === 'upi'
                    ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-750 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                💳 UPI Details
              </button>
              <button
                type="button"
                onClick={() => setPaymentTab('qr')}
                className={`flex-1 py-2 px-3 text-center text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 ${
                  paymentTab === 'qr'
                    ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-750 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                📸 Scan QR Code
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-6 text-left border border-gray-150 dark:border-gray-700/50 min-h-[148px] flex flex-col justify-center">
              {paymentTab === 'upi' ? (
                <div className="space-y-3 text-sm sm:text-base">
                  <div className="flex items-center justify-between group/copy p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400 text-[11px] block">PhonePe / Google Pay</span>
                      <strong className="text-gray-950 dark:text-white font-semibold">7217286593</strong>
                    </div>
                    <button
                      onClick={() => handleCopy('7217286593', 'Phone number')}
                      className="text-primary-600 dark:text-primary-450 hover:underline text-xs font-semibold flex items-center gap-1 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex items-center justify-between group/copy p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400 text-[11px] block">UPI ID</span>
                      <strong className="text-gray-950 dark:text-white font-mono text-xs sm:text-sm break-all font-semibold">7217286593@ybl</strong>
                    </div>
                    <button
                      onClick={() => handleCopy('7217286593@ybl', 'UPI ID')}
                      className="text-primary-600 dark:text-primary-450 hover:underline text-xs font-semibold flex items-center gap-1 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 py-1">
                  <div 
                    onClick={() => setShowQRModal(true)}
                    className="cursor-zoom-in relative group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-650 bg-white p-1.5 w-24 hover:shadow-md transition-all duration-300 shrink-0 mx-auto sm:mx-0"
                  >
                    <img 
                      src="/qr_code.jpg" 
                      alt="PhonePe QR Code" 
                      className="w-full h-auto rounded transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded">
                      <span className="text-[10px] text-white bg-black/60 px-1.5 py-0.5 rounded font-semibold">Zoom</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Direct QR Payment</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
                      Scan this QR code using PhonePe, GPay, Paytm, or any UPI app.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowQRModal(true)}
                      className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Enlarge QR Code
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              A screenshot of the collection will be shared monthly to ensure 100% transparency.
            </p>

            <Link
              to="/donate"
              className="bg-primary-600 hover:bg-primary-750 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg inline-block w-full"
            >
              Donate Now
            </Link>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQRModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 transition-opacity duration-300"
            onClick={() => setShowQRModal(false)}
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full relative shadow-2xl border border-gray-150 dark:border-gray-700 transition-all transform scale-100 animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowQRModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-105 hover:bg-gray-200 dark:bg-gray-750 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-base transition-colors font-semibold"
                aria-label="Close modal"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
                Scan QR Code to Donate
              </h3>
              <div className="bg-white p-3 rounded-xl border border-gray-250 dark:border-gray-700 shadow-inner max-w-[260px] mx-auto">
                <img src="/qr_code.jpg" alt="Donation QR Code" className="w-full h-auto rounded-lg" />
              </div>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                Works with PhonePe, GPay, Paytm, BHIM or any banking UPI app.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-850 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-750 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary-600 dark:text-primary-400 mb-2">
                ₹{stats.total.toLocaleString()}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Donations</div>
            </div>
            <div className="bg-white dark:bg-gray-850 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-750 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary-600 dark:text-primary-400 mb-2">
                {stats.count}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Donors</div>
            </div>
            <div className="bg-white dark:bg-gray-850 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-750 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary-600 dark:text-primary-400 mb-2">
                {stats.monthlyCount}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Monthly Contributors</div>
            </div>
            <div className="bg-white dark:bg-gray-850 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-750 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary-600 dark:text-primary-400 mb-2">
                100+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Families Helped</div>
            </div>
          </div>
        </div>
      </section>
      {/* Quote Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white italic">
            "Charity does not decrease wealth."
          </blockquote>
          <cite className="block mt-4 text-lg text-primary-600 dark:text-primary-400">
            – Prophet Muhammad ﷺ
          </cite>
        </div>
      </section>
    </div>
  );
};

export default Home;