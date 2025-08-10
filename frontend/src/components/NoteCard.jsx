import moment from 'moment';
import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete, MdLabel } from "react-icons/md";

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote}) => {
  return (
    <div className='group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 cursor-pointer'>
      {/* Pin Indicator */}
      <div className='absolute top-4 right-4'>
        <button 
          onClick={onPinNote}
          className={`p-2 rounded-full transition-all duration-200 ${
            isPinned 
              ? 'bg-primary text-white shadow-soft' 
              : 'text-gray-400 hover:text-primary hover:bg-gray-100'
          }`}
        >
          <MdOutlinePushPin className={`text-lg ${isPinned ? 'animate-bounce-gentle' : ''}`} />
        </button>
      </div>

      {/* Header Section */}
      <div className='mb-4'>
        <h3 className='text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200'>
          {title}
        </h3>
        <div className='flex items-center text-sm text-gray-500'>
          <span className='inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium'>
            {moment(date).format('MMM DD, YYYY')}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className='mb-4'>
        <p className='text-gray-600 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-200'>
          {content}
        </p>
      </div>

      {/* Tags Section */}
      {tags && tags.length > 0 && (
        <div className='mb-4'>
          <div className='flex items-center gap-2 mb-2'>
            <MdLabel className='text-gray-400 text-sm' />
            <span className='text-xs text-gray-500 font-medium'>Tags</span>
          </div>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag, index) => (
              <span 
                key={index}
                className='inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors duration-200'
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
        <div className='flex items-center gap-2'>
          <button 
            onClick={onEdit}
            className='p-2 rounded-lg text-gray-500 hover:text-success hover:bg-green-50 transition-all duration-200 group/btn'
          >
            <MdCreate className='text-lg group-hover/btn:scale-110 transition-transform duration-200' />
          </button>
          <button 
            onClick={onDelete}
            className='p-2 rounded-lg text-gray-500 hover:text-danger hover:bg-red-50 transition-all duration-200 group/btn'
          >
            <MdDelete className='text-lg group-hover/btn:scale-110 transition-transform duration-200' />
          </button>
        </div>
        
        {/* Note Status */}
        <div className='text-xs text-gray-400'>
          {isPinned && (
            <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary'>
              <MdOutlinePushPin className='text-xs' />
              Pinned
            </span>
          )}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
    </div>
  )
}

export default NoteCard