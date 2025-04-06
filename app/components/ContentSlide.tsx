import useSWR from "swr"
import { multiFetcher } from "@/utils/fetcher"
import Marquee from "react-fast-marquee"

export default function ContentSlide({slide}: {slide: number}){
    const { data, error, isLoading } = useSWR([`/api/messages?slide=${slide}&special=true`, `/api/slides?slide=${slide}&content=true`], multiFetcher,
        {
          refreshInterval: 250,
            
        }
      )
    let emojiList = [""]
    let slideContent
    if (data){
        emojiList = data[0]
        slideContent = data[1]["content"]
    }
  
    return (
        <>
        <div className = "flex flex-col relative h-full">
            <div className = "p-8 grow h-full" dangerouslySetInnerHTML={{ __html: slideContent}}/>            
            
            <div className = "absolute bottom-3 w-full">
                <Marquee className = "w-full">
                        {emojiList.map((message: any, index: number) => <span className = "text-2xl mx-8" key = {index}>{message.author} says {message.topic}</span>)}
                </Marquee>
            </div>
        </div>
            </>
    )
}