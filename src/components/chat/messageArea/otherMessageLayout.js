import { authActions } from '@/redux/slices/authSlice';
import { BACKEND_URL } from '@/utils/apiRoutes'
import React from 'react'
import { useDispatch } from 'react-redux'

const OtherMessageLayout = ({message}) => {
    const dispatch=useDispatch();
  return (
    <div className='flex'>
        <div className='flex items-end py-2 w-1/2 '>
                
                {   message.type==="text" &&
                // <div className='bg-blue-btn text-end  p-3 rounded-lg py-2'>{message.message}</div>
                <div className='bg-white text-black p-3 rounded-lg max-w-[90%] break-words '>{message.message}</div>
                   
                }
                {
                    message.type==="image" &&
                    <img src={`${message.message}`} className='h-auto w-1/2 cursor-pointer rounded-md' onClick={()=>dispatch(authActions.setImageShow(`${BACKEND_URL}/${message.message}`))}></img>
                }
            </div>
        
    </div>
  )
}

export default OtherMessageLayout