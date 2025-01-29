import React from 'react'
import imgSrc from '../assets/images/NoNote.png'
const EmptyCard = (message ) => {
  return (
    <div className='flex items-center justify-center mt-20'>
        <img src={imgSrc} alt="No Notes" className='w-100'/>

        <p className='w-1/2 text-ml font-medium text-slate-700 text-center leading-7 mt-5'>
            Add your Note now...
        </p>
    </div>
  )
}

export default EmptyCard