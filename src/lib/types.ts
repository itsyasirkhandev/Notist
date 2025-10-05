
import { Timestamp } from "firebase/firestore";

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  userId?: string;
}
