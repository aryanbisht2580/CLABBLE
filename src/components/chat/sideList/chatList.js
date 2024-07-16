import React, { useEffect } from 'react'
import SearchBar from '../searchBar'
import { FaPlus } from "react-icons/fa6";
import List from './list';
import ContactList from './contactList';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authSelector } from '@/redux/slices/authSlice';

import { FaLongArrowAltRight } from "react-icons/fa";
const ChatList = () => {
  const show=useSelector(authSelector).showContact;

  const dispatch=useDispatch();
  return (
    <div className='flex flex-col p-5 h-full gap-4'>
      <div className='flex justify-between items-center gap-4'>
        <SearchBar/>
        {show?<div className={`${show?'bg-input-bg rounded-md':''} `}>
          
        <FaLongArrowAltRight   size={30} onClick={()=>{dispatch(authActions.showContact());dispatch(authActions.setSearchContact(''))}} className={`cursor-pointer p-2 text-blue-btn `} />
        </div>:
          <FaPlus size={30} onClick={()=>{
            dispatch(authActions.setSearchContact(''))
            dispatch(authActions.showContact(!show))
          }} className={`cursor-pointer p-2 text-blue-btn `} />}
        
      </div>
      <div className='h-full'>
        {show && <ContactList/> } 
        {!show && <List/>}
      </div>
    </div>
  )
}

export default ChatList