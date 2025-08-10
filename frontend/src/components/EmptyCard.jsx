import React from 'react'
import imgSrc from '../assets/images/NoNote.png'
import { MdAdd, MdSearch, MdLightbulb } from "react-icons/md";

const EmptyCard = ({ message = "Add your first note to get started!", onCreateNote }) => {
  return (
    <div className='flex flex-col items-center justify-center py-20 animate-fade-in'>
      {/* Illustration */}
      <div className='relative mb-8'>
        <div className='w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-4'>
          <img src={imgSrc} alt="No Notes" className='w-20 h-20 object-contain'/>
        </div>
        
        {/* Floating Elements */}
        <div className='absolute -top-2 -right-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center animate-bounce-gentle'>
          <MdLightbulb className='text-yellow-600 text-lg' />
        </div>
        <div className='absolute -bottom-2 -left-2 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center animate-bounce-gentle' style={{ animationDelay: '0.3s' }}>
          <MdSearch className='text-green-600 text-sm' />
        </div>
      </div>

      {/* Main Message */}
      <div className='text-center max-w-md mx-auto'>
        <h3 className='text-2xl font-display font-bold text-gray-800 mb-3'>
          No Notes Yet
        </h3>
        <p className='text-gray-600 leading-relaxed mb-6'>
          {message}
        </p>
        
        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <button 
            onClick={onCreateNote}
            className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:from-accent hover:to-primary transition-all duration-300 transform hover:-translate-y-1 shadow-soft hover:shadow-medium'
          >
            <MdAdd className='text-lg' />
            Create Your First Note
          </button>
        </div>
      </div>

      {/* Tips Section */}
      <div className='mt-12 max-w-2xl mx-auto'>
        <h4 className='text-lg font-semibold text-gray-700 mb-4 text-center'>Getting Started Tips</h4>
        <div className='grid md:grid-cols-3 gap-4'>
          <div className='text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/30 transition-colors duration-200'>
            <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3'>
              <MdAdd className='text-blue-600 text-xl' />
            </div>
            <h5 className='font-semibold text-gray-800 mb-2'>Create Notes</h5>
            <p className='text-sm text-gray-600'>Start by creating your first note with a title and content</p>
          </div>
          
          <div className='text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/30 transition-colors duration-200'>
            <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3'>
              <MdSearch className='text-green-600 text-xl' />
            </div>
            <h5 className='font-semibold text-gray-800 mb-2'>Organize</h5>
            <p className='text-sm text-gray-600'>Use tags and categories to keep your notes organized</p>
          </div>
          
          <div className='text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/30 transition-colors duration-200'>
            <div className='w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3'>
              <MdLightbulb className='text-purple-600 text-xl' />
            </div>
            <h5 className='font-semibold text-gray-800 mb-2'>Pin Important</h5>
            <p className='text-sm text-gray-600'>Pin your most important notes for quick access</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyCard