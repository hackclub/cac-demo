import useSWR from "swr"
import { multiFetcher } from "@/utils/fetcher"
import { useRef, useLayoutEffect, useState } from "react";

function ExtremelyDangerousElement({render}: {render: string}){
  const elRef = useRef<HTMLDivElement>(null);
  const hasFiredRef = useRef<boolean>(false);
  useLayoutEffect(() => {
    if (!elRef.current) return;

    const range = document.createRange();
    range.selectNode(elRef.current);
    const documentFragment = range.createContextualFragment(render);

    elRef.current.innerHTML = '';
    elRef.current.append(documentFragment);

    hasFiredRef.current = true;
  }, []);

  return (
    <>
    <div className = "" ref={elRef} dangerouslySetInnerHTML={{ __html: render}}/>
    </>

  )
}

export default function Assets({slide}: {slide: number}){
    const { data, error, isLoading } = useSWR([`/api/messages?slide=${slide}`], multiFetcher,
      {
        refreshInterval: 250
      }
    )
    const [useJavaScript, setUseJavaScript] = useState(true)

    let componentList = []
    if (data){
      componentList = data[0]
    }
    const columns = ("columns-" + Math.ceil(componentList.length/3))

      return (
        <>
        <button onClick={() => setUseJavaScript(!useJavaScript)} className = "z-30 absolute right-0 top-0 border-1 p-2 rounded-sm bg-white">JavaScript enabled: {useJavaScript.toString()}</button>
          <div className = {`${columns} relative columns-4 h-[140vh] overflow-auto gap-10 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit`}>
              { useJavaScript ? 
                  componentList.map((component: any, index: number) => 
                  <ExtremelyDangerousElement render={component.topic} key={index}/>)
                  : componentList.map((component: any, index: number) => 
                    <div key={index} dangerouslySetInnerHTML={{ __html: component.topic}}/>)
              }
          </div>
          </>
      )
}