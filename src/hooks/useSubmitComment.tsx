import axios from "axios";
import { useContext, useState } from "react";
import { CommentContext } from "../contexts/CommentData";
import { Comment } from "../interfaces/commentInterface";

function findHighestIdInObject<
  T extends { id: number | string; replies?: Comment["replies"] }
>(obj: T): number {
  let highestId = typeof obj.id === "string" ? +obj.id : obj.id;
  if (obj.replies) {
    for (const reply of obj.replies) {
      const replyId = findHighestIdInObject(reply);
      highestId = Math.max(highestId, replyId);
    }
  }
  return highestId;
}

function useSubmitComment(
  parentObject: Comment,
  comment: Comment,
  action: string
) {
  const { data, getComments } = useContext(CommentContext);
  const { userData, comments } = data;

  const highestId =
    comments && Math.max(...comments.map(findHighestIdInObject)) + 1;

  const currentUser = userData;

  const [userComment, setUserComment] = useState<string>("");

  async function handleSubmitComment() {
    //write a helper function that determined what id the new object we are making should have

    function findIndexInReply(): number {
      return parentObject?.replies?.findIndex(
        (reply) => reply.id === comment.id
      );
    }

    // know when to use the post method
    if (action === "SEND") {
      try {
        // const highestId = String(highestId + 1);
        const newCommentData = {
          content: userComment,
          createdAt: new Date().toISOString(),
          score: 0,
          user: currentUser,
          replies: [],
        };
        const response = await axios.post(
          "http://localhost:4001/comments",
          JSON.stringify(newCommentData)
        );
        //clear the input field
        setUserComment("");
        getComments();
        console.log("Comment made successfully:", response);
      } catch (error) {
        console.error("Error making comment:", error);
      }
    } else {
      //if the action is not send then it is reply
      //we will have to find the parent object of the comment we are replying to
      //then we will have to find the index of the comment we are replying to
      const index = findIndexInReply();
      console.log(index);
      //then we will have to add the new comment to the replies array of the parent object
      //then we will have to update the parent object in the database
      //then we will have to update the parent object in the state
      //then we will have to update the parent object in the UI
      try {
        let newestObject;
        if (index) {
          newestObject = {
            ...parentObject,
            replies: [
              ...parentObject.replies.slice(0, index),
              {
                ...comment,
                content: userComment,
              },
              ...parentObject.replies.slice(index + 1),
            ],
          };
        } else {
          //note that the usage of currentUser here is with respect to it being a string
          newestObject = {
            ...comment,
            replies: comment.replies
              ? [
                  ...comment.replies,
                  {
                    id: highestId,
                    content: userComment,
                    createdAt: new Date().toISOString(),
                    score: 0,
                    replyingTo: comment.user.username,
                    user: currentUser,
                  },
                ]
              : [
                  {
                    id: highestId,
                    content: userComment,
                    createdAt: new Date().toISOString(),
                    score: 0,
                    replyingTo: comment.user.username,
                    user: currentUser,
                  },
                ],
          };
        }
        const response = await axios.put(
          `http://localhost:4001/comments/${parentObject?.id ?? comment.id}`,
          newestObject
        );
        //clear the input field
        setUserComment("");
        //refetch comments data
        getComments();
        console.log("Reply made successfully:", response);
      } catch (error) {
        console.error("Error making reply:", error);
      }
      //then we will have to clear the input field
    }
    //below should be intent not action trying to avoid error warning
  }

  return { handleSubmitComment, setUserComment, userComment };
}

export default useSubmitComment;
