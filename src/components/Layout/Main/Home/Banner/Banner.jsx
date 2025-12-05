import React from "react";
import bannerImg from "../../../../../assets/Banner/banner-img.webp";
import bgImg from "../../../../../assets/Banner/bg-imgssg.png";
import Image from "next/image";
import { ArrowRight, ShieldAlert } from "lucide-react";
const Banner = () => {
  return (
    <div className="bg-[#f4fbf7] dark:bg-[#0d1914] min-h-[90vh]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between h-full">
        <div className="content flex-1 px-3 pt-6 xl:pt-0">
          <div className="info flex items-center gap-2 border-2 border-accent rounded-xl py-2 px-5 justify-center max-w-sm md:mx-auto lg:mx-0">
            <span>
              <ShieldAlert />
            </span>
            <h2 className="text-lg md:text-xl xl:text-2xl font-medium font-poppins xl:font-bold text-text-primary dark:text-text-primary">
              1100% QUALITY COURSES{" "}
            </h2>
          </div>
          <div className="titles space-y-2 lg:space-y-6 py-5 lg:py-9 text-center lg:text-left ">
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold xl:font-bold text-text-primary">
              Discover Your Perfect Courses{" "}
            </h2>
            <p className="text-sm lg:text-xl text-text-primary font-poppins ">
              We Have 40k+ Online Courses & 500K+ Online Registered Student.
            </p>
            <div className="butngs pt-6">
              <button className="group relative px-8 py-4 bg-transparent border-2 border-[#071431] dark:border-white/30 text-[#071431] dark:text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:bg-[#22c55e] hover:border-[#22c55e] hover:text-white">
                {/* Animated border elements */}
                <div className="absolute -top-[2px] -left-[2px] w-0 h-[2px] bg-[#071431] dark:bg-white group-hover:w-full transition-all duration-400 ease-out group-hover:delay-100" />
                <div className="absolute -bottom-[2px] -right-[2px] w-0 h-[2px] bg-[#071431] dark:bg-white group-hover:w-full transition-all duration-400 ease-out group-hover:delay-100" />
                <div className="absolute -left-[2px] -top-[2px] h-0 w-[2px] bg-[#071431] dark:bg-white group-hover:h-full transition-all duration-400 ease-out" />
                <div className="absolute -right-[2px] -bottom-[2px] h-0 w-[2px] bg-[#071431] dark:bg-white group-hover:h-full transition-all duration-400 ease-out" />

                <span className="relative z-10 flex items-center gap-3">
                  Explore Courses
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${bgImg.src})` }}
          className="image flex-1 bg-cover bg-left "
        >
          <Image
            src={bannerImg}
            alt="banner img is here"
            width={500}
            height={200}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
