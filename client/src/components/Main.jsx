import React, { useEffect, useState } from "react";
import Empty from "./Empty";
import ChatList from "./Chatlist/ChatList"
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE,GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";

function Main() {
  const router = useRouter()
  const [{userInfo,currentChatUser},dispatch] = useStateProvider()
  const [redirectLogin,setRedirectLogin] = useState(false)

  useEffect(()=>{
    if(redirectLogin) router.push("/login")
  },[redirectLogin])

  onAuthStateChanged(firebaseAuth, async (currentUser)=>{
    if(!currentUser) setRedirectLogin(true)
    if(!userInfo && currentUser?.email){
      try {
        const {data} = await axios.post(CHECK_USER_ROUTE,{email:currentUser.email})
      console.log("data from main file==>",data)
      if(!data.status){
        return router.push("/login")
      }

      if(data?.data){
        const {id,name,email,profilePicture:profileImage,status} = data.data
        dispatch({type:reducerCases.SET_USER_INFO,userInfo:{
          id,name,email,profileImage,status
        }})
      }
      } catch (error) {
        console.log(error)
      }      
    }
  })


  useEffect(()=>{
    const getMessages = async ()=> {
      try {
        console.log()
        const {data} = await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`)
      console.log(data)
      } catch (error) {
        console.log(error)
      }
      
    }
    if(currentChatUser){
      getMessages()
    }
  },[currentChatUser])


  return <div  className="grid  grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
    <ChatList/>
    {currentChatUser ?  <Chat/> : <Empty/>}
    {/* <Empty/> */}
   
  </div>;
}

export default Main;
