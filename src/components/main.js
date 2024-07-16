import React, { useEffect, useRef, useState } from 'react'
import ChatList from './chat/sideList/chatList'
import { useDispatch, useSelector } from 'react-redux'
import { authActions, authSelector } from '@/redux/slices/authSlice'
import Image from 'next/image'
import { LuLogOut } from "react-icons/lu";
import { useRouter } from 'next/router'
import Noselect from './chat/messageArea/noSelect'
import MessageArea from './chat/messageArea/messageArea'
import ContactList from './chat/sideList/contactList'
import { io } from 'socket.io-client'
import { BACKEND_URL, GET_ONLINE_USERS, MARK_READ_ROUTE } from '@/utils/apiRoutes'
import VoiceCall from './call/voiceCall'
import VideoCall from './call/videoCall'
import SpinnerCustom from './spinner'
import IncomingVideo from './call/incomingVideo'
import IncomingVoice from './call/incomingVoice'
import axios from 'axios'
const Main = () => {
    const user=useSelector(authSelector);
    const router=useRouter();
    const dispatch=useDispatch();
    const socket=useRef(null);
    const [socketcall,setSocketCall]=useState(false)
    const {videoCall,voiceCall,incomingVoiceCall,incomingVideoCall}=useSelector(authSelector)
    const handleLogOut=()=>{
        user.socket.emit("logOut",user.id)
        dispatch(authActions.logout());
    }
    useEffect(()=>{
      if(user.newuser || !user.id){
        router.push("/auth/login")
      }
      if(!user.socket && user.id){
        
        socket.current=io(BACKEND_URL)
        socket.current.emit('add-user',user.id)
        dispatch(authActions.setSocket(socket.current))
        const callx=async()=>{
            const {data}=await axios.get(GET_ONLINE_USERS);
            dispatch(authActions.setOnlineUsers(data.onlineUsers))
        }
        callx();

      }

    },[user])
    useEffect(()=>{
        if(user.socket && user.id && !socketcall){
            window.addEventListener('beforeunload', function () {
                user.socket.emit("logOut",user.id);
            });
            user.socket.on("receive-msg",(data)=>{
                dispatch(authActions.addNewMessage({...data}));
                
                // if(user.current_chat?.id==data.senderId){
                    // const call=async()=>{
                    //     await axios.post(MARK_READ_ROUTE,{messageId:data.id})
                    //     user.socket.emit("message-read",data)
                    // }
                    // call();
                   
                // }
            })
            user.socket.on("incoming-voice-call",(data)=>{dispatch(authActions.setIncomingVoiceCall({...data}))})
            user.socket.on("incoming-video-call",(data)=>{dispatch(authActions.setIncomingVideoCall({...data}))})
            user.socket.on("reject-voice-call",()=>{dispatch(authActions.setEndCall())})
            user.socket.on("reject-video-call",()=>{dispatch(authActions.setEndCall())})
            user.socket.on("accept-incoming-call",()=>{dispatch(authActions.setEndCall())})

            user.socket.on("remove-user",(data)=>{dispatch(authActions.setOnlineUsers(data.onlineUsers))})
            user.socket.on("addIt",(data)=>{
                dispatch(authActions.setOnlineUsers(data.onlineUsers))
                // const m=user.messages.forEach((x)=>{
                //     if(data.onlineUsers.includes(x.to)){
                //         x.messageStatus=="read";
                //     }
                // })
                // dispatch(authActions.setMessagesComplete());

            })

            // user.socket.on("message-has-been-read",(data)=>{
            //     // if(user.current_chat?.id==data.receiverId){
            //         const userInfo=
            //         dispatch(authActions.setcurrent_chat(data.receiverId));
            //     // }
            // })
            setSocketCall(true)


        }

    },[user.socket,socketcall])
    return (
        user.id?

        <>
        {incomingVoiceCall && <IncomingVoice/>}
        {incomingVideoCall && <IncomingVideo/>}
       {
        voiceCall && 
        <div className='h-screen w-screen max-h-full overflow-hidden'>
            <VoiceCall/>
        </div>
       }

        {
        videoCall && 
        <div className='h-screen w-screen max-h-full overflow-hidden'>
            <VideoCall/>
        </div>
       }

       {!voiceCall && ! videoCall &&
        <div className='bg-black-bg h-full w-full p-1 text-white font-serif max-h-full overflow-auto flex flex-col' >
            <div className='flex justify-between p-1'>
                <div className='flex gap-3 items-center'>
                    <img className="w-10" src="/clabble_logo.png"></img>
                    <h2 className=' tracking-wider'>CLABBLE</h2>
                </div>
                <div className='flex gap-3 items-center'>
                <h2 className=' tracking-wider'>{user.name}</h2>
                    <div className='h-8 w-8'>
                        <img src={user.image}  className='h-full w-auto rounded-full cursor-pointer' onClick={()=>dispatch(authActions.setImageShow(user.image))}></img>
                    </div>
                    
                    <LuLogOut size={25} className='cursor-pointer' onClick={handleLogOut}/>
                </div>
            </div>

            <div className='flex justify-between py-2 border-t-2 border-input-bg   overflow-hidden  h-full w-full flex-wrap'>
                <div className={`xl:w-1/5  lg:w-2/5 md:w-1/3 sm:w-full ${user.current_chat?"sm:hidden":"block"}  md:block overflow-hidden pb-14 h-full`}>
                    <ChatList />
                    {/* <ContactList/> */}
                </div>
                <div className='xl:w-4/5 lg:w-3/5  md:w-2/3 sm:w-full border-input-bg border-l-2 h-full'>
                {user.current_chat?<MessageArea/>:<Noselect />}
                    
                </div>
            </div>
        </div>
        }
        </>
            :
        <div className='h-screen w-screen'>
            
        <SpinnerCustom/>
        </div>

    )
}

export default Main