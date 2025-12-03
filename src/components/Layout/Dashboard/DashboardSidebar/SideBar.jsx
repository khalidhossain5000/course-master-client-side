"use client";
import useAuth from "@/hooks/AuthHooks/useAuth";
import { BookOpen, House, School } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineDonutSmall } from "react-icons/md";

const SideBar = () => {
  const pathname = usePathname();
  const {user,}=useAuth()
  let sidebarRoutes = [];
  // const role = user?.role;
  
  const role = "admin"; // just for testing
  if (role === "admin") {
    sidebarRoutes = [
      {
        name: "Overview",
        path: "/dashboard",
        icon: <House className="w-5 h-5" />,
      },
      {
        name: "Manage Users",
        path: "/dashboard/admin/manage-users",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        name: "Add Course",
        path: "/dashboard/admin/add-courses",
        icon: <School className="w-5 h-5" />,
      },
      {
        name: "All Course",
        path: "/dashboard/admin/all-courses",
        icon: <MdOutlineDonutSmall  className="w-5 h-5" />,
      }, 
      {
        name: "Free Enrolled Course",
        path: "/dashboard/admin/free-enrolled",
        icon: <MdOutlineDonutSmall  className="w-5 h-5" />,
      },
      {
        name: "Premium Enrolled Course",
        path: "/dashboard/admin/premium-enroll-info",
        icon: <MdOutlineDonutSmall  className="w-5 h-5" />,
      },
    ];
  }
  // user route starts here
  if (role === "student") {
    sidebarRoutes = [
      {
        name: "Dashboard Overview",
        path: "/dashboard",
        icon: <House className="w-5 h-5" />,
      },
      {
        name: "My Courses",
        path: "/dashboard/students/my-courses",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        name: "Update Profile",
        path: "/dashboard/students/update-profile",
        icon: <BookOpen className="w-5 h-5" />,
      },
    ];
  }

  return (
    <div className="" >
      <div className="bg-[#f5f7f9] dark:bg-[#192335] flex flex-col gap-4 rounded-xl p-2 ">
        {sidebarRoutes.map((route, idx) => {
          const isActive = pathname === route.path;
          return (
            <Link
              key={idx}
              href={route.path}
              className={`flex items-center gap-3 px-2 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#000000] text-white font-semibold"
                  : "hover:bg-gray-800 text-black dark:text-white hover:text-white dark:hover:text-white "
              }`}
            >
              {route.icon}
              <span className="font-poppins">{route.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;










