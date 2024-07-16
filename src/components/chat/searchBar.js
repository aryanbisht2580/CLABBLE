import { authActions, authSelector } from '@/redux/slices/authSlice';
import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(authSelector);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(user.searchContact);
    
  }, [user.searchContact]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    dispatch(authActions.setSearchContact(e.target.value));
  };

  return (
    <div className='flex bg-input-bg justify-start items-center p-2 rounded-lg gap-2 w-full'>
      <div>
        <CiSearch />
      </div>
      <div className='w-full'>
        <input 
          className='bg-transparent p-1 outline-none w-full' 
          placeholder='Search...'
          value={inputValue} 
          onChange={handleChange} 
        />
      </div>
    </div>
  );
}

export default SearchBar;
