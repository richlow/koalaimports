import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm sm:text-base text-gray-600">© 2024 Resume Koala. All rights reserved.</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy</Link>
              <Link to="/terms" className="hover:text-indigo-600 transition">Terms</Link>
              <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
            </div>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;