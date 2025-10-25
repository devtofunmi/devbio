import React from "react";

type Tech = {
  name: string;
  icon: React.JSX.Element;
};

type TechStackCardProps = {
  techStack: Tech[];
};

const TechStackCard: React.FC<TechStackCardProps> = ({ techStack }) => {
  return (
    <div className="flex flex-col">
      <h3 className="md:text-xl text-md text-center font-bold text-gray-600">
        Add your tech stack
      </h3>
      <div className="flex flex-wrap mt-3 justify-center items-center">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="flex gap-2 items-center m-1 p-2 bg-gray-100 text-gray-800 rounded-2xl border border-gray-200"
          >
            <div>{tech.icon}</div>
            <div className="text-sm">
            {tech.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackCard;