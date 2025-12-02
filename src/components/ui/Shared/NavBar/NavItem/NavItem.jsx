'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavItem = () => {
    const routes = [
      { name: "Home", path: "/" },
      { name: "All Courses", path: "/all-courses" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Dashboard", path: "/dashboard" },
      { name: "All Instructors", path: "/instructors"  },
      { name: "Premium Courses", path: "/premium-courses" },
      { name: "My Courses", path: "/my-courses"  },
      { name: "My Wishlist", path: "/wishlist" },
    ];
    const pathName=usePathname()
    return (
        <ul className="flex items-center gap-3 2xl:gap-5 text-[17px] font-medium ">
         
            {
                routes.map((route,i)=> <li key={i}><Link className={pathName===route.path ? "text-primary bg-slate-100 font-semibold xl:text-2xl" : "text-gray-700 hover:text-blue-500 transtion duration-200 text-sm  dark:text-white"} href={route.path}>{route.name}</Link></li>)
            }
            
        </ul>
    );
};

export default NavItem;