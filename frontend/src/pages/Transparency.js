import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transparency = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/transparency`);
      setReports(response.data);
    } catch (error) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    return `${backendUrl}${url}`;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Transparency Reports
          </h1>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We believe in complete transparency. Here are our collection and expenditure reports
            to show how your donations are making a difference.
          </p>
        </div>

        {/* Transparency Commitment */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-12">
          <div className="flex items-center mb-6">

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Transparency Commitment
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Monthly Reports</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Detailed monthly collection and expenditure reports
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Screenshot Evidence</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Screenshots of actual transactions and distributions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Impact Updates</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Regular updates on how donations are creating impact
              </p>
            </div>
          </div>
        </div>

        {/* Reports */}
        {reports.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow-lg text-center">
            <span className="text-6xl mb-4 block">📋</span>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Reports Available Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monthly transparency reports will be published here as they become available.
              We are committed to sharing detailed information about how your donations are being utilized.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {reports.map((report) => (
              <div key={report._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {report.reportType === 'Monthly'
                        ? `${monthNames[parseInt(report.month) - 1]} ${report.year}`
                        : `${report.title} (${report.year})`
                      }
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      report.reportType === 'Monthly' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-450' :
                      report.reportType === 'Half-Yearly' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-450' :
                      report.reportType === 'Annual' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-450' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-450'
                    }`}>
                      {report.reportType || 'Monthly'}
                    </span>
                  </div>

                  {(report.totalCollected !== undefined || report.totalSpent !== undefined) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                      {report.totalCollected !== undefined && report.totalCollected !== null && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-green-805 dark:text-green-200 mb-1">
                            Total Collected
                          </h4>
                          <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                            ₹{report.totalCollected.toLocaleString()}
                          </p>
                        </div>
                      )}
                      {report.totalSpent !== undefined && report.totalSpent !== null && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-850 dark:text-blue-200 mb-1">
                            Total Spent
                          </h4>
                          <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ₹{report.totalSpent.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description / Impact</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {report.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {report.reportType === 'Monthly' ? 'Collection Screenshot' : 'Report File / Screenshot'}
                    </h4>
                    <a
                      href={getImageUrl(report.screenshot)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative group cursor-pointer overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={getImageUrl(report.screenshot)}
                        alt={`Report for ${report.reportType === 'Monthly' ? monthNames[parseInt(report.month) - 1] : report.title} ${report.year}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium">
                        <span>🔍 View Full Document / Image</span>
                      </div>
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-4">
                    <span>Uploaded by: {report.uploadedBy?.name || 'Admin'}</span>
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sample Data Notice */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">ℹ️</span>
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
              About Our Transparency Reports
            </h3>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            We are committed to maintaining complete transparency in our operations. Each month, we publish:
          </p>
          <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>Total amount collected from all donors</li>
            <li>Detailed breakdown of how funds were utilized</li>
            <li>Screenshots of actual transactions and distributions</li>
            <li>Impact stories and beneficiary updates</li>
            <li>Administrative costs and operational expenses</li>
          </ul>
          <p className="text-yellow-700 dark:text-yellow-300 mt-4">
            This ensures that every donor can see exactly how their contribution is making a difference in the community.
          </p>
        </div>

        {/* Contact for Questions */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Questions About Our Reports?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you have any questions about our transparency reports or would like additional information,
            please don't hesitate to contact us.
          </p>
          <a
            href="mailto:contact@albalaghfoundation.org"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Transparency;