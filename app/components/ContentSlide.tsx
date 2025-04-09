import useSWR from "swr"
import { multiFetcher } from "@/utils/fetcher"
import Marquee from "react-fast-marquee"
import Confetti from "./Confetti"
import { useEffect, useRef } from "react"

interface Message {
    id: number
    author: string
    topic: string
}

export default function ContentSlide({slide}: {slide: number}){
    const { data, error, isLoading } = useSWR([`/api/messages?slide=${slide}&special=true`, `/api/slides?slide=${slide}&content=true`], multiFetcher,
        {
          refreshInterval: 250,
            
        }
      )
    let emojiList: Message[] = []
    let slideContent
    const prevMessageId = useRef<string>("")

    if (data){
        emojiList = data[0]
        slideContent = data[1]["content"]
    }

    useEffect(() => {
        // Initialize from localStorage on first load
        const storedId = localStorage.getItem('last-message-id')
        if (storedId) {
            prevMessageId.current = storedId
        }
    }, [emojiList])

    useEffect(() => {
        if (!emojiList.length) return

        const currentId = emojiList[0]?.id.toString()
        if (currentId && prevMessageId.current && currentId !== prevMessageId.current) {
            console.log(`New message detected! Previous ID: ${prevMessageId.current}, Current ID: ${currentId}`)
            prevMessageId.current = currentId
            localStorage.setItem('last-message-id', currentId)
        } else if (currentId && !prevMessageId.current) {
            // Just store the ID without alerting on first load
            prevMessageId.current = currentId
            localStorage.setItem('last-message-id', currentId)
        }
    }, [emojiList])
  
    const shouldShowConfetti = emojiList.length > 0 && 
                              prevMessageId.current && 
                              emojiList[0]?.id.toString() !== prevMessageId.current
  
    return (
        <>
        <div className = "flex flex-col relative h-full">
            <div className = "p-8" dangerouslySetInnerHTML={{ __html: slideContent}}/>            
            <div className = "absolute bg-stone-800 bottom-3 w-full">
                <Marquee className = "w-full border-t-2 pt-2">
                        {emojiList.length ? 
                            emojiList.map((message, index) => message.topic && <span className = "text-2xl mx-8" key = {index}>{message.author} says {message.topic}</span>)
                            : <span className = "text-2xl mx-8">text the number on the screen something</span>
                        }
                </Marquee>
            </div>
            {shouldShowConfetti && emojiList[0]?.topic && <Confetti emoji={emojiList[0].topic} />}
        </div>
        </>
    )
}