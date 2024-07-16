import { authSelector } from '@/redux/slices/authSlice'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
const Container=dynamic(()=>import("./Container"),{ssr:false})
const voiceCall = () => {
    const {voiceCall,socket}=useSelector(authSelector)
    const user=useSelector(authSelector);
    useEffect(()=>{
      if(voiceCall.type==="out-going"){
        socket.emit("outgoing-voice-call",{
          to:voiceCall.id,
          from:{
            id:user.id,
            image:user.image,
            name:user.name
          },
          callType:voiceCall.callType,
          roomId:voiceCall.roomId
        })
      }
    },[voiceCall])
  return (
    <Container data={voiceCall}/>
  )
}

export default voiceCall