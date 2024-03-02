import Image from "next/image";
import React, { useState } from "react";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";

function onboarding() {
  const [{userInfo}] = useStateProvider()
 const [name,setName]= useState(userInfo?.name || "")
 const [about,setAbout]= useState("")
 const [image,setImage]= useState("/default_avatar.png")
  console.log("userInfo===>",userInfo)
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
      </div>
      <div className="">
        <Avatar type={"xl"} image={image} setImage={setImage} />
      </div>
    </div>
  </div>;
}

export default onboarding;
