import React, { useEffect, useState } from 'react'
import { GrAttachment,GrEmoji } from "react-icons/gr";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authSelector } from '@/redux/slices/authSlice';
import axios from 'axios';
import { ADD_MESSAGE_ROUTE, POST_IMAGE_ROUTE } from '@/utils/apiRoutes';
import EmojiPicker from 'emoji-picker-react';
import { IoMdPhotos } from "react-icons/io";
const MessageAreaFooter = () => {
  const [message,setMessage]=useState("");
  const user=useSelector(authSelector);
  const dispatch=useDispatch();
  const [showEmoji,setShowEmoji]=useState(false)
  useEffect(()=>{
    const checkClick=(e)=>{
      if(e.target.id==="emojiIcon"){
        setShowEmoji((prev)=>!prev);
      }
      else if(e.target.id!=='emoji-id' ){
        setShowEmoji(false);
      }
    }
    document.addEventListener("click",checkClick)
    return ()=>{
      document.removeEventListener("click",checkClick);
    }
  },[])
  const fileHandler=async(e)=>{
    e.preventDefault();
    const image=e.target.files[0];
    const formData=new FormData();
    formData.append("image",image);
    formData.append("from",user.id);
    formData.append("to",user.current_chat.id);
    const {data}=await axios.post(POST_IMAGE_ROUTE,formData,{
      headers:{
         "Content-Type":"multipart/form-data"
      }
    })
    
    if(data.success){
      user.socket.emit("send-msg",{ 
        id:data.message.id,
        to:user.current_chat.id,
        from:user.id,
        message:data.message.message,
        type:"image"
      })
      dispatch(authActions.addNewMessage({      
        id:data.message.id,
        receiverId:user.current_chat.id,
        senderId:user.id,
        message:data.message.message,
        type:"image",
        messageStatus:user.onlineUsers.includes(user.current_chat.id)?"read":"sent"
      }))
    }
  }
  const handleSend=async()=>{
    

    const {data}=await axios.post(ADD_MESSAGE_ROUTE,{
      to:user.current_chat.id,
      from:user.id,
      message
    })
    user.socket.emit("send-msg",{
      id:data.newMessage.id,
      to:user.current_chat.id,
      from:user.id,
      message,
      type:"text",
      messageStatus:user.onlineUsers.includes(user.current_chat.id)?"delivered":"sent"
    })
    dispatch(authActions.addNewMessage({    
      id:data.newMessage.id,  
      receiverId:user.current_chat.id,
      senderId:user.id,
      message,
      type:"text",
      messageStatus:user.onlineUsers.includes(user.current_chat.id)?"delivered":"sent"
    }))
      
    setMessage("");
  }
  const handleKeyDown=(k)=>{
    if(k.key=='Enter'){
      handleSend();
    }
  }
  return (
    <div className='bg-input-bg flex rounded-lg items-center gap-4 py-2 px-4 relative'>
        <div className='flex gap-2'> 
            
            <GrEmoji  size={20}  id="emojiIcon" className='cursor-pointer text-blue-btn'/>
              {showEmoji && (<div id="emoji-id" className='absolute bottom-16'><EmojiPicker theme='dark' onEmojiClick={(e)=>setMessage(message+e.emoji)}/></div>)}


              
          <label htmlFor='fileInput'>
          <IoMdPhotos  size={20} className='cursor-pointer text-blue-btn'/>
          </label>
          <input id="fileInput" className='hidden' type='file' accept='image/*' onChange={fileHandler}></input>
            
        </div>
        <div className='w-full'>
            <input className='w-full rounded-sm bg-light-input-bg p-2 outline-none' placeholder='Type here...' value={message} onKeyDown={handleKeyDown} onChange={((e)=>setMessage(e.target.value))}></input>
        </div>
        <div>
        <BsSend className='cursor-pointer text-blue-btn' size={20} id="sendId" onClick={handleSend}/>
        </div>
    </div>
  )
}

export default MessageAreaFooter