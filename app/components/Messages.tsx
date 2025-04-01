'use client'
import useSWR from "swr";
import { multiFetcher } from "@/utils/fetcher";
import { Wordcloud } from "@visx/wordcloud";
import { useState } from "react";
import { scaleLog } from "@visx/scale";
import { Text } from "@visx/text";
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import {ExampleProps, WordData } from "@/utils/types";
import { countTopics } from "@/utils/sort";


const colors = ["#005db1", "#002343", " #85B4D6", "#0c4a6e"];


const fixedValueGenerator = () => 0.5;

function Example({ width, height, wordList}: ExampleProps) {
  const words = countTopics(wordList)
  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value))
    ],
    range: [10, 60]
  });
  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  return (
    <div className="wordcloud">
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={"Phantom Sans"}
        padding={20}
        spiral={"archimedean"}
        rotate={0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={"middle"}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={width < 768 ? w.size! * 1.2 : w.size! * 2}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
    </div>
  );
}

export default function Messages({slide}: {slide: number}){
    const { data, error, isLoading } = useSWR([`/api/messages?slide=${slide}`], multiFetcher,
      {
        refreshInterval: 250
      }
    )

    let wordsList = []
    if (data){
      wordsList = data[0]
    }
    return (
        <div className = "w-full h-full overflow-auto">
          <ParentSize>{({ width, height }) => 
            <Example width={width} height={height} wordList = {wordsList}/>
          }</ParentSize>
        </div>
    )
}