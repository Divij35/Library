import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
