import React from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

type Profile = {
  name: string;
  profession: string;
  description: string;
  image: string;
};

type ProfileCardProps = {
  profile: Profile;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center">
        {profile.image ? (
          <Image
            src={profile.image}
            alt="Profile"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <FaPlus className="text-white " />
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-600">{profile.name}</h2>
        <p className="text-lg text-gray-600">{profile.profession}</p>
      </div>
      <p className="text-gray-600 text-base max-w-sm">{profile.description}</p>
    </div>
  );
};

export default ProfileCard;