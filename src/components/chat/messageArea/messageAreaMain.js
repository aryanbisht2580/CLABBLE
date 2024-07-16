import { authActions, authSelector } from '@/redux/slices/authSlice';
import { GET_MESSAGES_ROUTE } from '@/utils/apiRoutes';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SenderMessageLayout from './senderMessageLayout';
import OtherMessageLayout from './otherMessageLayout';
import SpinnerCustom from '@/components/spinner';

const MessageAreaMain = () => {
  const [messages, setMessages] = useState();
  const user = useSelector(authSelector);
  const scrollDiv=useRef(null);
  const dispatch=useDispatch()
  useEffect(() => {
    const call = async () => {
      try {
        const {data} = await axios.post(GET_MESSAGES_ROUTE, {
          from: user.id,
          to: user.current_chat.id
        });
        dispatch(authActions.setMessages(data.messages));
        
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    call()
  }, [user.current_chat])
  useEffect(() => {
    
    if(user.messages) setMessages(user.messages);
    // scrollDiv.current?.scrollIntoView({behavior:"smooth"})
    
  }, [user.messages]);
  useEffect(()=>{
    scrollToBottom();
  },[messages])

  const scrollToBottom = () => {
    scrollDiv.current?.scrollTo({
      top: scrollDiv.current.scrollHeight,
      behavior: "smooth"
    });
  };
  return (
    
    <div className='flex-grow p-5 h-full max-h-full overflow-hidden w-full'>
      {
        (messages)?
        <div className=' h-full overflow-auto custom-scroll flex flex-col w-full' ref={scrollDiv}>
        {messages.map((m)=>{
          // return {JSON.stringify(m)}
          return <>
           {(m.senderId==user.id && m.receiverId==user.current_chat.id) && <SenderMessageLayout message={m}/>}
           {(m.senderId==user.current_chat.id && m.receiverId==user.id) && <OtherMessageLayout message={m}/>}
          </>
           
          
          // return (m.senderId==user.id?<SenderMessageLayout message={m}/>:<OtherMessageLayout message={m}/>)
        })}
      </div>:
      <SpinnerCustom/>
      }
      
    </div>

  )
}

export default MessageAreaMain