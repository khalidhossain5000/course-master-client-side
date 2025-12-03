"use client";
import useAuth from "@/hooks/AuthHooks/useAuth";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfileLayout = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="banners flex items-center justify-between p-6">
        <h2 className="font-poppins text-2xl text-text-primary dark:text-text-dark-primary font-bold">
          Profile
        </h2>
        <div>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
            <Edit className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      {/* profile image */}
      <div>
        <Image
          className="rounded-full border-2 border-indigo-800 w-36 h-36 p-1 mx-auto"
          src={user?.profileImage}
          alt="user profile image "
          width={40}
          height={5}
        />
      </div>
      {/* user info */}
      <div className="text-center py-4 space-y-2">
        <h2 className="text-2xl font-poppins font-bold">Name :{user?.name}</h2>
        <h5 className="text-xl font-medium">Email: {user?.email}
        </h5>
        <h6 className="text-lg text-primary">Role: {user?.role}</h6>
      </div>
    </div>
  );
};

export default ProfileLayout;
