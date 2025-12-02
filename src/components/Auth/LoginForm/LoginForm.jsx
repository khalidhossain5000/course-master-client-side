"use client";
import React from "react";
import { motion } from "framer-motion";
import shapei from "../../../assets/Auth/bg-shape/shape1.png";
import shapeii from "../../../assets/Auth/bg-shape/shape2.png";
import shapeiii from "../../../assets/Auth/bg-shape/shape3.png";
import shapeiv from "../../../assets/Auth/bg-shape/shape4.png";
import shapev from "../../../assets/Auth/bg-shape/shape5.png";
import loginImage from "../../../assets/Auth/account-img.png";
import Image from "next/image";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="">
      <div className="bg-[#f3f9ff] dark:bg-primary py-12 lg:py-20 xl:py-[120px]">
        <div className="relative container mx-auto">
          <h2 className="text-center text-text-primary text-2xl lg:text-3xl xl:text-5xl font-bold font-montserrat">
            Sign In
          </h2>

          {/* Animated Shapes */}
          <motion.img
            src={shapei.src}
            alt="shape1"
            className="absolute top-0 lg:top-12 left-0 w-5 lg:w-16"
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          />
          <motion.img
            src={shapeii.src}
            alt="shape2"
            className="absolute -top-22 left-20 w-14"
            animate={{ x: [10, 100, 0] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.img
            src={shapeiii.src}
            alt="shape3"
            className="absolute bottom-0 xl:bottom-22 right-12 xl:right-96 w-12 lg:w-20"
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.img
            src={shapeiv.src}
            alt="shape4"
            className="absolute top-10 right-16 "
            animate={{ x: [0, -15, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.img
            src={shapev.src}
            alt="shape5"
            className="absolute right-96 top-20 hidden lg:block"
            animate={{ y: [0, -5, 0], x: [0, 155, 0] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
      {/* login form and banner */}
      <div className="max-w-7xl mx-auto lg:flex items-center justify-center gap-12 py-22">
        <div className="bg-[#f3f9ff] flex-1 p-6  rounded-xl shadow-sm h-full">
          <div className="titles mb-12">
            <h2 className="text-text-primary dark:text-text-dark-primary text-xl lg:text-2xl font-medium lg:font-bold mb-2   ">
              Welcome Back!
            </h2>
            <h5 className="text-text-primary dark:text-text-dark-primary text-sm lg:text-lg font-medium">
              Sign in to your account and join us
            </h5>
          </div>
          {/* form */}
         
            <form action="" className="space-y-5">
            {/* Email */}
            <div className="">
              <p className="text-text-primary text-lg font-bold font-poppins mb-5">Enter Your Email Id</p>
              <input
                type="email"
                className="w-full px-4 py-2 bg-white rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter Your Email....."
              />
            </div>

            {/* Password with Icon */}
            <div className="space-y-2">
              <p className="text-text-primary text-lg font-bold font-poppins mb-5">
                Password
              </p>

              <div className="relative">
                <input
                type="email"
                  className="w-full px-4 py-2 bg-white rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter password"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600">
                  <EyeOff size={20} />
                </span>
              </div>
            </div>
            {/* signup */}
            <div className="py-4">
                <h2 className="text-gray-400 font-medium">Don&apos;t have an account? <Link href={`/auth/register`}><span className="text-primary font-bold ml-2">Sign Up</span></Link></h2>
            </div>
            {/* login btn */}
            <button type="submit" className="group font-poppins text-lg text-text-primary hover:text-white bg-accent rounded-[30px]  px-5 py-3 whitespace-nowrap flex items-center gap-2 overflow-hidden relative transition-all duration-300 cursor-pointer">
              <span className="relative z-10 flex items-center gap-2 font-bold">
              Sign In
                {/* Normal icon */}
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1" />
              </span>

              {/* Background overlay */}
              <span className="absolute inset-0 bg-primary rounded-[30px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
            </button>
            </form>
        
        </div>
        {/* image  */}
        <div className="hidden lg:block flex-1 relative">
         <motion.div
         animate={{ y: [0,100,0] ,x:[0,-55,0]} }
         transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
         >
             <Image
            src={loginImage}
            alt="login page image banner"
            width={900}
            height={100}
            className="h-full"
          />
         </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
