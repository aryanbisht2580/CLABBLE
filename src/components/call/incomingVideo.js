import { authActions, authSelector } from '@/redux/slices/authSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosCall } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
const IncomingVideo = () => {
    
    const dispatch=useDispatch();
    const user=useSelector(authSelector);

    const acceptCall=()=>{
        dispatch(authActions.setVideoCall({...user.incomingVideoCall,type:"in-coming"}))

        user.socket.emit("accept-incoming-call",{from:user.incomingVideoCall.from})
        dispatch(authActions.setIncomingVideoCall(''))
    }

    const rejectCall=()=>{
        dispatch(authActions.setEndCall());
        user.socket.emit("reject-video-call",user.incomingVideoCall);
    }
  return (
    <div className='fixed left-1/2  text-white flex flex-col items-center justify-center h-56 w-56 transform -translate-x-1/2 bg-input-bg gap-2'>
        <h1>{user.incomingVideoCall.from.name}</h1>
        <img src={user.incomingVideoCall.from.image} width={100} height={100}></img>
        <h5>Video Call</h5>
        <div className='flex gap-3'>
        <button onClick={acceptCall} className='bg-green-500 p-1 rounded-full'><IoIosCall size={20}/></button>
        <button onClick={rejectCall} className='bg-red-500 p-1 rounded-full'><MdCallEnd size={20}/></button>
        </div>


    </div>
  )
}

export default IncomingVideo