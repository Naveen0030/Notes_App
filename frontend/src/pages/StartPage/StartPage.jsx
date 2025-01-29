import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const StartPage = () => {
  return (
    <>
    <Navbar />

    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to NotesApp
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          Manage your notes efficiently with our secure and user-friendly NotesApp.
          Enjoy features like creating, editing, deleting, and pinning notes, along
          with powerful search functionality to quickly find what you need.
        </p>
      </header>

      {/* Buttons Section */}
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
              <Link to="/login">
                Login
              </Link>
        </button>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
              <Link to="/signup">
                Sign Up
              </Link>
        </button>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-gray-500 text-sm">
        <p>© 2024 NotesApp. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
}

export default StartPage

