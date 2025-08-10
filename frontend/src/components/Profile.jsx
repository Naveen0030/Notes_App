import React, { useState, useRef, useEffect } from 'react'
import { getInitials } from '../utils/helper'
import { MdLogout, MdPerson, MdKeyboardArrowDown, MdSettings } from "react-icons/md";

const Profile = ({ userInfo, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className='flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group'
      >
        {/* Avatar */}
        <div className='w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-soft group-hover:shadow-medium transition-all duration-200'>
          {getInitials(userInfo?.fullName)}
        </div>

        {/* User Info */}
        <div className='text-left hidden sm:block'>
          <p className='text-sm font-semibold text-gray-800'>{userInfo?.fullName}</p>
          <p className='text-xs text-gray-500'>{userInfo?.email}</p>
        </div>

        {/* Dropdown Arrow */}
        <MdKeyboardArrowDown className={`text-gray-400 transition-transform duration-200 ${
          isDropdownOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className='absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-large border border-gray-200 z-50 animate-slide-up'>
          {/* Header */}
          <div className='p-4 border-b border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold'>
                {getInitials(userInfo?.fullName)}
              </div>
              <div>
                <p className='font-semibold text-gray-800'>{userInfo?.fullName}</p>
                <p className='text-sm text-gray-500'>{userInfo?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className='p-2'>
            <button className='w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200'>
              <MdPerson className='text-lg text-gray-500' />
              <span>View Profile</span>
            </button>
            
            <button className='w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200'>
              <MdSettings className='text-lg text-gray-500' />
              <span>Settings</span>
            </button>
            
            <div className='border-t border-gray-100 my-2'></div>
            
            <button 
              onClick={onLogout}
              className='w-full flex items-center gap-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
            >
              <MdLogout className='text-lg' />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile