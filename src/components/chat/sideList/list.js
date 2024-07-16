import { authActions, authSelector } from '@/redux/slices/authSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatItems from './chatItems';
import axios from 'axios';
import { GET_CHATTED_CONTACTS_ROUTE } from '@/utils/apiRoutes';
import SpinnerCustom from '@/components/spinner';

const List = () => {
  const user=useSelector(authSelector);
  const dispatch=useDispatch();
  const [filterChattedUsers,setFilterChattedUsers]=useState();
  useEffect(()=>{
    if(user.id){
      async function call(){
        try{
          
          const {data:{chattedUsers,onlineUsers}}=await axios.post(GET_CHATTED_CONTACTS_ROUTE,{
            userId:user.id
          });
          dispatch(authActions.setChattedUsers(chattedUsers));
          // dispatch(authActions.setOnlineUsers(onlineUsers));
          if(user.searchContact){
            setFilterChattedUsers(chattedUsers?.filter((e)=>(e.name.toLowerCase().includes(user.searchContact?.toLowerCase()) || e.email.includes(user.searchContact))))
          }
          else{
            setFilterChattedUsers(chattedUsers);
          }
          
        }catch(err){
           console.log(err);
        }
      }
      call();
    }
  },[user.messages,user.searchContact])
  return (
    
    <div className='overflow-auto max-h-full custom-scroll'>
      {!filterChattedUsers?<SpinnerCustom/>:
        filterChattedUsers?.map((e)=><ChatItems contact={e} isChatted={true}/>)
      }
    </div>
  )
}

export default List