'use client'
import Messages from "./components/Messages";
import Assets from "@/app/components/Assets";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Slide } from "@prisma/client";

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/active", fetcher,
    {
      refreshInterval: 250,
      onSuccess: (data) => {
        setCurrentSlide((data as any)["id"])
      }
    }
  )
  const [ currentSlide, setCurrentSlide ] = useState(1)

  let slide 

  async function handleClick(){
    await fetch("/api/active", { method: "POST" })
    setCurrentSlide(currentSlide+1)
    console.log('akjdfklsdjlkj')
  }
  
  if (data){
    slide = (data as Slide)
  }

  return (
        <div className = "w-screen h-screen bg-white flex flex-col gap-5  z-10 fixed top-0">
          <div className = "bg-black/20 p-10 w-full flex flex-col gap-5 items-center justify-center">
            <h2 className = "text-4xl">{slide ? slide.prompt : null}</h2>
            <h1 className = "text-8xl">(855) 608-8154</h1>
            <h2 className = "text-4xl">Text this number!</h2>
            <button className = "z-20" onClick={handleClick}>CLICK ME</button>
          </div>
          { slide && slide.wordcloud ? 
            <>
            <Messages slide = {currentSlide} /> 
            </>
          : slide && !slide.wordcloud 
            ? <><Assets slide = {currentSlide}/> </>
            : <div>Loading</div> 
          } 
    
        </div>
  );
}