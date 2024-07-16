import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '@/utils/firebaseConfig';
import axios from 'axios';
import { BACKEND_URL, CHECK_USER_ROUTE } from '@/utils/apiRoutes';
import { useRouter } from 'next/router';
import Index from '.';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authSelector } from '@/redux/slices/authSlice';
import { io } from 'socket.io-client';




const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user=useSelector(authSelector);

  useEffect(()=>{
    if(user.id && !user.newuser){
      router.push("/")
    }
  },[user])
  const handler = async () => {

    const provider = new GoogleAuthProvider();
    const { user: userx } = await signInWithPopup(firebaseAuth, provider);
    const user = { name: userx.displayName, email: userx.email };

    // const user = { name: userx.displayName,image:userx.photoURL, email: userx.email };
    try {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: user.email
      });
      if (!data.success) {
        dispatch(authActions.addNewUser(user));
        router.push("/auth/register")
      }
      else {
        
      dispatch(authActions.createSuccesssfull(data.user))
        router.push("/")
      }
    } catch (err) {
      console.log("err: " + err);
    }

  }
  return (
    <Index>


      <button className='flex justify-center items-center gap-3 bg-login-bg p-4 rounded-lg' onClick={handler}>
        <FcGoogle />
        <span className='flex'>
          Login with Google
        </span>
      </button>
    </Index>
  )
}

export default Login;
