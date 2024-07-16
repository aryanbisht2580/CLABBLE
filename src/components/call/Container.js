import { authActions, authSelector } from '@/redux/slices/authSlice';
import { GENERATE_TOKEN_ROUTE } from '@/utils/apiRoutes';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdOutlineCallEnd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import dotenv from "dotenv"
dotenv.config();
const Container = ({data}) => {
    const [callAccepted,setCallAccepted]=useState(false);
    const [token,setToken]=useState(undefined);
    const user=useSelector(authSelector)
    const dispatch=useDispatch();
    const [zgVar,setZgVar]=useState(undefined);
    const [localStream,setLocalStream]=useState(undefined);
    const [publishStream,setPublishStream]=useState(undefined);
    useEffect(()=>{
        if(data.type=='out-going'){
            user.socket.on('call-accepted',()=>{
                setCallAccepted(true);
            })
        }   
        else{
            setTimeout(()=>{
                setCallAccepted(true)
            },1000)
        }
    },[data])

    useEffect(()=>{
        try{
            const getToken=async()=>{
                const {data:{token:returnedToken}}=await axios.post(GENERATE_TOKEN_ROUTE,{userId:user.id})
                setToken(returnedToken);
            }
            getToken();
        }
        catch(err){console.log(err);
        }
    },[callAccepted])

    useEffect(()=>{
            const startCall=async()=>{
                import("zego-express-engine-webrtc").then(async({ZegoExpressEngine})=>{
                    const zg=new ZegoExpressEngine(process.env.NEXT_PUBLIC_ZEGO_APP_ID,process.env.NEXT_PUBLIC_ZEGO_SERVER_ID)
                    setZgVar(zg);
                    zg.on("roomStreamUpdate",async(roomId,updateType,streamList,extendedData)=>{
                        if(updateType=="ADD"){
                            const rmVideo=document.getElementById("remote-video");
                            const vd=document.createElement(data.callType=="video"?"video":"audio")
                            vd.id=streamList[0].streamID;
                            vd.autoplay=true;
                            vd.playsInline=true;
                            vd.muted=false;
                            if(rmVideo){
                                rmVideo.appendChild(vd)
                            }zg.startPlayingStream(streamList[0].streamID,{
                                audio:true,
                                video:true
                            }).then((stream)=>(
                                vd.srcObject=stream
                            ))
                        }else if(updateType=="DELETE" && zg && localStream  && streamList[0].streamID){
                            zg.destroyStream(localStream);
                            zg.stopPublishingStream(streamList[0].streamID);
                            zg.logoutRoom(data.roomId.toString());
                            dispatch(authActions.endCall())
                            
                        }
                    })
                    
                    await zg.loginRoom(data.roomId.toString(),token,{userID:user.id.toString(),userName:user.name},{userUpdate:true})
                    const localSt=await zg.createStream({
                        camera:{
                            audio:true,
                            video:data.callType==="video"?true:false
                        }
                    })
                    const localVideo=document.getElementById("local-audio");
                    const videoElement=document.createElement(data.callType=="video"?"video":"audio")
                    videoElement.id="video-local-zego";
                    videoElement.className="h-28 w-32"
                    videoElement.autoplay=true;
                    videoElement.muted=false;
                    videoElement.playsInline=true;
                    localVideo.appendChild(videoElement)
                    const td=document.getElementById("video-local-zego");
                    td.srcObject=localSt;
                    const streamId="1234"+Date.now();
                    setPublishStream(streamId);
                    setLocalStream(localSt);
                    zg.startPublishingStream(streamId,localSt)

                })
            }
            if(token){
                startCall()
            }
    },[token])

    const endCall=()=>{

        if(zgVar && localStream && publishStream){
            zgVar.destroyStream(localStream);
            zgVar.stopPublishingStream(publishStream);
            zgVar.logoutRoom(data.roomId.toString());
            localStream.getTracks().forEach(track => track.stop());
            zgVar.destroy();
        }
        
        data.callType=="voice" && user.socket.emit("reject-voice-call",{from:{id:data.id}}) 
        data.type=='in-coming' && user.socket.emit("reject-voice-call",data) && user.socket.emit("reject-video-call",data)

        data.callType=="video" && user.socket.emit("reject-voice-call",{from:{id:data.id}}) 
        dispatch(authActions.setEndCall());
    }
  return (
    <div className='border-1 w-full flex flex-col h-[100vh] bg-black-bg overflow-hidden items-center justify-center text-white'>
        <div className='flex flex-col gap-3 items-center'>
            <span>{user.name}</span>
            <span>
                {callAccepted && user.callType !=='video' ?"On going...":"Calling..."}
            </span>
        </div>
        {(!callAccepted || user.callType==="voice") && <div>
            <img src={user.image} height={200} width={200} className='rounded-full' ></img>
            </div>}
        
        <div className='my-5 relative' id="remote-video">
            <div className='absolute bottom-5 right-5' id="local-audio">

            </div>
        </div>
        <div className='h-11 w-11 bg-red-600 rounded-full flex justify-center items-center' onClick={endCall}>
        <MdOutlineCallEnd onClick={endCall}/>
        </div>
    </div>
  )
}

export default Container