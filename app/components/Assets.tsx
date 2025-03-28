import useSWR from "swr"
import { multiFetcher } from "@/utils/fetcher"
export default function Assets({slide}: {slide: number}){
    const { data, error, isLoading } = useSWR([`/api/messages?slide=${slide}`], multiFetcher,
      {
        refreshInterval: 250
      }
    )

    let componentList = []
    if (data){
      componentList = data[0]
    }

    return (
        <div className = "flex flex-row flex-wrap z-20">
            { componentList.map((component: any, index: number) => 
                <div key = {index} dangerouslySetInnerHTML={{ __html: component.topic}}/>
            )}
        </div>
    )
}