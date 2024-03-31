import React from "react";
import { HiArrowUturnLeft } from "react-icons/hi2";

interface ReplyEffectProps {
  // Add your component props here
}

const ReplyEffect: React.FC<ReplyEffectProps> = ({}) => {
  return (
    <div className="text-purple-800 flex items-center gap-[5px] text-[16px] font-bold">
      <HiArrowUturnLeft style={{ fontSize: "16px", fontWeight: "bold" }} />
      <span>Reply</span>
    </div>
  );
};

export default ReplyEffect;
