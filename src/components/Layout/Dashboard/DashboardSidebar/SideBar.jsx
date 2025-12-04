"use client";
import useAuth from "@/hooks/AuthHooks/useAuth";
import { BookOpen, House, School } from "lucide-react";
// import lightLogo from "../../../../assets/logo/logo.png";
// import darkLogo from "../../../../assets/logo/dark-logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineDonutSmall } from "react-icons/md";
import Image from "next/image";

const SideBar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  let sidebarRoutes = [];
  //   const role = user?.role;

  const role = "admin"; // just for testing
  if (role === "admin") {
    sidebarRoutes = [
      {
        name: "Overview",
        path: "/dashboard",
        icon: <House className="w-5 h-5" />,
      },
      {
        name: "Add Course",
        path: "/dashboard/admin/add-courses",
        icon: <School className="w-5 h-5" />,
      },
      {
        name: "Add Instructor",
        path: "/dashboard/admin/add-instructors",
        icon: <MdOutlineDonutSmall className="w-5 h-5" />,
      },
      {
        name: "Add Assignment ",
        path: "/dashboard/admin/add-assignment",
        icon: <MdOutlineDonutSmall className="w-5 h-5" />,
      },
      {
        name: "Add Quiz ",
        path: "/dashboard/admin/add-quiz",
        icon: <MdOutlineDonutSmall className="w-5 h-5" />,
      },
      {
        name: "All Courses",
        path: "/dashboard/admin/all-courses",
        icon: <MdOutlineDonutSmall className="w-5 h-5" />,
      },
      {
        name: "Manage Users",
        path: "/dashboard/admin/manage-users",
        icon: <BookOpen className="w-5 h-5" />,
      },
      
      {
        name: "Free Enrolled Course",
        path: "/dashboard/admin/free-enrolled",
        icon: <MdOutlineDonutSmall className="w-5 h-5" />,
      },
      {
        name: "Premium Enrolled Course",
        path: "/dashboard/admin/premium-enroll-info",
        icon: <MdOutlineDonutSmall className="w-5 h-5" />,
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
    <div className="bg-[#e1e2f6] dark:bg-[#192335] rounded-lg p-3 shadow-lg">
      {/* <div className="pb-6">
        <Image
          className="w-36 md:w-44 lg:w-full dark:hidden"
          src={lightLogo}
          alt="CourseMaster logo"
          width={250}
          height={150}
          priority
        />
        <Image
          className="w-36 md:w-44 lg:w-full hidden dark:block"
          src={darkLogo}
          alt="CourseMaster logo"
          width={250}
          height={150}
          priority
        />
      </div> */}
      <div className=" flex flex-col gap-4  p-2 ">
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
