import axios from "axios";
import { Comment } from "../interfaces/commentInterface";
import React, { useContext } from "react";
import { CommentContext } from "../contexts/CommentData";

export default function useLikesUpdate(
  parentObject: Comment,
  comment: Comment,
  likes: number
) {
  const { getComments } = useContext(CommentContext);
  function findUserIndexInReply(): number {
    return parentObject.replies.findIndex((object) => object.id === comment.id);
  }

  async function updateLikes() {
    try {
      let response;
      if (parentObject) {
        const index = findUserIndexInReply();
        response = await axios.put(
          `http://localhost:4001/comments/${parentObject.id}`,
          {
            ...parentObject,
            replies: [
              ...parentObject.replies.slice(0, index),
              { ...parentObject?.replies[index], score: likes },
              ...parentObject.replies.slice(index + 1),
            ],
          }
        );
        getComments();
      } else {
        response = await axios.put(
          `http://localhost:4001/comments/${comment.id}`,
          {
            ...comment,
            score: likes,
          }
        );
        getComments();
      }
      console.log("likes uploaded successfully:", response);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  }

  return { updateLikes };
}
