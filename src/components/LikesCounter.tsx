import React, { SetStateAction, useEffect } from "react";

interface LikesCounterProps {
  // Add your component props here
  likes: number;
  setLikes: React.Dispatch<SetStateAction<number>>;
  large: boolean;
  updateLikes: () => void;
}

const LikesCounter: React.FC<LikesCounterProps> = ({
  likes,
  setLikes,
  large,
  updateLikes,
}) => {

  //i am not sure this is the best way to update the likes values in the server though
  useEffect(() => {
    updateLikes();
  }, [likes]);


  return (
    <div
      className={`bg-grayishBlue rounded-[8px] ${
        large && "flex flex-col w-[35px] items-center"
      }`}
    >
      <button
        className={`py-[6px] px-[8px] text-[16px]`}
        onClick={() => {
          setLikes((c) => c + 1);
        }}
      >
        +
      </button>
      <span className={`text-purple-800 p-[10px] font-bold`}>{likes}</span>
      <button
        className={`py-[6px] px-[8px] text-[16px]`}
        onClick={() => {
          setLikes((c) => c - 1);
        }}
        disabled={likes === 0}
      >
        -
      </button>
    </div>
  );
};

export default LikesCounter;
