import React from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

type Profile = {
  name: string;
  profession: string;
  description: string;
  image: string;
};

type ProfileModalProps = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  setProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  setProfile,
  setProfileModalOpen,
  handleProfileImageChange,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4">
        <div className="flex flex-col items-center mb-5">
          <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center mb-4">
            {profile.image ? (
              <Image
                src={profile.image}
                alt="Profile Preview"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <FaPlus className="text-white" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
          placeholder="Name"
        />
        <input
          type="text"
          value={profile.profession}
          onChange={(e) =>
            setProfile({ ...profile, profession: e.target.value })
          }
          className="flex-1 p-3 mt-5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
          placeholder="Profession"
        />
        <textarea
          value={profile.description}
          onChange={(e) =>
            setProfile({ ...profile, description: e.target.value })
          }
          className="flex-1 p-3 mt-5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500 w-full"
          placeholder="Description"
          rows={4}
        />
        <div className="flex mt-5 justify-end space-x-4">
          <button
            onClick={() => setProfileModalOpen(false)}
            className="px-6 py-4 w-[200px] cursor-pointer bg-gray-100 text-center text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setProfileModalOpen(false)}
            className="px-6 py-4 w-[200px] cursor-pointer bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
