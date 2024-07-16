import { authActions, authSelector } from '@/redux/slices/authSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosCall } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
const IncomingVoice = () => {
    const dispatch=useDispatch();
    const user=useSelector(authSelector);

    const acceptCall=()=>{
        dispatch(authActions.setVoiceCall({...user.incomingVoiceCall,type:"in-coming"}))

        user.socket.emit("accept-incoming-call",{from:user.incomingVoiceCall.from})
        dispatch(authActions.setIncomingVoiceCall(''))

    }

    const rejectCall=()=>{
        dispatch(authActions.setEndCall());
        user.socket.emit("reject-voice-call",user.incomingVoiceCall);
    }
  return (
    user.incomingVoiceCall &&
    <div className='fixed left-1/2  text-white flex items-center justify-center h-20 w-1/3 transform -translate-x-1/2 bg-input-bg gap-2 rounded-md'>
        <h1>{user.incomingVoiceCall.from.name}</h1>
        <img src={user.incomingVoiceCall.from.image} width={50} height={50}></img>
        <div className='flex gap-3'>
        <button onClick={acceptCall} className='bg-green-500 p-1 rounded-full'><IoIosCall size={20}/></button>
        <button onClick={rejectCall} className='bg-red-500 p-1 rounded-full'><MdCallEnd size={20}/></button>
        </div>


    </div>
  )
}

export default IncomingVoice