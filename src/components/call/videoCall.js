import { authSelector } from '@/redux/slices/authSlice'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
const Container=dynamic(()=>import("./Container"),{ssr:false})
const VideoCall = () => {
    const {videoCall,socket}=useSelector(authSelector)
    const user=useSelector(authSelector)
    useEffect(()=>{
      if(videoCall.type==="out-going"){
        socket.emit("outgoing-video-call",{
          to:videoCall.id,
          from:{
            id:user.id,
            image:user.image,
            name:user.name
          },
          callType:videoCall.callType,
          roomId:videoCall.roomId
        })
      }
    },[videoCall])
  return (
    <Container data={videoCall}/>
  )
}

export default VideoCall