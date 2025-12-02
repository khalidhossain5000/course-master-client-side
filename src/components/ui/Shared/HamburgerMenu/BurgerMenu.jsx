"use client";
import React, { useState } from "react";
import { X, Menu, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const BurgerMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Framer Motion Variants
  const overlayVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <button
        className=" p-2 relative z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <X className="w-8 h-8 md:w-9 md:h-9 text-primary" />
        ) : (
          <Menu className="w-8 h-8 md:w-9 md:h-9 text-primary cursor-pointer" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay Background */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sliding Menu */}
            <motion.div
              className="fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-[#fcfff2] dark:bg-primary z-50 flex flex-col justify-between p-6 gap-6 shadow-2xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              transition={{ type: "tween", duration: 0.4 }}
            >
              <div className="flex flex-col gap-3">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.path}
                    className="text-lg font-medium text-gray-800 dark:text-white hover:text-primary transition-colors duration-200"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 300,
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {/* Login Button */}
                <Link href={"/auth/login"}>
                  <button className="group font-poppins md:text-lg text-text-primary hover:text-white bg-transparent border rounded-[30px] border-primary px-3 py-2 md:px-5 md:py-3 whitespace-nowrap flex items-center gap-2 overflow-hidden relative transition-all duration-300 cursor-pointer">
                    <span className="relative z-10 flex items-center md:gap-2 font-medium md:font-bold">
                      Login
                      {/* Normal icon */}
                      <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1" />
                    </span>

                    {/* Background overlay */}
                    <span className="absolute inset-0 bg-primary rounded-[30px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                </Link>

                {/* Register Button */}
                <Link href={"/auth/register"}>
                  <button className="group font-poppins md:text-lg text-text-primary hover:text-white bg-accent rounded-[30px]  px-3 py-2 md:px-5 md:py-3 whitespace-nowrap flex items-center gap-2 overflow-hidden relative transition-all duration-300 cursor-pointer">
                    <span className="relative z-10 flex items-center  md:gap-2 font-medium md:font-bold">
                      Register
                      {/* Normal icon */}
                      <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1" />
                    </span>

                    {/* Background overlay */}
                    <span className="absolute inset-0 bg-primary rounded-[30px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* auth items here */}
    </div>
  );
};

export default BurgerMenu;
