'use client'
import Messages from "./components/Messages";
import Assets from "@/app/components/Assets";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Slide } from "@prisma/client";
import Navigate from "@/app/components/Navigate";
import SignIn from "@/app/components/SignIn";
import { AuthStatus } from "@/app/components/AuthStatus";
import ContentSlide from "@/app/components/ContentSlide";
import { useSession } from "next-auth/react";
import { NewNextAuthUser } from "@/utils/types";
export default function Home() {
  const [ currentSlide, setCurrentSlide ] = useState(0)
  const session = useSession();
  
  async function getInitSlideAuthed(){
    const r = await fetch("/api/active").then(r => r.json())
    setCurrentSlide(r)
    console.log("the active slide was", r, currentSlide)
  }

  useEffect(() => {
    if (session && session.status === "authenticated"){
      console.log((session.data?.user as NewNextAuthUser).username)
      if ((session.data?.user as NewNextAuthUser).username === process.env.NEXT_PUBLIC_AUTHORISED_USER){
        getInitSlideAuthed()
      }
    } else {
      setCurrentSlide(1)
  }}, [session])


  const { data } = useSWR(`/api/active?slide=${currentSlide}`, fetcher,
    {
      refreshInterval: 250,
      onSuccess: (data) => {
        setCurrentSlide((data as {id: number})["id"])
      }
    }
  )

  let slide 
  
  if (data){
    slide = (data as Slide)
  }

  return (
        <div className = "h-[100vh] w-[100vw] bg-primary grid grid-rows-7 grid-cols-6 p-6 gap-6">
          <img className = "fixed z-30 top-0 left-2 w-[8vw]" alt="Hack Club" src = "https://assets.hackclub.com/flag-orpheus-top.svg"/>
          <div className = "relative border bg-white px-8 border-black rounded-md col-span-full row-span-2 gap-2 justify-evenly overflow-auto">
            <AuthStatus className = "fixed top-0 left-1/2 -translate-x-1/2 "/>
            <div className = "md:border-t md:border-l border-l max-md:border-b border-black p-1 max-md:rounded-bl-2xl md:rounded-tl-2xl h-max absolute right-0 max-md:top-0 md:bottom-0">
              <Navigate className = "text-sm flex flex-row gap-2 align-middle items-center" currentSlide = {currentSlide} setCurrentSlide={setCurrentSlide}/>
            </div>
            <div className = "flex flex-col justify-around md:h-full max-md:text-center md:float-center my-auto md:float-left w-full md:w-1/2 lg:w-4/7">
              <h2 className = "text-3xl md:text-4xl lg:text-5xl">{slide ? slide.prompt : "Loading..."}</h2>
            </div>
            <div className = "items-center justify-center md:h-full m-auto float-center *:self-center md:float-right flex flex-col gap-1">
              <SignIn/>
              <h1 className = "text-3xl md:text-4xl lg:text-6xl self-center">{process.env.NEXT_PUBLIC_PHONE_NUMBER}</h1>
              <h2 className = "text-xl md:text-2xl">Text your answer!</h2>
            </div>
          </div>
          <div className = "col-span-full bg-white row-span-5 border border-black rounded-md overflow-auto">
          { slide && slide.type === "wordcloud" ? 
            <>
            <Messages slide = {currentSlide} /> 
            </>
          : slide && (slide.type === "ai")
            ? <><Assets slide = {currentSlide}/> </>
            : slide && (slide.type === "slide")
              ? <ContentSlide slide  = {currentSlide}/>
              : <div className = "p-8">Loading...</div> 
          } 
          </div>
    
        </div>
  );
}