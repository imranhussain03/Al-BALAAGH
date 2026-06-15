import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const JoinUs = () => {
  const { user } = useAuth();
  const [joinType, setJoinType] = useState('General'); // 'General' or 'Volunteer'
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    aadhar: '',
    education: '',
    department: 'Education Team',
    message: ''
  });

  // Pre-fill user details when user session is loaded
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      if (joinType === 'General') {
        // Submit general request (JSON)
        await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/join`, {
          name: form.name,
          phone: form.phone,
          email: user?.email || form.email,
          interestArea: 'General',
          message: form.message
        });
        setSuccess('Thank you! Your join request has been submitted successfully.');
        setForm({
          name: '',
          phone: '',
          email: '',
          aadhar: '',
          education: '',
          department: 'Education Team',
          message: ''
        });
      } else {
        // Submit volunteer request (multipart/FormData)
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('phone', form.phone);
        formData.append('email', form.email);
        formData.append('aadhar', form.aadhar);
        formData.append('education', form.education);
        formData.append('department', form.department);
        if (form.message) {
          formData.append('message', form.message);
        }
        if (photo) {
          formData.append('photo', photo);
        }

        await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/volunteers`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccess('Thank you! Your volunteer application has been submitted successfully.');
        setForm({
          name: '',
          phone: '',
          email: '',
          aadhar: '',
          education: '',
          department: 'Education Team',
          message: ''
        });
        setPhoto(null);
        // Reset file input value
        const fileInput = document.getElementById('photo-upload');
        if (fileInput) fileInput.value = '';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    'Education Team',
    'Social Welfare Team',
    'Dawah & Awareness Team',
    'Counseling & Guidance Team',
    "Women's Development Team",
    'Events & Programs Team',
    'Media & Social Media Team',
    'Content & Design Team',
    'Fundraising & Partnerships Team',
    'Administration & Volunteer Management Team'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Join AL BALAAGH FOUNDATION
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Be a part of our mission to uplift the community. Register as a member or apply to volunteer.
          </p>
        </div>

        {/* Form Selector Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
          <div className="flex border-b border-gray-150 dark:border-gray-700">
            <button
              onClick={() => {
                setJoinType('General');
                setSuccess('');
                setError('');
              }}
              className={`w-1/2 py-3 px-2 font-semibold text-center text-xs sm:text-sm md:text-base transition-colors ${
                joinType === 'General'
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              🤝 Join as General Member
            </button>
            <button
              onClick={() => {
                setJoinType('Volunteer');
                setSuccess('');
                setError('');
              }}
              className={`w-1/2 py-3 px-2 font-semibold text-center text-xs sm:text-sm md:text-base transition-colors ${
                joinType === 'Volunteer'
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              🙋‍♂️ Become a Volunteer
            </button>
          </div>

          <div className="p-8">
            {success && (
              <div className="p-4 mb-6 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800">
                {success}
              </div>
            )}
            {error && (
              <div className="p-4 mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {joinType === 'General' ? (
                // General Member inputs
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="Enter mobile number"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>
              ) : (
                // Volunteer inputs
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="Enter mobile number"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Aadhar Number
                      </label>
                      <input
                        type="text"
                        name="aadhar"
                        required
                        value={form.aadhar}
                        onChange={handleInputChange}
                        placeholder="Enter 12-digit Aadhar number"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Education Background
                      </label>
                      <input
                        type="text"
                        name="education"
                        required
                        value={form.education}
                        onChange={handleInputChange}
                        placeholder="e.g. Graduate, B.Tech, XII"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Department Selection
                      </label>
                      <select
                        name="department"
                        value={form.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                      >
                        {departments.map((dept, index) => (
                          <option key={index} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Photo (Optional)
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-gray-700 dark:file:text-white transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message / Comments (Optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleInputChange}
                  placeholder="Share any details or comments..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
