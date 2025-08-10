import React, { useState } from 'react'
import Profile from './Profile';
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import { MdNotes, MdSearch } from "react-icons/md";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const handleLogoClick = () => {
    // If user is logged in, go to dashboard, otherwise go to home page
    if (userInfo) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className='bg-white border-b border-gray-200 shadow-soft'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo and Brand */}
          <div 
            className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-200'
            onClick={handleLogoClick}
          >
            <div className='w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center'>
              <MdNotes className='text-2xl text-white' />
            </div>
            <div>
              <h1 className='text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'>
                NotesApp
              </h1>
              <p className='text-xs text-gray-500 -mt-1'>Organize your thoughts</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className='flex-1 max-w-2xl mx-8'>
            <SearchBar 
                value={searchQuery}
                onChange={({ target }) => {
                  setSearchQuery(target.value);
                }}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}    
            />
          </div>
          
          {/* User Profile */}
          {userInfo && <Profile userInfo={userInfo} onLogout={onLogout} />}
        </div>
      </div>
    </div>
  );
}

export default Navbar