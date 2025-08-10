import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { MdNotes, MdSecurity, MdSearch, MdPinDrop } from "react-icons/md";

const StartPage = () => {
  return (
    <>
    <Navbar />

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Main Heading */}
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-6">
                NotesApp
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Transform your thoughts into organized, searchable notes with our intelligent and secure platform
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up">
              <Link to="/login">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
              Why Choose NotesApp?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of simplicity and power in note-taking
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center group p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MdNotes className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Notes</h3>
              <p className="text-gray-600">Create, edit, and organize notes with ease</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-warning rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MdSearch className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Search</h3>
              <p className="text-gray-600">Find your notes instantly with powerful search</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MdPinDrop className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pin Important</h3>
              <p className="text-gray-600">Keep your most important notes at the top</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center group p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MdSecurity className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your notes are protected with enterprise-grade security</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Notes Created</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who have transformed their note-taking experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <button className="px-8 py-4 bg-primary text-white font-semibold rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
                Start Free Today
              </button>
            </Link>
            <Link to="/login">
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all duration-300">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              NotesApp
            </h3>
            <p className="text-gray-400 mt-2">Organize your thoughts, amplify your productivity</p>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">© 2024 NotesApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default StartPage

