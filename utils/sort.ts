import { TopicItem, WordData } from "@/utils/types";
export function countTopics(list: TopicItem[]): WordData[] {
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

export function wrap(current: number, maximum: number){
  return ((current % maximum) + 1)
}

