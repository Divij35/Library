import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Guiding light. All rights reserved.</p>
        <div className="mt-4">
          <a href="/about" className="text-gray-400 hover:text-white mx-2">About</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
