import { authActions, authSelector } from '@/redux/slices/authSlice';
import React from 'react'
import { CiSearch,CiVideoOn  } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";
const MessageAreaHeader = () => {
  const {current_chat}=useSelector(authSelector);
  const {onlineUsers}=useSelector(authSelector);
  const dispatch=useDispatch();
  const handleVoiceCall=()=>{
    dispatch(authActions.setVoiceCall({
      ...current_chat,
      roomId:Date.now(),
      callType:"voice",
      type:"out-going"
    }));
  }
  const handleVideoCall=()=>{
    dispatch(authActions.setVideoCall({
      ...current_chat,
      roomId:Date.now(),
      callType:"video",
      type:"out-going"
    }));
  }

  const handleback=()=>{
    dispatch(authActions.setcurrent_chat(undefined))
  }
  return (
    <div className='bg-input-bg p-3 rounded-lg flex items-center gap-3 px-5'>
      <div className='bg-black-bg p-2 rounded-md cursor-pointer'onClick={handleback}>
      <IoMdArrowRoundBack size={15} />
      </div>
        <div  className='h-10 w-10 overflow-hidden cursor-pointer'>
           <img src={current_chat.image} className='h-full w-full  rounded-full' onClick={()=>dispatch(authActions.setImageShow(current_chat.image))}></img>
        </div>
        <div>
          <h1 className='font-semibold'>{current_chat.name}</h1>
          <p className='font-extralight text-xs text-blue-btn'>{onlineUsers?.includes(current_chat.id)?"online":"offline"}</p>
        </div>
        <div className='flex gap-4 justify-end flex-grow'>
          {/* <CiVideoOn size={22} className='cursor-pointer text-blue-btn' onClick={handleVideoCall}/> */}
          {/* <IoCallOutline size={22} className='cursor-pointer text-blue-btn' onClick={handleVoiceCall}/> */}
        </div>
    </div>
  )
}

export default MessageAreaHeader