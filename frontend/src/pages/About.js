import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: '🤲',
      title: 'Compassion',
      description: 'We approach every situation with empathy and understanding, treating all individuals with dignity and respect.',
      borderColor: 'border-amber-500',
    },
    {
      icon: '🔍',
      title: 'Transparency',
      description: 'We maintain complete transparency in our operations, ensuring donors and beneficiaries are fully informed.',
      borderColor: 'border-blue-500',
    },
    {
      icon: '⚖️',
      title: 'Justice',
      description: 'We strive for fairness and equity in all our programs, ensuring resources reach those who need them most.',
      borderColor: 'border-purple-500',
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            About AL BALAAGH FOUNDATION
          </h1>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dedicated to uplifting the Muslim community through comprehensive support and guidance
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10 sm:mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border-t-4 border-amber-500 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To create a thriving Muslim community where every individual has access to quality education, 
              economic opportunities, and spiritual guidance. We envision a society where Islamic values 
              guide our actions and where mutual support strengthens our bonds.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border-t-4 border-primary-500 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To uplift the Muslim community through initiatives in education, socioeconomic empowerment, 
              charitable aid, and comprehensive counseling on Zakat principles. We strive to create 
              sustainable solutions that address both immediate needs and long-term development.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-10 sm:mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/services/education" className="group block">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg border-t-4 border-amber-500 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4 group-hover:scale-110 transition-transform">📚</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Education</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  We provide educational support through scholarships, tutoring programs, and Islamic studies. 
                  Our goal is to ensure every child has access to quality education that combines modern 
                  knowledge with Islamic values.
                </p>
              </div>
            </Link>

            <Link to="/services/empowerment" className="group block">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg border-t-4 border-blue-500 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4 group-hover:scale-110 transition-transform">💼</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Socioeconomic Empowerment</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Through skill development programs, microfinance initiatives, and job placement assistance, 
                  we help community members achieve financial independence and contribute to economic growth.
                </p>
              </div>
            </Link>

            <Link to="/services/charitable-aid" className="group block">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg border-t-4 border-purple-500 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4 group-hover:scale-110 transition-transform">🤝</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Charitable Initiatives</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  We organize food distribution drives, medical assistance programs, and emergency relief 
                  efforts to support those facing hardships in our community.
                </p>
              </div>
            </Link>

            <Link to="/services/zakat-counseling" className="group block">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg border-t-4 border-emerald-500 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4 group-hover:scale-110 transition-transform">🕌</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Zakat Counseling</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  We provide comprehensive guidance on Zakat calculation, distribution, and the spiritual 
                  significance of this pillar of Islam, ensuring proper fulfillment of religious obligations.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg mb-10 sm:mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className={`bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg border-t-4 ${val.borderColor} text-center hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300`}
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  {val.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary-600 dark:bg-primary-700 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            Join Us
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Together, we can build a stronger, more prosperous Muslim community. Your support, 
            whether through donations, volunteering, or spreading awareness, makes a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Make a Donation
            </Link>
            <Link
              to="/join"
              className="bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors inline-block text-center"
            >
              Join Us
            </Link>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mt-16">
          <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white italic">
            "The believers in their mutual kindness, compassion, and sympathy are just one body; 
            if a limb suffers, the whole body responds to it with wakefulness and fever."
          </blockquote>
          <cite className="block mt-4 text-lg text-primary-600 dark:text-primary-400">
            – Prophet Muhammad ﷺ
          </cite>
        </div>
      </div>
    </div>
  );
};

export default About;