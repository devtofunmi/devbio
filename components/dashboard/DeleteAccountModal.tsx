import React from 'react';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg m-4 relative transform transition-all duration-300 ease-in-out scale-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirm Account Deletion</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 cursor-pointer rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 cursor-pointer rounded-full bg-red-600 text-white hover:bg-red-700"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
