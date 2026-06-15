import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Media */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="AL BALAAGH Logo"
                className="w-10 h-10 rounded-full object-cover border border-gray-700 shadow-sm"
              />
              <span className="text-xl font-bold">AL BALAAGH FOUNDATION</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Follow us on our official social media handles to stay updated on our ongoing projects, donation transparency sheets, and volunteer events.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/al_balaagh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-400 transition-colors p-2 bg-gray-700/40 rounded-full hover:bg-gray-750"
                title="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.885.06 1.019.049 1.572.22 1.94.362.489.19 1.242.493 1.637.888.395.395.698 1.148.888 1.637.142.368.313.92.362 1.94.05 1.1.06 1.455.06 3.885 0 2.43-.008 2.784-.06 3.885-.049 1.02-.22 1.573-.362 1.94-.19.489-.493 1.242-.888 1.637-.395.395-1.148.698-1.637.888-.368.142-.92.313-1.94.362-1.1.05-1.455.06-3.885.06-2.43 0-2.784-.008-3.885-.06-1.02-.049-1.572-.22-1.94-.362-1.43-.574-1.92-1.06-2.494-1.637-.577-.574-.882-1.242-1.082-1.637-.142-.368-.313-.92-.362-1.94-.05-1.1-.06-1.455-.06-3.885 0-2.43.008-2.784.06-3.885.049-1.02.22-1.573.362-1.94.19-.489.493-1.242.888-1.637.395-.395 1.148-.698 1.637-.888.368-.142.92-.313 1.94-.362 1.1-.05 1.455-.06 3.885-.06zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.2c-1.767 0-3.2-1.433-3.2-3.2 0-1.767 1.433-3.2 3.2-3.2 1.767 0 3.2 1.433 3.2 3.2 0 1.767-1.433 3.2-3.2 3.2zm6.2-9.3c0-.608-.492-1-1-1s-1 .492-1 1 .492 1 1 1 1-.492 1-1z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors p-2 bg-gray-700/40 rounded-full hover:bg-gray-750"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors p-2 bg-gray-700/40 rounded-full hover:bg-gray-750"
                title="X (formerly Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors p-2 bg-gray-700/40 rounded-full hover:bg-gray-750"
                title="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.688 22 12 22 12s0 3.313-.42 4.814a2.47 2.47 0 01-1.768 1.768c-1.5.42-7.812.42-7.812.42s-6.313 0-7.814-.42a2.472 2.472 0 01-1.768-1.768C2 15.313 2 12 2 12s0-3.313.42-4.814a2.47 2.47 0 011.768-1.768C5.687 5 12 5 12 5s6.313 0 8.02.418zM9.75 15.02l5.75-3.02-5.75-3v6.04z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/donate" className="text-gray-300 hover:text-primary-400 transition-colors">Donate</Link></li>
              <li><Link to="/transparency" className="text-gray-300 hover:text-primary-400 transition-colors">Transparency</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>📧 albalaagh03@gmail.com</p>
              <p>📞 7217286593</p>
              <p>📍 Lal kothi road, katihar, bihar</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-4 pt-4 text-center">
          <p className="text-gray-300">
            © 2025 AL BALAAGH FOUNDATION. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            "Charity does not decrease wealth." – Prophet Muhammad ﷺ
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;