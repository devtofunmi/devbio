import React from "react";
import { FaTimes } from "react-icons/fa";

type GitHubModalProps = {
  githubUsername: string;
  setGithubUsername: React.Dispatch<React.SetStateAction<string>>;
  setGithubModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetGithubUsername: () => void;
};

const GitHubModal: React.FC<GitHubModalProps> = ({
  githubUsername,
  setGithubUsername,
  setGithubModalOpen,
  handleSetGithubUsername,
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg m-4 relative transform transition-all duration-300 ease-in-out scale-100">
        <button onClick={() => setGithubModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <FaTimes  />
        </button>
        <div className="flex items-center bg-gray-50 rounded-full p-1">
          <input
            type="text"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            className="flex-1 p-3 bg-transparent focus:outline-none text-black placeholder-gray-400 w-full"
            placeholder="Enter your GitHub username"
          />
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleSetGithubUsername}
            className="px-8 py-3 w-full cursor-pointer bg-blue-400 text-white text-center rounded-full hover:bg-blue-500 transition-colors duration-300 shadow-lg"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default GitHubModal;
