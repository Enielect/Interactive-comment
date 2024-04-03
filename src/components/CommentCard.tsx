import React, { useEffect, useState } from "react";
// import { HiArrowUturnLeft, HiOutlineTrash, HiPencil } from "react-icons/hi2";
import LikesCounter from "./LikesCounter";
import ReplyEffect from "./ReplyEffect";
import UserEdit from "./UserEdit";
import AddComent from "./AddComent";
import axios from "axios";

interface userData {
  image: { png: string; webp: string };
  username: string;
}

interface commentCardProps {
  // Add your component props here
  comment: {
    id?: number;
    content: string;
    createdAt: string;
    score: number;
    user: userData;
    username: string;
    replies?: object[];
    replyingTo: string;
  };
  currentUser: string;
  parentObject: object;
}

//proper way do define an array of strings
// const myStringArray: string[] = new Array<string>(); // Array of strings

const CommentCard: React.FC<commentCardProps> = ({
  comment,
  currentUser,
  parentObject,
}) => {
  const [likes, setLikes] = useState<number>(comment.score ?? 0);
  const [reply, setReply] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(comment?.content);


  async function handleUpdate() {
    const index = parentObject?.replies.findIndex(
      (object: object) => object.id === comment.id
    );
    try {
      const response =
           parentObject &&
        (await axios.put(`http://localhost:4001/comments/${parentObject?.id}`, {
          ...parentObject,
          replies: [
            ...parentObject.replies.slice(0, index),
            { ...parentObject?.replies[index], content: editValue },
            ...parentObject.replies.slice(index + 1),
          ],
        }));
      console.log("data uploaded successfully:", response);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  }

  return (
    <>
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
              <div className="hidden lg:block">
                {comment.user.username !== currentUser ? (
                  <ReplyEffect setReply={setReply} />
                ) : (
                  <UserEdit setEditComment={setEditComment} />
                )}
              </div>
            </header>
            {editComment ? (
              <div className="mt-[13px] relative">
                {/* <AddComent
                  action="UPDATE"
                  src={`./images/avatars/image-${currentUser}.png`}
                  placeholder={`@${comment.replyingTo} ${comment.content}`}
                /> */}

                <textarea
                  name=""
                  className="border border-black rounded-sm p-[5px]"
                  id=""
                  cols={60}
                  onChange={(e) => setEditValue(e.target.value)}
                  value={editValue}
                  rows={5}
                ></textarea>
                <div className="flex justify-end">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white rounded-[5px] block mt-[13px] font-bold p-[10px]"
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            ) : (
              // <textarea
              //   placeholder={`@${comment.replyingTo} ${comment.content}`}
              // ></textarea>
              <div>
                {comment.replyingTo && (
                  <span className="text-purple-700">@{comment.replyingTo}</span>
                )}{" "}
                {comment.content}
                {/* Impressive! Though it seems the drag feature could be improved. But
        overall it looks incredible. You've nailed the design and the
        responsiveness at various breakpoints works very well */}
              </div>
            )}
          </div>
          <footer className="flex justify-between lg:hidden">
            {/* likes counter */}
            <LikesCounter large={false} likes={likes} setLikes={setLikes} />
            {/* end of likes counter */}

            {comment.user.username !== currentUser ? (
              <ReplyEffect setReply={setReply} />
            ) : (
              <UserEdit setEditComment={setEditComment} />
            )}
          </footer>
        </div>
      </div>
      {/* configure the style of the url link for the current-user image */}
      {/* the below displays the input filed when the reply button is clicked */}
      {reply && (
        <div className="mt-[`12px]">
          <AddComent
            action="REPLY"
            src={`./images/avatars/image-${currentUser}.png`}
          />
        </div>
      )}
    </>
  );
};

export default CommentCard;
