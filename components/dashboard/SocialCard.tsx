import React from "react";

type Social = {
  name: string;
  icon: React.JSX.Element;
  href: string;
};

type SocialCardProps = {
  socials: Social[];
};

const SocialCard: React.FC<SocialCardProps> = ({ socials }) => {
  return (
    <div className="flex flex-col justify-center items-center">
       <h3 className="md:text-xl text-md text-center font-bold text-gray-600">
        Add your social links
      </h3>
      <div className="mt-3 flex gap-3">
        {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          className=" text-2xl text-gray-600 hover:text-blue-400"
        >
          {social.icon}
        </a>
      ))}
      </div>
      
    </div>
  );
};

export default SocialCard;