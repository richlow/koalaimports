import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CONSENT_KEY = 'resume_koala_cookie_consent';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(CONSENT_KEY);
    if (!hasConsent) {
      // Add a small delay before showing the banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 transform transition-transform duration-500 ease-in-out z-50">
      <div className="bg-white border-t border-gray-200 shadow-lg px-4 py-3 sm:px-6 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm sm:text-base text-gray-600">
              We use cookies to enhance your experience and analyze our website traffic. 
              By clicking "Accept", you consent to our use of cookies.
              <a 
                href="/privacy" 
                className="text-indigo-600 hover:text-indigo-700 ml-1 underline"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={acceptCookies}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              Accept
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;