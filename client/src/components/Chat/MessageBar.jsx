import React, { useEffect, useRef, useState } from "react";
import {BsEmojiSmile} from "react-icons/bs"
import {ImAttachment} from "react-icons/im"
import {MdSend} from "react-icons/md"
import {FaMicrophone} from "react-icons/fa"
import { useStateProvider } from "@/context/StateContext";
import {ADD_IMAGE_MESSAGE_ROUTE, ADD_MESSAGE_ROUTE} from "../../utils/ApiRoutes"
import axios from "axios";
import { reducerCases } from "@/context/constants";
import EmojiPicker from "emoji-picker-react";
import PhotoPicker from "../common/PhotoPicker";
import dynamic from "next/dynamic";
// import CaptureAudio from "../common/CaptureAudio";
const CaptureAudio  =  dynamic(()=>import("../common/CaptureAudio"),{ssr:false})

function MessageBar() {

  const [{userInfo,currentChatUser,socket},dispatch] = useStateProvider()
  const [message,setMessage] = useState("")
  const [showEmojiPicker,setShowEmojiPicker] = useState(false)
  const emojiPickerRef = useRef()
  const [grabPhoto,setGrapPhoto] = useState(false)
  const [showAudioRecorder,setShowAudioRecorder] =useState(false)

  const photoPickerChange = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image",file)
    try {
      const response = await axios.post(ADD_IMAGE_MESSAGE_ROUTE,formData,{
        headers:{
          "Content-Type":"multipart/form-data",
        },
        params:{
          from:userInfo.id,
          to:currentChatUser.id
        }
      })
      if(response.status===201){
        socket.current.emit("send-msg",{
          to:currentChatUser?.id,
          from:userInfo?.id,
          message:response.data.message
        })
        dispatch({type:reducerCases.ADD_MESSAGE,newMessage:{...response.data.message},fromSelf:true})
      }
    } catch (error) {
      console.log(error)
    }    
  }

  useEffect(()=>{
    if(grabPhoto){
      const data = document.getElementById("photo-picker")
      data.click()
      document.body.onfocus = (e)=>{
        setTimeout(()=>setGrapPhoto(false),1000)
      }
    }
  },[grabPhoto])

  useEffect(()=>{
    const handleOutsideClick = event => {
      if(event.target.id !== "emoji-open"){
        if(emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)){
          setShowEmojiPicker(false)
        }
      }
    }
    document.addEventListener("click",handleOutsideClick)

    return () => {
      document.removeEventListener("click",handleOutsideClick)
    }
  },[])

  const handleEmojiModel = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick =(emoji) => {
    setMessage((prevMessage)=>(prevMessage+=emoji.emoji))

  }

  const sendMessage = async () => {
    try {
      const {data} = await axios.post(ADD_MESSAGE_ROUTE,{
        to:currentChatUser?.id,
        from: userInfo?.id,
        message
      })
      // console.log(data)
      // console.log(socket)
      socket.current.emit("send-msg",{
        to:currentChatUser?.id,
        from:userInfo?.id,
        message:data.message
      })
      dispatch({type:reducerCases.ADD_MESSAGE,newMessage:{...data.message},fromSelf:true})
      setMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  return <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
  {!showAudioRecorder ?
    <>
      <div className="flex gap-6">
      <BsEmojiSmile id="emoji-open" onClick={handleEmojiModel} className="text-panel-header-icon cursor-pointer text-xl" title="emoji" />
      {showEmojiPicker && <div ref={emojiPickerRef}  className="absolute bottom-24 left-26 z-40">
        <EmojiPicker  onEmojiClick={handleEmojiClick} theme="dark" />
      </div>}
      <ImAttachment onClick={()=>setGrapPhoto(true)} className="text-panel-header-icon cursor-pointer text-xl" title="Attach File" />
      </div>
      <div className=" w-full rounded-lg h-10 flex items-center">
        <input type="text" placeholder="Type a message" className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full " onChange={(e)=>setMessage(e.target.value)} value={message} />
      </div>
      <div className="flex w-10 justify-center items-center">
        <button>
        {message.length > 0 ? 
        <MdSend className="text-panel-header-icon cursor-pointer text-xl" title="Send Message" onClick={sendMessage} />
        :
        <FaMicrophone className="text-panel-header-icon cursor-pointer text-xl" title="Record" onClick={()=>setShowAudioRecorder(true)} />
        }
        </button>
      </div>
    </>
    : "" }
    {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    {showAudioRecorder && <CaptureAudio hide={setShowAudioRecorder} />}
  </div>;
}

export default MessageBar;
