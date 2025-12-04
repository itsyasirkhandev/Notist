
import { Timestamp } from "firebase/firestore";

export { Timestamp };

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId?: string;
  pinned?: boolean;
  completed?: boolean;
}

