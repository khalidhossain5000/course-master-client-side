"use client";
import React from "react";
import { motion } from "framer-motion";
import shapei from "../../../assets/Auth/bg-shape/shape1.png";
import shapeii from "../../../assets/Auth/bg-shape/shape2.png";
import shapeiii from "../../../assets/Auth/bg-shape/shape3.png";
import shapeiv from "../../../assets/Auth/bg-shape/shape4.png";
import shapev from "../../../assets/Auth/bg-shape/shape5.png";
const Login = () => {
  return (
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
          animate={{rotate:360 }}
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
  );
};

export default Login;
