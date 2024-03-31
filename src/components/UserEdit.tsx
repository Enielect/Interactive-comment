import React from "react";
import { HiOutlineTrash, HiPencil } from "react-icons/hi2";

interface UserEditProps {
  // Add your component props here
}

const UserEdit: React.FC<UserEditProps> = ({}) => {
  return (
    <div className="flex gap-[15px] items-center">
      <div className="text-red-600 gap-[6px] flex items-baseline font-bold text-[15px]">
        <HiOutlineTrash />
        <div className="p-[0]">Delete</div>
      </div>
      <div className="text-purple-600 gap-[6px] flex items-baseline font-bold text-[15px]">
        <HiPencil />
        <span>Edit</span>
      </div>
    </div>
  );
};

export default UserEdit;
