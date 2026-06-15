import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    return `${backendUrl}${url}`;
  };
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [stats, setStats] = useState({ total: 0, count: 0, monthlyCount: 0 });
  const [loading, setLoading] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [reportForm, setReportForm] = useState({
    reportType: 'Monthly',
    title: '',
    month: '',
    year: new Date().getFullYear(),
    totalCollected: '',
    totalSpent: '',
    description: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user?.isAdmin) {
          // Admin sees all donations
          const donationsResponse = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/donations/all`);
          setDonations(donationsResponse.data);

          // Admin sees global stats
          const statsResponse = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/donations/stats`);
          setStats(statsResponse.data);

          // Admin sees volunteers
          const volunteersResponse = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/volunteers`);
          setVolunteers(volunteersResponse.data);

          // Admin sees join requests
          const joinRequestsResponse = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/join`);
          setJoinRequests(joinRequestsResponse.data);
        } else {
          // Regular user sees their own donations
          const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/donations/my-donations`);
          setDonations(response.data);

          const userTotal = response.data.reduce((sum, donation) => sum + donation.amount, 0);
          setStats({ total: userTotal, count: response.data.length, monthlyCount: 0 });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!screenshot) {
      alert('Please upload a screenshot or receipt image.');
      return;
    }

    const formData = new FormData();
    formData.append('reportType', reportForm.reportType);
    formData.append('year', reportForm.year);
    formData.append('description', reportForm.description);
    formData.append('screenshot', screenshot);

    if (reportForm.reportType === 'Monthly') {
      formData.append('month', reportForm.month);
      formData.append('totalCollected', reportForm.totalCollected);
      formData.append('totalSpent', reportForm.totalSpent);
    } else {
      formData.append('title', reportForm.title);
      if (reportForm.totalCollected !== '') {
        formData.append('totalCollected', reportForm.totalCollected);
      }
      if (reportForm.totalSpent !== '') {
        formData.append('totalSpent', reportForm.totalSpent);
      }
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/transparency`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Transparency report uploaded successfully!');
      setShowReportForm(false);
      setScreenshot(null);
      setReportForm({
        reportType: 'Monthly',
        title: '',
        month: '',
        year: new Date().getFullYear(),
        totalCollected: '',
        totalSpent: '',
        description: ''
      });
    } catch (error) {
      alert('Error uploading report: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {user?.isAdmin ? 'Admin Dashboard' : 'Your donation dashboard and contribution history'}
            </p>
          </div>
        </div>

        {/* User Status / Become a Member or Volunteer CTA */}
        {!user?.isAdmin && (
          <div className="mb-8">
            {(user?.isVolunteer || user?.isMember) ? (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-primary-600 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Your Foundation Involvement
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user?.isMember && (
                      <span className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center">
                        <span className="mr-1.5">🤝</span> General Member
                      </span>
                    )}
                    {user?.isVolunteer && (
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center">
                        <span className="mr-1.5">🙋‍♂️</span> Volunteer ({user?.volunteerDetails?.department || 'Active'})
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-650 dark:text-gray-400 mt-4 md:mt-0 max-w-md">
                  Thank you for being a vital part of AL BALAAGH FOUNDATION. Your active participation helps us build a stronger community.
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-amber-500 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Get Involved with AL BALAAGH
                  </h2>
                  <p className="text-gray-650 dark:text-gray-300 text-sm mt-1">
                    You are not currently registered as a Member or Volunteer. Join us to support community initiatives!
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link
                    to="/join"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg inline-block text-center"
                  >
                    Join Us / Volunteer Now
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user?.isAdmin ? 'Total Collected' : 'Your Contributions'}
                </h3>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ₹{stats.total?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user?.isAdmin ? 'Total Donors' : 'Donations Made'}
                </h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.count || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user?.isAdmin ? 'Monthly Contributors' : 'Impact Level'}
                </h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {user?.isAdmin ? (stats.monthlyCount || 0) : 'Supporter'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Section */}
        {user?.isAdmin && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Actions
              </h2>
              <button
                onClick={() => setShowReportForm(!showReportForm)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                {showReportForm ? 'Cancel' : 'Upload Transparency Report'}
              </button>
            </div>

            {showReportForm && (
              <form onSubmit={handleReportSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Report Type
                  </label>
                  <select
                    value={reportForm.reportType}
                    onChange={(e) => setReportForm({ ...reportForm, reportType: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Monthly">Monthly Report (with Stats)</option>
                    <option value="Half-Yearly">Half-Yearly Report</option>
                    <option value="Annual">Annual Report</option>
                    <option value="Other">Other / Audited Statement</option>
                  </select>
                </div>

                {reportForm.reportType === 'Monthly' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Month
                    </label>
                    <select
                      value={reportForm.month}
                      onChange={(e) => setReportForm({ ...reportForm, month: e.target.value })}
                      required={reportForm.reportType === 'Monthly'}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select Month</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Report Title / Period
                    </label>
                    <input
                      type="text"
                      value={reportForm.title}
                      onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                      required={reportForm.reportType !== 'Monthly'}
                      placeholder="e.g. H1 (Jan - Jun) or Audited Balance Sheet"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    value={reportForm.year}
                    onChange={(e) => setReportForm({ ...reportForm, year: parseInt(e.target.value) })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Collected (₹) {reportForm.reportType !== 'Monthly' && '(Optional)'}
                  </label>
                  <input
                    type="number"
                    value={reportForm.totalCollected}
                    onChange={(e) => setReportForm({ ...reportForm, totalCollected: e.target.value })}
                    required={reportForm.reportType === 'Monthly'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder={reportForm.reportType !== 'Monthly' ? "Optional collected sum" : "Enter collected amount"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Spent (₹) {reportForm.reportType !== 'Monthly' && '(Optional)'}
                  </label>
                  <input
                    type="number"
                    value={reportForm.totalSpent}
                    onChange={(e) => setReportForm({ ...reportForm, totalSpent: e.target.value })}
                    required={reportForm.reportType === 'Monthly'}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder={reportForm.reportType !== 'Monthly' ? "Optional spent sum" : "Enter spent amount"}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description / Impact Notes
                  </label>
                  <textarea
                    value={reportForm.description}
                    onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Describe the period, audits, or impact details..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Screenshot / Evidence Image or PDF (Receipt)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setScreenshot(e.target.files[0])}
                    className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-gray-700 dark:file:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Upload Report
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Donation History */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user?.isAdmin ? 'Recent Donations' : 'Your Donation History'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            {donations.length === 0 ? (
              <div className="p-8 text-center">
                <span className="text-4xl mb-4 block">💝</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No donations yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Start making a difference by contributing to our cause
                </p>
                <Link
                  to="/donate"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-block"
                >
                  Make Your First Donation
                </Link>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    {user?.isAdmin && (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Donor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                      </>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {donations.map((donation) => (
                    <tr key={donation._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                      {user?.isAdmin && (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {donation.donorName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {donation.donorEmail}
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        ₹{donation.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {donation.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {donation.isMonthly ? (
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                            Monthly
                          </span>
                        ) : (
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs">
                            One-time
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs">
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {user?.isAdmin && (
          <>
            {/* Volunteer Registrations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="mr-2">🙋‍♂️</span> Volunteer Registrations ({volunteers.length})
                </h2>
              </div>

              <div className="overflow-x-auto">
                {volunteers.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No volunteer registrations found.
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Photo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Contact Info
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Aadhar & Edu
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {volunteers.map((vol) => (
                        <tr key={vol._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {new Date(vol.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {vol.photo ? (
                              <a href={getImageUrl(vol.photo)} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={getImageUrl(vol.photo)}
                                  alt={vol.name}
                                  className="w-10 h-10 object-cover rounded-full border border-gray-200 hover:scale-110 transition-transform cursor-pointer"
                                />
                              </a>
                            ) : (
                              <span className="text-gray-400 text-xs">N/A</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                            {vol.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            <div>{vol.email}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{vol.phone}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            <div className="font-mono text-xs">{vol.aadhar}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{vol.education}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                              {vol.department}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs break-words">
                            {vol.message || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Join Requests */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="mr-2">🤝</span> Join Us Requests ({joinRequests.length})
                </h2>
              </div>

              <div className="overflow-x-auto">
                {joinRequests.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No join requests found.
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Contact Info
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Interest Area
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {joinRequests.map((req) => (
                        <tr key={req._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                            {req.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            <div>{req.email}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{req.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full text-xs">
                              {req.interestArea}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs break-words">
                            {req.message || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}

        {/* Call to Action */}
        <div className="mt-8 bg-primary-600 dark:bg-primary-700 p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Continue Supporting Our Mission
          </h3>
          <p className="text-primary-100 mb-4">
            Your contributions help us make a real difference in the community
          </p>
          <Link
            to="/donate"
            className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Make Another Donation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;