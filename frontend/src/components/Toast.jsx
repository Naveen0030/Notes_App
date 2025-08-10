import React, { useEffect } from 'react'
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline, MdClose, MdInfo } from "react-icons/md";

const Toast = ({isShown, message, type, onClose}) => {
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 4000);
  
    return () => {
      clearTimeout(timeoutId);
    }
  }, [onClose]);
  
  const getToastStyles = () => {
    switch(type) {
      case 'delete':
        return {
          bg: 'bg-red-50 border-red-200',
          icon: 'bg-red-100 text-red-600',
          text: 'text-red-800',
          accent: 'bg-red-500'
        };
      case 'add':
        return {
          bg: 'bg-green-50 border-green-200',
          icon: 'bg-green-100 text-green-600',
          text: 'text-green-800',
          accent: 'bg-green-500'
        };
      case 'edit':
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: 'bg-blue-100 text-blue-600',
          text: 'text-blue-800',
          accent: 'bg-blue-500'
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          icon: 'bg-gray-100 text-gray-600',
          text: 'text-gray-800',
          accent: 'bg-gray-500'
        };
    }
  };

  const getIcon = () => {
    switch(type) {
      case 'delete':
        return <MdDeleteOutline className="text-xl" />;
      case 'add':
        return <LuCheck className="text-xl" />;
      case 'edit':
        return <MdInfo className="text-xl" />;
      default:
        return <MdInfo className="text-xl" />;
    }
  };

  const styles = getToastStyles();
  
  return (
    <div className={`fixed top-6 right-6 z-50 transition-all duration-500 ease-out transform ${
      isShown 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 translate-x-full'
    }`}>
      <div className={`min-w-80 max-w-md bg-white border rounded-2xl shadow-large overflow-hidden ${styles.bg}`}>
        {/* Progress Bar */}
        <div className={`h-1 ${styles.accent} animate-pulse-gentle`}></div>
        
        <div className='flex items-center gap-4 p-4'>
          {/* Icon */}
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${styles.icon} flex-shrink-0`}>
            {getIcon()}
          </div>

          {/* Content */}
          <div className='flex-1 min-w-0'>
            <p className={`text-sm font-medium ${styles.text}`}>
              {message}
            </p>
            <p className='text-xs text-gray-500 mt-1'>
              {type === 'delete' ? 'Note removed successfully' : 
               type === 'add' ? 'Note created successfully' : 
               type === 'edit' ? 'Note updated successfully' : 'Action completed'}
            </p>
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200 flex-shrink-0'
          >
            <MdClose className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast