import useSWR from "swr"
import { multiFetcher } from "@/utils/fetcher"
import { useRef, useLayoutEffect, useState } from "react";

function ExtremelyDangerousElement({render, useJavaScript}: {render: string, useJavaScript: boolean}){
    const elRef = useRef<HTMLDivElement>(null);
    const hasFiredRef = useRef<boolean>(false);
    useLayoutEffect(() => {
      if (!useJavaScript){
        console.log("not usejavascript")
        if (elRef.current) { elRef.current.innerHTML = ''; }
        hasFiredRef.current = true;
        return
      }
      if (!elRef.current) return;
      const range = document.createRange();
      range.selectNode(elRef.current);
      const documentFragment = range.createContextualFragment(render);

      elRef.current.innerHTML = '';
      elRef.current.append(documentFragment);

      hasFiredRef.current = true;
    }, [useJavaScript]);
    return (
      <div className = "" ref={elRef} dangerouslySetInnerHTML={{ __html: render}}/>
    )
}

export default function Assets({slide}: {slide: number}){
    const { data, error, isLoading, mutate } = useSWR([`/api/messages?slide=${slide}`], multiFetcher,
      {
        refreshInterval: 250
      }
    )
    const [useJavaScript, setUseJavaScript] = useState(false)

    let componentList = []
    if (data){
      componentList = data[0]
    }
    const columns = ("columns-" + Math.ceil(componentList.length/3))

      return (
        <>
        <button onClick={() => {setUseJavaScript(!useJavaScript); mutate()}} className = "z-30 absolute right-0 top-0 border-1 p-2 rounded-sm bg-stone-800">JavaScript enabled: {useJavaScript.toString()}</button>
          <div className = {`${columns} relative columns-4 h-[140vh] overflow-auto gap-10 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit`}>
              { 
                  componentList.map((component: any, index: number) => 
                  <ExtremelyDangerousElement useJavaScript={useJavaScript} render={component.topic} key={index}/>) 
              }
          </div>
          </>
      )
}