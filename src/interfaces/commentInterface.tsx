interface userData {
  image: { png: string; webp: string };
  username: string;
}

interface Comment {
  id: number | string;
  content: string;
  createdAt: string;
  score: number;
  user: userData;
  replyingTo?: string;
  //removing the queston mark from below wasn't the easies of things
  replies: {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: userData;
  }[];
}

export type { Comment };
