'use client'
import React from 'react';
import lightLogo from "../../../../assets/logo/logo.png";
import darkLogo from "../../../../assets/logo/dark-logo.png";
import Image from 'next/image';
import ModeToggle from '@/components/Shared/ModeToggle/ModeToggle';
const DashboardBanner = () => {
    return (

        <div className='max-w-[1600px] mx-auto flex items-center justify-between px-24 shadow-md bg-gray-50 mt-22  z-50 sticky top-0'>
            <div className="pb-6">
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
                  <div>
                    <ModeToggle/>
                  </div>
        </div>
    );
};

export default DashboardBanner;