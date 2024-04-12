import React, { useContext } from "react";
import { Comment } from "../interfaces/commentInterface";
import { CommentContext } from "../contexts/CommentData";
import useSubmitComment from "../hooks/useSubmitComment";

// note we had to add an interface for the Addcomment component prop

//currentUser actual user object
//src = currentUser.image.png
interface AddComentProps {
  // Add your component props here\
  action: string;
  parentObject?: Comment;
  comment?: Comment;
  setReply?: React.Dispatch<React.SetStateAction<boolean>>;
}

// specifying a default prop using the eqal sign

const AddComent: React.FC<AddComentProps> = ({
  action,
  comment,
  parentObject,
  setReply,
}) => {
  const { data } = useContext(CommentContext);

  const { userData } = data;
  //what if currentUser is a string
  const currentUser = userData;
  const src = currentUser.image.png;

  //add a prop that specifies the function of the addcomment component

  const { handleSubmitComment, setUserComment } = useSubmitComment(
    parentObject,
    comment,
    action
  );

  // console.log(userComment);

  return (
    <div className="bg-white px-[24px] rounded-xl lg:flex lg:items-start lg:py-[15px] gap-[10px]">
      <img src={src} className="hidden lg:block lg:w-[40px] h-[40px]" alt="" />
      <input
        type="text"
        onChange={(e) => setUserComment(e.target.value)}
        placeholder={action === "SEND" ? "Add a comment" : "Add a reply"}
        className="border-black h-[80px] w-full px-[10px] my-[20px] rounded-[9px] border"
      />
      <div className="flex justify-between py-[15px] lg:hidden">
        <img src={src} className="w-[40px] h-[40px] " alt="" />
        <button
          onClick={() => {
            handleSubmitComment();
            setReply && setReply((c) => !c);
          }}
          className="bg-blue-800 text-white py-[12px] w-[100px] px-[20px] text-2xl font-bold rounded-[10px]"
        >
          {action}
        </button>
      </div>
      <button
        onClick={() => {
          handleSubmitComment();
          setReply && setReply((c) => !c);
        }}
        className="hidden lg:block lg:h-[50px] lg:bg-blue-800 lg:text-white lg:py-[12px] lg:w-[100px] lg:px-[20px] lg:text-2xl lg:font-bold lg:rounded-[10px]"
      >
        {action}
      </button>
    </div>
  );
};

export default AddComent;
