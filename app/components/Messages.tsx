'use client'
import useSWR from "swr";
import { multiFetcher } from "@/utils/fetcher";
import { Wordcloud } from "@visx/wordcloud";
import { useState } from "react";
import { scaleLog } from "@visx/scale";
import { Text } from "@visx/text";
import ParentSize from '@visx/responsive/lib/components/ParentSize';


interface TopicItem {
  topic: string
}

interface ExampleProps {
  width: number;
  height: number;
  wordList: any;
  showControls?: boolean;
}

export interface WordData {
  text: string;
  value: number;
}


const colors = ["#005db1", "#002343", " #85B4D6", "#0c4a6e"];

function countTopics(list: TopicItem[]): WordData[] {
  const topicCount: { [key: string]: number } = {};

  list.forEach(item => {
    const topic = item.topic;
    topicCount[topic] = (topicCount[topic] || 0) + 1;
  });

  return Object.keys(topicCount).map(topic => ({
    text: topic,
    value: topicCount[topic]
  }));
}

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
        font={"verdana"}
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
              fontSize={w.size! * 2}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
      <style jsx>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          user-select: none;
        }
        .wordcloud svg {
          margin: 1rem 0;
          cursor: pointer;
        }

        .wordcloud label {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          margin-right: 8px;
        }
        .wordcloud textarea {
          min-height: 100px;
        }
      `}</style>
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
        <div className = "w-screen h-screen absolute">
          <ParentSize>{({ width, height }) => 
            <Example width={width} height={height} wordList = {wordsList}/>
          }</ParentSize>
        </div>
    )
}