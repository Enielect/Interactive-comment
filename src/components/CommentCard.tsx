import React, { useState } from "react";
// import { HiArrowUturnLeft, HiOutlineTrash, HiPencil } from "react-icons/hi2";
import LikesCounter from "./LikesCounter";
import ReplyEffect from "./ReplyEffect";
import UserEdit from "./UserEdit";

interface userData {
  image: { png: string; webp: string };
  username: string;
}

interface commentCardProps {
  // Add your component props here
  comment: {
    content: string;
    createdAt: string;
    score: number;
    user: userData;
    username: string;
    replies?: object[];
    replyingTo: string;
  };
  currentUser: string;
}

//proper way do define an array of strings
// const myStringArray: string[] = new Array<string>(); // Array of strings

const CommentCard: React.FC<commentCardProps> = ({ comment, currentUser }) => {
  const [likes, setLikes] = useState<number>(comment.score ?? 0);

  return (
    <div className="bg-white p-[12px] space-y-7 rounded-[5px] font-sans">
      {/* header of a comment card */}
      <div className="lg:flex lg:gap-[20px]">
        <div className="hidden lg:block">
          <LikesCounter likes={likes} setLikes={setLikes} large={true} />
        </div>
        <div className="lg:space-y-[15px]">
          <header className="flex flex-row gap-[15px] items-center lg:justify-between">
            <div className="flex gap-[15px]">
              <img
                src={comment.user.image.png}
                style={{ width: "40px", height: "40px" }}
                alt="Daniel"
              />
              <div className="flex gap-[15px] items-center">
                <span className="flex gap-[9px]">
                  <h3 className="font-bold text-[13px]">
                    {comment.user.username}
                  </h3>
                  {comment.user.username === currentUser && (
                    <span className="font-bold bg-purple-900 px-[6px] b-none rounded-[3px] text-white">
                      you
                    </span>
                  )}
                </span>
                <p>{comment.createdAt}</p>
              </div>
            </div>
            <ReplyEffect />
          </header>
          <div>
            {comment.replyingTo && (
              <span className="text-purple-700">@{comment.replyingTo}</span>
            )}{" "}
            {comment.content}
            {/* Impressive! Though it seems the drag feature could be improved. But
        overall it looks incredible. You've nailed the design and the
        responsiveness at various breakpoints works very well */}
          </div>
        </div>
        <footer className="flex justify-between lg:hidden">
          {/* likes counter */}
          <LikesCounter large={false} likes={likes} setLikes={setLikes} />
          {/* end of likes counter */}

          {comment.user.username !== currentUser ? (
            <ReplyEffect />
          ) : (
            <UserEdit />
          )}
        </footer>
      </div>
    </div>
  );
};

export default CommentCard;
