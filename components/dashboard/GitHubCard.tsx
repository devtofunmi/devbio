
import React from "react";

type GitHubCardProps = {
  githubUsername: string;
};

const GitHubCard: React.FC<GitHubCardProps> = ({ githubUsername }) => {
  return (
    <div className="flex flex-col justify-center text-center items-center">
      <h3 className="md:text-xl text-md text-center font-bold text-gray-600">
        GitHub Contribution Graph
      </h3>
      <div className="mt-3">
        {githubUsername && (
        <img
          src={`https://ghchart.rshah.org/${githubUsername}`}
          alt="GitHub Chart"
          className="w-full h-auto max-h-[250px] object-contain rounded-lg"
        />
      )}
      </div>
      
    </div>
  );
};

export default GitHubCard;
