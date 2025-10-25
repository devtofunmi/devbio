
import React from "react";

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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4">
        <input
          type="text"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
          placeholder="Enter your GitHub username"
        />
        <div className="flex justify-end space-x-4 mt-5">
          <button
            onClick={() => setGithubModalOpen(false)}
            className="px-6 py-4 w-[200px] cursor-pointer bg-gray-100 text-center text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSetGithubUsername}
            className="px-6 py-4 w-[200px] cursor-pointer bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default GitHubModal;
