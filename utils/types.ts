import { User } from "next-auth"

export interface TopicItem {
    topic: string
  }
  
export interface ExampleProps {
    width: number;
    height: number;
    wordList: any;
    showControls?: boolean;
  }
  
export interface WordData {
    text: string;
    value: number;
}


export interface NewNextAuthUser extends User {
    username: string
}