import React, { useEffect, useState } from 'react'
import Index from '.'
import { useDispatch, useSelector } from 'react-redux'
import { authActions, authSelector } from '@/redux/slices/authSlice'
import { REGISTER_ROUTE } from '@/utils/apiRoutes'
import { useRouter } from 'next/router'
import axios from 'axios'
import toast from 'react-hot-toast'

const Register = () => {
  const user = useSelector(authSelector)
  const [name,setName]=useState('');
  const [bio,setBio]=useState('');
  const [image,setImage]=useState(null);
  const router=useRouter();
  const [url,setUrl]=useState('/defaultUser.png');
  useEffect(()=>{
    if(!user.newuser && !user.email){
      router.push("/auth/login")
    }
    if(!user.newuser && user.email){
      router.push("/")
    }
    setName(user.name);
    // setImage(user.image ? URL.createObjectURL(user.image) : '/defaultUser.png');
    if (!image) {
      fetch('/defaultUser.png')
        .then(response => response.blob())
        .then(blob => {
          const defaultFile = new File([blob], 'defaultUser.png', { type: blob.type });
          setImage(defaultFile);
        });
    }

  },[user,image])

  const dispatch=useDispatch();

  const validate=()=>{
    if(name.length<=3){
      setTimeout(()=>{
        toast.error("name should be >3")
      },200)
      return false
    };
    return true;
  }
  const handleRegister=async()=>{
    if(validate()){
      // const email=user.email;
      // const {data} =await axios.post(REGISTER_ROUTE,{
      //   email,name,image,bio
      // })
      // if(data.success){
      //   dispatch(authActions.createSuccesssfull(data.newuser))
      // }

      const email=user.email;
      let formData=new FormData();
      formData.append("email",email);
      formData.append("image",image);
      formData.append("name",name);
      formData.append("bio",bio);
      const {data} =await axios.post(REGISTER_ROUTE,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      console.log(data);
      if(data.success){
        setTimeout(()=>{
          toast.success("registered successfully!!!")
        },200);
        dispatch(authActions.createSuccesssfull(data.newuser))
      }
      else{
        setTimeout(()=>{
          toast.error("Name and Bio required!!!")
        },200);
      }
    }
  }

  const handlePhoto=(e)=>{
    // let file=e.target.files[0];
    // // const data=document.createElement("img");
    // let reader=new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload=(event)=>{
    //   // data.src=event.target.result;
    //   // data.setAttribute("data-src",event.target.result);
    //   console.log(event.target.result);
    //   setImage(event.target.result);
    // }

    // dispatch(authActions.addNewUser({image:e.target.files[0]}))
    // dispatch(authActions.addNewUser({image:URL.createObjectURL(e.target.files[0])}))
    const photo=e.target.files[0];
    setUrl(URL.createObjectURL(photo))
    setImage(photo);
    // let formData=new FormData();
    // formData.append
    
  }
  return (
    <Index>
      <div className='flex flex-row gap-10  flex-wrap justify-center'>
        <div className='flex flex-col mr-4 gap-5' >
          <div className='flex flex-col gap-2'>
            <label className='ps-2'>Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className='bg-input-bg p-2 w-[300px] rounded-lg'></input>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='ps-2'>Bio</label>
            <input className='bg-input-bg p-2 w-[300px] rounded-lg' value={bio} onChange={(e)=>setBio(e.target.value)}></input>
          </div>
        </div>
        <div className=' overflow-hidden '>
          <input type='file' className='hidden' id='imageFile' onChange={handlePhoto} accept='image/*'></input>
          <label htmlFor='imageFile'>

          <img src={url} className='rounded-full w-40 h-40 border-4 border-input-bg cursor-pointer'></img>
          </label>
        </div>
      </div>
      <div>
        <button className='bg-blue-btn p-3 rounded-lg hover:bg-dark-blue-btn text-xl' onClick={handleRegister}>Register user</button>
      </div>



    </Index>
  )
}

export default Register