import { authActions } from '@/redux/slices/authSlice'
import { BACKEND_URL } from '@/utils/apiRoutes'
import React from 'react'
import { useDispatch } from 'react-redux'

const SenderMessageLayout = ({ message }) => {
    const dispatch=useDispatch();
    return (
        <div className='flex justify-end my-2'>

            
            <div className='flex items-end gap-2 w-1/2 justify-end'>
                
                {   message.type=="text" &&
                <div className='bg-blue-btn text-start  p-3 rounded-lg py-2 max-w-[90%] break-words '>{message.message}</div>
                   
                }
                {
                    message.type=="image" &&
                    <img src={`${BACKEND_URL}/${message.message}`} className='h-auto w-1/2 cursor-pointer rounded-md' onClick={()=>dispatch(authActions.setImageShow(`${BACKEND_URL}/${message.message}`))}></img>
                    
                    // <img src={`/defaultUser.png`} className='h-auto w-48'></img>
                }
                <div className={`h-2 w-2 ${message.messageStatus=="read"?"bg-green-600":message.messageStatus=="delivered"?"bg-green-600":'bg-gray-600'} rounded-full`}></div>
            </div>
            
        </div>
    )
}

export default SenderMessageLayout