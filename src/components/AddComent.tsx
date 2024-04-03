import React from "react";

// note we had to add an interface for the Addcomment component prop
interface AddComentProps {
  // Add your component props here\
  src?: string;
  action: string;
  placeholder?: string;
}

// specifying a default prop using the eqal sign

const AddComent: React.FC<AddComentProps> = ({
  src,
  action,
  placeholder = "",
}) => {
  return (
    <div className="bg-white px-[24px] rounded-xl lg:flex lg:items-start lg:py-[15px] gap-[10px]">
      <img src={src} className="hidden lg:block lg:w-[40px] h-[40px]" alt="" />
      <textarea
        name="add-comment"
        id="add-comment"
        placeholder="Add a comment..."
        value={placeholder}
        className="border border-[gray] lg:mt-[0] p-[15px] rounded-md mt-[12px]"
        cols={40}
        rows={3}
      ></textarea>
      <div className="flex justify-between py-[15px] lg:hidden">
        <img src={src} className="w-[40px] h-[40px] " alt="" />
        <button className="bg-blue-800 text-white py-[12px] w-[100px] px-[20px] text-2xl font-bold rounded-[10px]">
          {action}
        </button>
      </div>
      <button className="hidden lg:block lg:h-[50px] lg:bg-blue-800 lg:text-white lg:py-[12px] lg:w-[100px] lg:px-[20px] lg:text-2xl lg:font-bold lg:rounded-[10px]">
        {action}
      </button>
    </div>
  );
};

export default AddComent;
