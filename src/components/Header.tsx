import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Job Tracker', href: '/jobs' },
    { name: 'About', href: '/about' }
  ];

  // Add Dashboard for authenticated users
  if (currentUser) {
    navigation.push({ name: 'Dashboard', href: '/dashboard' });
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/koala.svg" alt="Koala logo" className="h-8 w-8 sm:h-10 sm:w-10" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Resume Koala</h1>
              <p className="text-xs sm:text-sm text-gray-600">Professional Resume Scanner</p>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden lg:block">
            <ul className="flex gap-6">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition ${
                      location.pathname === item.href
                        ? 'text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {!currentUser && (
                <li>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 border-t pt-4">
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`block text-sm font-medium transition ${
                      location.pathname === item.href
                        ? 'text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {!currentUser && (
                <li>
                  <Link
                    to="/login"
                    className="block text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;