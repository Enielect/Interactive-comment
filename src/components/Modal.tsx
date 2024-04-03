import React from "react";

interface ModalProps {
  // Add your component props here
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  handleDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, handleDelete }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-modalBackground flex justify-center items-center z-100">
      {/* Your component content here */}
      <div className="bg-white py-[15px] px-[25px] max-h-[250px] max-w-[75vw] rounded-[10px]">
        {children}
        <div className="flex justify-between gap">
          <button onClick={onClose} className="bg-gray-500 py-[12px] rounded-[9px] px-[15px]">NO, CANCEL</button>
          <button onClick={handleDelete} className="bg-red-400 py-[12px] px-[15px] rounded-[9px]">
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
