'use client'
import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/hooks/AuthHooks/useAuth";

const NavAuthItems = () => {
  const { user,logout } = useAuth();
  console.log(user, "user in the nav item here");
  return (
    <div>
      {user ? (
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full border-2 border-indigo-800 w-16 h-16 p-1"
            src={user?.profileImage}
            alt="user profile image "
            width={40}
            height={5}
          />
           <button onClick={logout} className="group font-poppins text-lg text-text-primary hover:text-white bg-accent rounded-[30px]  px-5 py-3 whitespace-nowrap flex items-center gap-2 overflow-hidden relative transition-all duration-300 cursor-pointer">
              <span className="relative z-10 flex items-center gap-2 font-bold">
                LogOut
                {/* Normal icon */}
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1" />
              </span>

              {/* Background overlay */}
              <span className="absolute inset-0 bg-red-600 rounded-[30px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
            </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {/* Login Button */}
          <Link href={"/auth/login"}>
            <button className="group font-poppins text-lg text-text-primary hover:text-white bg-transparent border rounded-[30px] border-primary px-5 py-3 whitespace-nowrap flex items-center gap-2 overflow-hidden relative transition-all duration-300 cursor-pointer">
              <span className="relative z-10 flex items-center gap-2 font-bold">
                Login
                {/* Normal icon */}
                <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1" />
              </span>

              {/* Background overlay */}
              <span className="absolute inset-0 bg-primary rounded-[30px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
            </button>
          </Link>

          {/* Register Button */}
          <Link href={"/auth/register"}>
            <button className="group font-poppins text-lg text-text-primary hover:text-white bg-accent rounded-[30px]  px-5 py-3 whitespace-nowrap flex items-center gap-2 overflow-hidden relative transition-all duration-300 cursor-pointer">
              <span className="relative z-10 flex items-center gap-2 font-bold">
                Register
                {/* Normal icon */}
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1" />
              </span>

              {/* Background overlay */}
              <span className="absolute inset-0 bg-primary rounded-[30px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavAuthItems;
