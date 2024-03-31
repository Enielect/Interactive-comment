import React from "react";

// note we had to add an interface for the Addcomment component prop
interface AddComentProps {
  // Add your component props here\
  src?: string;
}

const AddComent: React.FC<AddComentProps> = ({ src }) => {
  return (
    <div className="bg-white px-[24px] rounded-xl">
      <textarea
        name="add-comment"
        id="add-comment"
        placeholder="Add a comment..."
        className="border border-[gray] p-[15px] rounded-md mt-[12px]"
        cols={40}
        rows={3}
      ></textarea>
      <div className="flex justify-between py-[15px]">
        <img src={src} className="w-[40px] h-[40px] " alt="" />
        <button className="bg-blue-800 text-white py-[12px] w-[100px] px-[20px] text-2xl font-bold rounded-[10px]">
          SEND
        </button>
      </div>
    </div>
  );
};

export default AddComent;
