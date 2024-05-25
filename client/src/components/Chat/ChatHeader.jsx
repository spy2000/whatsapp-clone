import React, { useState } from "react";
import Avatar from "../common/Avatar";
import {MdCall} from "react-icons/md"
import {IoVideocam} from "react-icons/io5"
import {BiSearchAlt2} from "react-icons/bi"
import {BsThreeDotsVertical} from "react-icons/bs"
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import ContextMenu from "../common/ContextMenu";

function ChatHeader() {
  const [{currentChatUser,onlineUsers},dispatch] = useStateProvider()

  const handleVoiceCall = () => {
    dispatch({type:reducerCases.SET_VOICE_CALL,
      voiceCall:{
        ...currentChatUser,
        type:"out-going",
        callType:"voice",
        roomId:Date.now()
      }
    })
  }

  const handleVideoCall = () => {
    console.log(currentChatUser)
    dispatch({type:reducerCases.SET_VIDEO_CALL,
      videoCall:{
        ...currentChatUser,
        type:"out-going",
        callType:"video",
        roomId:Date.now()
      }
    })
  }

  const [isContextMenuVisible,setIsContextMenuVisible] = useState(false)
  const [contextMenuCordinates,setContextMenuCordinates] = useState({
    x:0,
    y:0,
  })
  const showContextMenu = (e)=>{
    e.preventDefault()
    setContextMenuCordinates({x:e.pageX -50, y:e.pageY+20 })
    setIsContextMenuVisible(true)
  }  
  const contextMenuOptions = [
    {
      name:"Exit", 
      callback:async ()=>{
        dispatch({type:reducerCases.SET_EXIT_CHAT})
    }}
  ]

  return <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
    <div className="flex justify-center items-center gap-6">
      <Avatar type="sm" image={currentChatUser?.profilePicture} />
      <div className="flex flex-col">
        <span className="text-primary-strong">{currentChatUser?.name}</span>
        <span className="text-secondary text-sm">{onlineUsers.includes(currentChatUser.id) ? "online" : "offline"}</span>
      </div>
    </div>
    <div className=" flex gap-6">
      <MdCall className="text-panel-header-icon cursor-pointer text-lx"  onClick={handleVoiceCall} />
      <IoVideocam className="text-panel-header-icon cursor-pointer text-lx" onClick={handleVideoCall} />
      <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-lx" onClick={()=>dispatch({type:reducerCases.SET_MESSAGE_SEARCH})} />
      <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-lx" onClick={(e)=>showContextMenu(e)} id="context-opener" />
      {isContextMenuVisible && <ContextMenu
      options={contextMenuOptions}
      cordinates={contextMenuCordinates}
      ContextMenu={isContextMenuVisible}
      setContextMenu={setIsContextMenuVisible}
    />}
    </div>
  </div>;
}

export default ChatHeader;
