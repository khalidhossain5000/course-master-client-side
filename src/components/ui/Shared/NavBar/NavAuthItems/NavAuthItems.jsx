import React from "react";
import { ArrowUpRight, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

const NavAuthItems = () => {
  return (
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
  );
};

export default NavAuthItems;
