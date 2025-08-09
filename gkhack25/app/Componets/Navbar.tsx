import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
function Navbar() {
  const children = {
    hidden: {
      clipPath: "polygon(0% 100%,100% 100% ,100% 100%, 0% 100%)",
    },
    show: {
      clipPath: "polygon(0% 0%,100% 0%,100% 100%, 0% 100%)",
      transition: {
        ease: [0.11, 0.325, 0.16, 0.95] as [number, number, number, number],
        duration: 0.6,
      },
    },
    exit: {
      clipPath: "polygon(0% 100%, 100% 100%,100% 100%, 0% 100%)",
      transition: {
        ease: [0.645, 0.045, 0.355, 0.8] as [number, number, number, number],
        duration: 0.6,
      },
    },
  };
  const navLink = {
    hidden: {
      y: "100%",
    },
    show: {
      y: 0,
      transition: {
        ease: "easeOut" as const,
        delay: 0.2,
        duration: 0.4,
      },
    },
    exit: {
      y: "100%",
      transition: {
        ease: "easeOut" as const,
        delay: 0.02,
        duration: 0.3,
      },
    },
  };
  return (
    <div className="w-screen h-screen overflow-hidden fixed inset-0 font-mono z-30">
      <div className="w-full h-full  ">
        <motion.div
          className="w-full h-full bg-white/10 backdrop-blur-sm "
          variants={children}
          initial="hidden"
          animate="show"
          exit="exit"
          custom={0}
        >
          {" "}
        </motion.div>
      </div>
      <section className="w-full h-full absolute inset-0 flex justify-center items-center z-30 p-1 font-dmsans">
        <ul className="w-[900px] leading-none space-y-2">
          <li className="overflow-hidden">
            <motion.div
              variants={navLink}
              initial="hidden"
              animate="show"
              exit="exit"
              className=" p-1"
            >
              <Link
                href={"/"}
                className="text-[40px] md:text-[60px] hover:text-[#eaeaea] h-fit p-1 "
              >
                Home
              </Link>
            </motion.div>
          </li>

          <li className="overflow-hidden">
            <motion.div
              variants={navLink}
              initial="hidden"
              animate="show"
              exit="exit"
              className=" p-1"
            >
              <Link
                href={"/Auth/Login"}
                className="text-[40px] md:text-[60px] hover:text-[#eaeaea] h-fit p-1"
              >
                Log in
              </Link>
            </motion.div>
          </li>
          <li className="overflow-hidden">
            <motion.div
              variants={navLink}
              initial="hidden"
              animate="show"
              exit="exit"
              className=" p-1"
            >
              <Link
                href={"#About"}
                className="text-[40px] md:text-[60px] hover:text-[#eaeaea] h-fit p-1 "
              >
                Contact
              </Link>
            </motion.div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Navbar;
