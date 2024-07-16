import React from 'react'
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '@/utils/firebaseConfig';
import axios from 'axios';
import { CHECK_USER_ROUTE } from '@/utils/apiRoutes';
import { useRouter } from 'next/router';




const Index = ({children}) => {
  
  return (
    <div className='bg-black-bg w-screen h-screen flex justify-center items-center flex-col gap-16 text-white'>
      <div className='flex flex-col gap-6 items-center'>
        <Image src="/clabble_logo.png" height="150" width="150" alt='' />
        <h2 className='text-4xl font-bold tracking-[0.25rem] font-serif'>
          CLABBLE
        </h2>
      </div>
      {children}
    </div>
  )
}

export default Index;
