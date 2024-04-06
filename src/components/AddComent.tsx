import axios from "axios";
import React, { useState } from "react";

// note we had to add an interface for the Addcomment component prop

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

interface AddComentProps {
  // Add your component props here\
  src: string;
  action: string;
  placeholder?: string;
  currentUser: userData;
  comments: Comment[];
}

// specifying a default prop using the eqal sign

const AddComent: React.FC<AddComentProps> = ({
  src,
  action,
  comments,
  currentUser,
}) => {
  const [userComment, setUserComment] = useState<string>("");
  //add a prop that specifies the function of the addcomment component

  async function handleClick() {
    //write a helper function that determined what id the new object we are making should have
    // function findHighestIdInObject<
    //   T extends { id: number | string; replies: Comment["replies"] }
    // >(obj: T): number {
    //   let highestId = typeof obj.id === "string" ? +obj.id : obj.id;
    //   if (obj.replies) {
    //     for (const reply of obj.replies) {
    //       const replyId = findHighestIdInObject(reply);
    //       highestId = Math.max(highestId, replyId);
    //     }
    //   }
    //   return highestId;
    // }

    if (action === "SEND") {
      try {
        // const highestId = Math.max(...comments.map(findHighestIdInObject));
        // const newId = String(highestId + 1);
        //know when to use the post methodconst highestId = Math.max(...comments.map(findHighestIdInObject));
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
        console.log("Comment made successfully:", response);
      } catch (error) {
        console.error("Error making comment:", error);
      }
    }else {
      //if the action is not send then it is reply
      //we will have to find the parent object of the comment we are replying to
      //then we will have to find the index of the comment we are replying to
      //then we will have to add the new comment to the replies array of the parent object
      //then we will have to update the parent object in the database
      //then we will have to update the parent object in the state
      //then we will have to update the parent object in the UI
      //then we will have to close the modal
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
        <button onClick={handleClick} className="bg-blue-800 text-white py-[12px] w-[100px] px-[20px] text-2xl font-bold rounded-[10px]">
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
