import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import AutoResizingTextarea from "./AutoResizingTextarea";

type Profile = {
  name: string;
  profession: string;
  description: string;
  about: string;
  image: string;
};

type ProfileCardProps = {
  profile: Profile;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ profile: initialProfile }) => {
  const [profile, setProfile] = useState(initialProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
       reader.onload = (event) => {
       const result = (event.target as FileReader | null)?.result;
       if (result) {
         setProfile(prev => ({ ...prev, image: result as string }));
       }
     };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center text-center space-y-3 relative">
      <div className="w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center cursor-pointer" onClick={handleImageClick}>
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
      
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
          onMouseDown={(e) => e.stopPropagation()}
          className="text-xl font-bold text-gray-600 bg-transparent focus:outline-none focus:ring-0 border-none text-center"
        />
        <input
          type="text"
          name="profession"
          value={profile.profession}
          onChange={handleInputChange}
          onMouseDown={(e) => e.stopPropagation()}
          className="text-lg text-gray-600 bg-transparent focus:outline-none focus:ring-0 border-none text-center"
        />
      
      <AutoResizingTextarea
        name="description"
        value={profile.description}
        onChange={handleInputChange}
        onMouseDown={(e) => e.stopPropagation()}
        className="text-gray-600 text-base md:w-2xl bg-transparent focus:outline-none focus:ring-0 border-none text-center resize-none"
      />
      <AutoResizingTextarea
        name="about"
        value={profile.about}
        onChange={handleInputChange}
        onMouseDown={(e) => e.stopPropagation()}
        className="text-gray-600 text-base md:w-2xl bg-transparent focus:outline-none focus:ring-0 border-none text-center resize-none"
      />
    </div>
  );
};

export default ProfileCard;