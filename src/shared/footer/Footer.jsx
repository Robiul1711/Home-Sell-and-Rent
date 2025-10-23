import React from "react";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Hide footer on /map route
  if (pathname === "/map") return null;

  return (
    <footer
      className={`py-10 section-padding-x text-[#ffffffcc]`}
      style={{
        background: "linear-gradient(180deg, #B0C2CA 0%, #A6C1CD 100%)",
      }}
    >
      {/* Top Section */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-6  "
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Logo */}
        <motion.h2
          variants={item}
          className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
        >
          KOANO
        </motion.h2>

        {/* Navigation */}
        <motion.nav
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm sm:text-base text-white/90"
        >
          {["Home", "About Us", "Clients", "Approach", "Contact Us"].map(
            (itemText, index) => (
              <a
                key={index}
                href="#"
                className="hover:text-white transition-colors"
              >
                {itemText}
              </a>
            )
          )}
        </motion.nav>

        {/* Social Icons */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 sm:gap-4 mt-4 md:mt-0"
        >
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="w-9 h-9 rounded-full bg-[#1b2a35] flex items-center justify-center hover:opacity-80 transition-all"
          >
            <FaEnvelope className="text-white text-sm sm:text-base" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-all"
          >
            <FaLinkedinIn className="text-[#1b2a35] text-sm sm:text-base" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Divider Section */}
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="border-t border-white/30 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-sm sm:text-base text-white/80"
      >
        <p className="mb-2 md:mb-0">Terms & Conditions</p>
        <p>Copyright © 2025 KOANO</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
