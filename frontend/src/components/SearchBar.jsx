import React, { useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io"
import { MdSearch } from "react-icons/md";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`relative w-full max-w-md mx-auto transition-all duration-300 ${
      isFocused ? 'scale-105' : 'scale-100'
    }`}>
      <div className={`relative flex items-center bg-white border-2 rounded-xl shadow-soft transition-all duration-300 ${
        isFocused 
          ? 'border-primary shadow-medium' 
          : 'border-gray-200 hover:border-gray-300'
      }`}>
        {/* Search Icon */}
        <div className='absolute left-4 text-gray-400'>
          <MdSearch className='text-lg' />
        </div>

        {/* Input Field */}
        <input 
          type="text" 
          placeholder='Search your notes...'
          className='w-full pl-12 pr-12 py-3 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-700'
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyPress={handleKeyPress}
        />

        {/* Clear Button */}
        {value && (
          <button
            onClick={onClearSearch}
            className='absolute right-12 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 group'
          >
            <IoMdClose className="text-lg text-gray-400 group-hover:text-gray-600" />
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={!value}
          className={`absolute right-2 p-2 rounded-lg transition-all duration-200 ${
            value 
              ? 'bg-primary text-white hover:bg-accent hover:scale-105' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <FaMagnifyingGlass className="text-sm" />
        </button>
      </div>

      {/* Search Suggestions (Optional) */}
      {isFocused && value && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-large z-10 animate-slide-up'>
          <div className='p-3 text-sm text-gray-500 border-b border-gray-100'>
            Press Enter to search for "{value}"
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar