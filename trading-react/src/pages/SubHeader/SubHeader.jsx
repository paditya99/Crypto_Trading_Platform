import React from 'react'

const SubHeader = ({title}) => {
  return (
    <div className='px-6 py-4 shadow-sm'>
      <div className='flex items-center justify-start'>
        <h3 className='text-2xl font-bold text-white tracking-wide relative'>
          {title}
          <div className='absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full'></div>
        </h3>
      </div>
    </div>
  )
}

export default SubHeader