import React from 'react'
import { IoClose } from "react-icons/io5";
const Popup = ({popup,setPopup}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40'>
      <div className='relative bg-slate-600 text-white py-4 px-8 rounded-lg'>
      <div className='absolute top-2 right-2'>
      <IoClose className='text-[20px] cursor-pointer' onClick={()=>setPopup(prevPopup=>!popup)}/>
      </div>
        Success
      </div>
    </div>
  )
}

export default Popup