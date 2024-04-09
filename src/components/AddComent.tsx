import axios from "axios";
import React, { useContext, useState } from "react";
import { Comment } from "../interfaces/commentInterface";
import { CommentContext } from "../contexts/CommentData";

// note we had to add an interface for the Addcomment component prop


//currentUser actual user object
//src = currentUser.image.png
interface AddComentProps {
  // Add your component props here\
  action: string;
  placeholder?: string;
  parentObject: Comment;
  comment: Comment;
}

// specifying a default prop using the eqal sign

const AddComent: React.FC<AddComentProps> = ({
  action,
  comment,
  parentObject,
}) => {

  const {data} = useContext(CommentContext);

  const {userData, comments} = data;
  //what if currentUser is a string
  const currentUser = userData;
  const src = currentUser.image.png

  const [userComment, setUserComment] = useState<string>("");
  //add a prop that specifies the function of the addcomment component

  function findHighestIdInObject<
      T extends { id: number | string; replies: Comment["replies"] }
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

    const highestId = comments && Math.max(...comments.map(findHighestIdInObject));
    const newId = highestId + 1; //we use the Number constructor to convert undefined to a number
    console.log(newId )

  async function handleClick() {
    //write a helper function that determined what id the new object we are making should have

    function findIndexInReply(): number {
      return parentObject?.replies?.findIndex(
        (reply) => reply.id === comment.id
      );
    }

    // know when to use the post method
    if (action === "SEND") {
      try {
        // const newId = String(highestId + 1);
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
        console.log("Comment made successfully:", response);
      } catch (error) {
        console.error("Error making comment:", error);
      }
    } else {
      //if the action is not send then it is reply
      //we will have to find the parent object of the comment we are replying to
      //then we will have to find the index of the comment we are replying to
      const index = findIndexInReply();
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
            replies: [
              {
                id: newId,
                content: userComment,
                createdAt: new Date().toISOString(),
                score: 0,
                replyingTo: comment.user.username,
                user: {
                  image: {
                    png: `./images/avatars/image-${currentUser}.png`,
                    webp: `./images/avatars/image-${currentUser}.webp`,
                  },
                  username: `${currentUser}`,
                },
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
        console.log("Reply made successfully:", response);
      } catch (error) {
        console.error("Error making reply:", error);
      }
      //then we will have to clear the input field
    }
    //below should be intent not action trying to avoid error warning
  }
  console.log(userComment);

  return (
    <div className="bg-white px-[24px] rounded-xl lg:flex lg:items-start lg:py-[15px] gap-[10px]">
      <img src={src} className="hidden lg:block lg:w-[40px] h-[40px]" alt="" />
      <input
        type="text"
        onChange={(e) => setUserComment(e.target.value)}
        className="border-black h-[80px] py-[0] rounded-[9px] border"
      />
      <div className="flex justify-between py-[15px] lg:hidden">
        <img src={src} className="w-[40px] h-[40px] " alt="" />
        <button
          onClick={handleClick}
          className="bg-blue-800 text-white py-[12px] w-[100px] px-[20px] text-2xl font-bold rounded-[10px]"
        >
          {action}
        </button>
      </div>
      <button
        onClick={handleClick}
        className="hidden lg:block lg:h-[50px] lg:bg-blue-800 lg:text-white lg:py-[12px] lg:w-[100px] lg:px-[20px] lg:text-2xl lg:font-bold lg:rounded-[10px]"
      >
        {action}
      </button>
    </div>
  );
};

export default AddComent;
