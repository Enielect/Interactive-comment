import React from "react";
import { HiOutlineTrash, HiPencil } from "react-icons/hi2";

interface UserEditProps {
  // Add your component props here
  setEditComment: React.Dispatch<React.SetStateAction<boolean>>;
  handleIsCloseModal: () => void;
}

const UserEdit: React.FC<UserEditProps> = ({
  setEditComment,
  handleIsCloseModal,
}) => {
  return (
    <div className="flex gap-[15px] items-center">
      <button
        onClick={handleIsCloseModal}
        className="text-red-600 gap-[6px] flex items-baseline font-bold text-[15px]"
      >
        <HiOutlineTrash />
        <div className="p-[0]">Delete</div>
      </button>
      <button
        onClick={() => setEditComment((c) => !c)}
        className="text-purple-600 gap-[6px] flex items-baseline font-bold text-[15px]"
      >
        <HiPencil />
        <span>Edit</span>
      </button>
    </div>
  );
};

export default UserEdit;
