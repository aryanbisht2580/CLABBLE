// import Image from "next/image";
// import { Inter } from "next/font/google";

import Main from "@/components/main";
import { authActions, authSelector } from "@/redux/slices/authSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user=useSelector(authSelector);
  const router=useRouter();
  const dispatch=useDispatch();
  const [imgshow,setImgShow]=useState(null)


  
  useEffect(()=>{
    if(user.newuser || !user.id){
      if(localStorage.getItem("user")){
        dispatch(authActions.createSuccesssfull(JSON.parse(localStorage.getItem("user"))));
        
      }
      else{
        
      router.push("/auth/login")

      }
    }
  },[user])


  useEffect(()=>{
    if(user.newuser || !user.id){
      router.push("/auth/login")
    }
      setImgShow(user.showImage);

  },[user.showImage])


  return (
    <div className="h-screen w-screen relative">
      {imgshow && <div className="absolute sm:w-[70%] md:w-[30%] max-h-[100%] overflow-auto   bg-input-bg left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1" >
            <div className="p-2" >
              <ImCross  className="text-white cursor-pointer" onClick={()=>dispatch(authActions.setImageShow(null))}/>
            </div>
            <img src={imgshow} className=" w-full h-auto"></img>
        </div>}
      <Main/>
    </div>
  );
}
