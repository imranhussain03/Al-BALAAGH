import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const serviceData = {
  education: {
    title: 'Education Platform',
    icon: '📚',
    color: 'amber',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-100 dark:bg-amber-900/40',
    tagline: 'Empowering minds with quality Islamic & modern education',
    description: 'We are building a comprehensive curriculum that bridges traditional Islamic values with modern academic and scientific education. The platform will feature live and recorded courses, physical workshops, student counseling, and academic scholarships.',
    milestones: [
      'Interactive Online LMS',
      'Islamic Studies & Modern Tech Syllabi',
      'One-on-One Youth Mentorship',
      'Higher Education Scholarships'
    ]
  },
  empowerment: {
    title: 'Socioeconomic Empowerment Hub',
    icon: '💼',
    color: 'blue',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    accentBg: 'bg-blue-100 dark:bg-blue-900/40',
    tagline: 'Fostering financial independence and community growth',
    description: 'Our upcoming empowerment hub is designed to offer professional skill-development courses, small business incubation, interest-free microfinance schemes (Qard-e-Hasana), and job matchmaking portals to establish self-reliant livelihoods.',
    milestones: [
      'Vocational Training Workshops',
      'Interest-free Business Micro-loans',
      'Mentorship from Industry Leaders',
      'Community Employment Exchange'
    ]
  },
  'charitable-aid': {
    title: 'Charitable Aid Network',
    icon: '🤝',
    color: 'purple',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    accentBg: 'bg-purple-100 dark:bg-purple-900/40',
    tagline: 'Serving humanity with transparent and direct relief',
    description: 'We are creating a robust, community-verified network to deliver essential food kits, medical assistance, disaster relief, and emergency financial aid. With built-in transparency trackers, every donor can see their contribution reach the recipient.',
    milestones: [
      'Verified Recipient Database',
      'Emergency Relief Support Line',
      'Monthly Essential Ration Supply',
      'Live Distribution Transparency Logs'
    ]
  },
  'zakat-counseling': {
    title: 'Zakat Counseling & Helpdesk',
    icon: '🕌',
    color: 'emerald',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    accentBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    tagline: 'Fulfilling Zakat duties with precision and care',
    description: 'Calculate, verify, and understand your Zakat obligation with confidence. We are launching an automated calculator tool, hosting educational resources, and offering free one-on-one sessions with scholars to ensure your funds reach the eligible recipients.',
    milestones: [
      'Advanced Zakat Asset Calculator',
      '1-on-1 Confidential Advisory Desk',
      'Calculations Verification System',
      'Distribution Eligibility Guidance'
    ]
  }
};

const ComingSoon = () => {
  const { serviceId } = useParams();
  const service = serviceData[serviceId] || serviceData.education;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-primary-50/10 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900/60 flex items-center justify-center">
      <div className="max-w-3xl w-full text-center space-y-8 animate-scaleIn">
        {/* Large Decorative Icon with hover rotation */}
        <div className={`w-28 h-28 ${service.bgColor} border-2 ${service.borderColor} rounded-3xl flex items-center justify-center mx-auto text-5xl shadow-lg relative group overflow-hidden transition-all duration-300 hover:rotate-6`}>
          <div className="absolute inset-0 bg-white/20 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <span className="relative z-10">{service.icon}</span>
        </div>

        {/* Dynamic Launch Header */}
        <div className="space-y-4">
          <span className="bg-primary-100 text-primary-800 dark:bg-primary-900/45 dark:text-primary-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block animate-pulse">
            🚀 Launching Soon
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {service.title}
          </h1>
          <p className={`text-base sm:text-lg font-medium ${service.textColor} max-w-2xl mx-auto`}>
            {service.tagline}
          </p>
        </div>

        {/* Service Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 text-left shadow-xl border border-gray-150 dark:border-gray-700 max-w-2xl mx-auto space-y-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            {service.description}
          </p>
          
          <div className="border-t border-gray-100 dark:border-gray-755 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              Upcoming Capabilities
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.milestones.map((milestone, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className={`w-2 h-2 rounded-full ${service.bgColor} border ${service.borderColor} shrink-0`} />
                  <span>{milestone}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interaction Form: Newsletter Notify Me */}
        <div className="max-w-md mx-auto space-y-4">
          {subscribed ? (
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 rounded-xl text-green-800 dark:text-green-300 text-sm font-medium animate-fadeIn">
              🎉 Thank you! We've registered your interest and will notify you as soon as this feature launches.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email to get notified"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-350 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg text-sm shrink-0"
              >
                Notify Me
              </button>
            </form>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Be the first to get access when we launch. No spam, ever.
          </p>
        </div>

        {/* Back navigation */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline"
          >
            <span>← Back to Home Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
