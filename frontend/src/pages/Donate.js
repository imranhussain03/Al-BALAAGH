import React, { useState } from 'react';
import axios from 'axios';

const Donate = () => {
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    donorEmail: '',
    paymentMethod: 'PhonePe',
    transactionId: '',
    isMonthly: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/donations`, formData);
      setMessage('Thank you for your donation! Your contribution has been recorded.');
      setFormData({
        amount: '',
        donorName: '',
        donorEmail: '',
        paymentMethod: 'PhonePe',
        transactionId: '',
        isMonthly: false
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error processing donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Make a Donation
          </h1>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your contribution helps us continue our mission of uplifting the Muslim community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Donation Details
            </h2>

            {message && (
              <div className={`p-4 rounded-lg mb-6 ${message.includes('Thank you')
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Donation Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter amount"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, amount: '30' }))}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-sm hover:bg-primary-200 dark:hover:bg-primary-800"
                  >
                    ₹30
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, amount: '100' }))}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-sm hover:bg-primary-200 dark:hover:bg-primary-800"
                  >
                    ₹100
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, amount: '500' }))}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-sm hover:bg-primary-200 dark:hover:bg-primary-800"
                  >
                    ₹500
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="donorName"
                  value={formData.donorName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="donorEmail"
                  value={formData.donorEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="PhonePe">PhonePe</option>
                  <option value="GooglePay">Google Pay</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transaction ID (Optional)
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter transaction ID if available"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isMonthly"
                  checked={formData.isMonthly}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Make this a monthly donation
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Processing...' : 'Submit Donation'}
              </button>
            </form>
          </div>

          {/* Payment Information */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Information
              </h2>

              <div className="space-y-4">
                {/* PhonePe/Google Pay details */}
                <div className={`p-4 rounded-lg transition-all duration-300 ${
                  formData.paymentMethod === 'PhonePe' || formData.paymentMethod === 'GooglePay'
                    ? 'bg-primary-100/50 dark:bg-primary-900/30 border-2 border-primary-500 scale-[1.01] shadow-sm'
                    : 'bg-primary-50 dark:bg-primary-900/20 border border-transparent'
                }`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">PhonePe / Google Pay</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xl sm:text-2xl font-bold text-primary-700 dark:text-primary-400 break-all">7217286593</p>
                    <button
                      type="button"
                      onClick={() => handleCopy('7217286593', 'Phone number')}
                      className="text-xs font-semibold text-primary-600 dark:text-primary-450 hover:underline bg-primary-100 dark:bg-primary-900/60 px-2 py-1 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* UPI ID details */}
                <div className={`p-4 rounded-lg transition-all duration-300 ${
                  formData.paymentMethod === 'UPI'
                    ? 'bg-primary-100/50 dark:bg-primary-900/30 border-2 border-primary-500 scale-[1.01] shadow-sm'
                    : 'bg-primary-50 dark:bg-primary-900/20 border border-transparent'
                }`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">UPI ID</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xl sm:text-2xl font-bold text-primary-700 dark:text-primary-400 break-all font-mono">7217286593@ybl</p>
                    <button
                      type="button"
                      onClick={() => handleCopy('7217286593@ybl', 'UPI ID')}
                      className="text-xs font-semibold text-primary-600 dark:text-primary-450 hover:underline bg-primary-100 dark:bg-primary-900/60 px-2 py-1 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* QR Code details */}
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg border border-transparent">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Scan PhonePe QR Code</h3>
                    <span className="bg-primary-100 text-primary-850 dark:bg-primary-900 dark:text-primary-300 text-xs px-2 py-0.5 rounded-full font-semibold">Quick Pay</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div 
                      onClick={() => setShowQRModal(true)}
                      className="cursor-zoom-in relative group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-650 bg-white p-1.5 w-24 hover:shadow-md transition-all duration-300 shrink-0"
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
                    <div className="text-center sm:text-left">
                      <p className="text-xs text-gray-655 dark:text-gray-300 mb-2 leading-relaxed">
                        Scan using PhonePe, Google Pay, Paytm, or any UPI app to make a direct contribution.
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
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  📸 Transparency Commitment
                </h4>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  A screenshot of the collection will be shared monthly to ensure complete transparency
                  in how your donations are being utilized.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Why Donate?
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                  Support education initiatives for underprivileged children
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                  Help families in need through our charitable programs
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                  Contribute to community empowerment projects
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                  Support Zakat counseling and guidance services
                </li>
              </ul>
            </div>

            <div className="bg-primary-600 dark:bg-primary-700 p-6 rounded-lg text-white text-center">
              <h3 className="text-lg font-semibold mb-2">Monthly Contribution</h3>
              <p className="text-3xl font-bold mb-2">₹30</p>
              <p className="text-primary-100">
                Join our monthly contributors and make a sustained impact on the community
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mt-16">
          <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white italic">
            "The example of those who spend their wealth in the way of Allah is like a seed of grain
            which grows seven spikes; in each spike is a hundred grains."
          </blockquote>
          <cite className="block mt-4 text-lg text-primary-600 dark:text-primary-400">
            – Quran 2:261
          </cite>
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
    </div>
  );
};

export default Donate;