import { TopicItem, WordData } from "@/utils/types";
export function countTopics(list: TopicItem[]): WordData[] {
  const topicCount: { [key: string]: number } = {};

  list.forEach(item => {
    const topic = item.topic;
    topicCount[topic] = (topicCount[topic] || 0) + 1;
  });

  console.log(Object.keys(topicCount).map(topic => ({
    text: topic,
    value: topicCount[topic]})))
    
  return Object.keys(topicCount).map(topic => ({
    text: topic,
    value: topicCount[topic]
  }));
}

