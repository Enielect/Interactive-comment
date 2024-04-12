import axios from "axios";
import { Comment } from "../interfaces/commentInterface";
import React, { useContext } from "react";
import { CommentContext } from "../contexts/CommentData";

function useUpdate(
  parentObject: Comment,
  comment: Comment,
  updatedValue: string
) {
  const { dispatch, getComments } = useContext(CommentContext);
  function findUserIndexInReply(): number {
    return parentObject.replies.findIndex((object) => object.id === comment.id);
  }

  async function handleUpdate(
    setEditComment: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      let response;
      if (parentObject) {
        const index = findUserIndexInReply();
        response = await axios.put(
          `http://localhost:4001/comments/${parentObject?.id}`,
          {
            ...parentObject,
            replies: [
              ...parentObject.replies.slice(0, index),
              { ...parentObject?.replies[index], content: updatedValue },
              ...parentObject.replies.slice(index + 1),
            ],
          }
        );
        getComments();
        setEditComment((c) => !c);
      } else {
        response = await axios.put(
          `http://localhost:4001/comments/${comment.id}`,
          {
            ...comment,
            content: updatedValue,
          }
        );
        getComments();
        setEditComment((c: boolean) => !c);
      }
      console.log("data uploaded successfully:", response);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  }

  const handleIsCloseModal = () => dispatch({ type: "CHANGE_MODAL_STATE" });

  async function handleDeleteReply() {
    try {
      if (parentObject) {
        const index = findUserIndexInReply();
        const response =
          parentObject &&
          (await axios.put(
            `http://localhost:4001/comments/${parentObject?.id}`,
            {
              ...parentObject,
              replies: [
                ...parentObject.replies.slice(0, index),
                ...parentObject.replies.slice(index + 1),
              ],
            }
          ));
        console.log("data uploaded successfully", response);
        handleIsCloseModal();
      } else {
        //deleting the current user's comment(top-level)
        const response = await axios.delete(
          `http://localhost:4001/comments/${comment.id}`
        );
        console.log("data uploaded successfully", response);
        handleIsCloseModal();
      }
    } catch (error) {
      console.error("Error updating comment: ", error);
    }
  }

  return { handleUpdate, handleDeleteReply };
}

export { useUpdate };
