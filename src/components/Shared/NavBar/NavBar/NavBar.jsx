import React from "react";
import lightLogo from "../../../../assets/logo/logo.png";
import darkLogo from '../../../../assets/logo/dark-logo.png'
import Image from "next/image";
import NavItem from "../NavItem/NavItem";
import NavAuthItems from "../NavAuthItems/NavAuthItems";
const NavBar = () => {

  return (
    <div className="bg-background sticky top-0 z-50 shadow-sm">
      <nav className="lxl:max-w-7xl 2xl:container mx-auto flex items-center justify-between gap-6 py-4">
        <div className="logo">
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
        </div>
        {/* nav items */}
        <div>
          <NavItem />
        </div>
        {/* auth buttons and profile component*/}
        <div className="hidden lg:block">
          <NavAuthItems />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
