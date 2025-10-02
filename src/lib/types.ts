
import { Timestamp } from "firebase/firestore";

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  completed: boolean;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  userId?: string;
}
