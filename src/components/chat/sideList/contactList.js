import { GET_ALL_USERS_ROUTE } from '@/utils/apiRoutes';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ChatList from './chatList';
import ChatItems from './chatItems';
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/slices/authSlice';
import SpinnerCustom from '@/components/spinner';
const ContactList = () => {
  const [allContacts,setAllContacts]=useState({});
  const {searchContact}=useSelector(authSelector);
  const [searchedContacts,setSearchedContacts]=useState([]);
  const user=useSelector(authSelector)
  useEffect(()=>{
    const getContacts=async()=>{
        
      try{
        const {data}=await axios.get(GET_ALL_USERS_ROUTE);
        setAllContacts(data.users);
      }catch(err){
        console.log(err);
      }
    }
    getContacts();
  },[])

  useEffect(()=>{
    if(!searchContact){
      setSearchedContacts('');
      let filteredData={}
      Object.keys(allContacts).forEach((key)=>{
        
        filteredData[key]=allContacts[key].filter((e)=>(e.id!==user.id))
      })
      setSearchedContacts(filteredData);
    }
    else{
      let filteredData={}
      Object.keys(allContacts).forEach((key)=>{
        
        filteredData[key]=allContacts[key].filter((e)=>((e.email!==user.email)  && (e.name.toLowerCase().includes(searchContact) || e.email.includes(searchContact))))
      })
      setSearchedContacts(filteredData);
    }
  },[searchContact,allContacts])
  return (
    (!searchContact && !allContacts)? <SpinnerCustom/>:
    <div className='h-full overflow-auto custom-scroll'>
      {Object.entries(searchedContacts).map(([key,value])=>{
        return (
        value.length>0?<div className='mb-4'>
          <h1 className='text-blue-btn'>{key}</h1>
          {value.map((v)=>{
            return <ChatItems contact={v} isContact={false}/>
          })}</div>:'')
      })}
    </div>
  )
}

export default ContactList