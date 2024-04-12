import React, { useContext, useState } from "react";
import { Comment } from "../interfaces/commentInterface";
import LikesCounter from "./LikesCounter";
import ReplyEffect from "./ReplyEffect";
import UserEdit from "./UserEdit";
import AddComent from "./AddComent";
import Modal from "./Modal";
import { CommentContext } from "../contexts/CommentData";
import { useUpdate } from "../hooks/useUpadat";

//currentUser = currentUser.username
interface commentCardProps {
  comment: Comment;
  //below is something new: extracts the interface from the comment object of the commentCardProps interface
  parentObject?: commentCardProps["comment"];
  // setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//proper way do define an array of strings
// const myStringArray: string[] = new Array<string>(); // Array of strings

const CommentCard: React.FC<commentCardProps> = ({ comment, parentObject }) => {
  const { data, dispatch } = useContext(CommentContext);

  const { userData, isModalOpen } = data;
  const currentUser = userData.username;

  const [likes, setLikes] = useState<number>(comment.score ?? 0);
  const [reply, setReply] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(comment?.content);

  const { handleUpdate, handleDeleteReply } = useUpdate(
    parentObject,
    comment,
    editValue
  );

  const handleIsCloseModal = () => dispatch({ type: "CHANGE_MODAL_STATE" });

  return (
    <>
      <div className="bg-white p-[12px] space-y-7 rounded-[5px] font-sans">
        {isModalOpen && (
          <Modal
            handleDelete={handleDeleteReply}
            onClose={handleIsCloseModal}
            isOpen={isModalOpen}
          >
            <h2 className="font-bold text-2xl mb-[10px]">Delete Comment</h2>
            <div className="text-[14px] mb-[10px]">
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone `
            </div>
          </Modal>
        )}
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
                  <UserEdit
                    setEditComment={setEditComment}
                    handleIsCloseModal={handleIsCloseModal}
                  />
                )}
              </div>
            </header>
            {editComment ? (
              <div className="mt-[13px] relative">
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
                    onClick={() => handleUpdate(setEditComment)}
                    className="bg-blue-600 text-white rounded-[5px] block mt-[13px] font-bold p-[10px]"
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {comment.replyingTo && (
                  <span className="text-purple-700">@{comment.replyingTo}</span>
                )}{" "}
                {comment.content}
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
              <UserEdit
                setEditComment={setEditComment}
                handleIsCloseModal={handleIsCloseModal}
              />
            )}
          </footer>
        </div>
      </div>
      {/* configure the style of the url link for the current-user image */}
      {/* the below displays the input filed when the reply button is clicked */}
      {reply && (
        <div className="mt-[12px]">
          <AddComent
            action="REPLY"
            parentObject={parentObject}
            comment={comment}
            setReply={setReply}
            // src={`./images/avatars/image-${currentUser}.png`}
          />
        </div>
      )}
    </>
  );
};

export default CommentCard;
