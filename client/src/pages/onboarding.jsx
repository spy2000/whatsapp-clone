import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";
import {ONBAORD_USER_ROUTE} from "../utils/ApiRoutes"
import axios from "axios";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";

function onboarding() {
  const router = useRouter()
  const [{userInfo,newUser},dispatch] = useStateProvider()
 const [name,setName]= useState(userInfo?.name || "")
 const [about,setAbout]= useState("")
 const [image,setImage]= useState("/default_avatar.png")

 useEffect(()=>{
  if(!newUser && !userInfo?.email) router.push("/login")
  else if(!newUser && userInfo?.email) router.push("/")
 },[newUser,userInfo,router])
  // console.log("userInfo===>",userInfo)
  const onBoardingUserHandler = async () => {
    if(validateDetails()){
      const email = userInfo.email
      try {
        const {data} = await axios.post(ONBAORD_USER_ROUTE,{email,name,about,image})
        console.log("data from onboading==>",data)
        if(data.status){
          dispatch({type:reducerCases.SET_NEW_USER,newUser:false})
          dispatch({type:reducerCases.SET_USER_INFO,userInfo:{id:data.user.id,name,email,profileImage:image,status:about}})
          router.push("/")
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const validateDetails = () => {
    if(name.length < 3){
      return false
    }
    return true
  }

  return <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center">
    <div className="flex justify-center items-center gap-2">
      <Image src={"/whatsapp.gif"} alt="whatsapp" width={300} height={300}/>
      <span className="text-7xl">Whatsapp</span>
    </div>
    <h2 className="text-2xl">Create Your Profile</h2>
    <div className="flex gap-6 mt-6">
      <div className="flex flex-col justify-center items-center mt-5 gap-6">
      <Input name="Dispaly Name" state={name} setState={setName} label />
      <Input name="About" state={about} setState={setAbout} label />
      <div className="flex items-center justify-center">
        <button className="flex justify-center items-center gap-7 bg-search-input-container-background p-5 rounded-lg" onClick={onBoardingUserHandler}>Create Profile</button>
      </div>
      </div>
      <div>
        <Avatar type={"xl"} image={image} setImage={setImage} />
      </div>
    </div>
  </div>;
}

export default onboarding;
