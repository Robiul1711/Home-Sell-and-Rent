import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import PrimaryButton from "@/components/common/PrimaryButton";
import Logo from "@/components/Logo";
import { navLinks } from "@/utils/data";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (link) => {
    setMenuOpen(false); // Close menu on click
    if (link.sectionId) {
      if (location.pathname === "/about-us") {
        scrollToSection(link.sectionId);
      } else {
        navigate(link.path, { state: { scrollTo: link.sectionId } });
      }
    } else {
      navigate(link.path);
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => scrollToSection(id), 400);
    }
  }, [location]);

  return (
    <header className="flex w-full z-[200] sticky top-0 justify-between items-center bg-[#859AA5] backdrop-blur-[8px] section-padding-x py-4 md:py-6">
      {/* Logo */}
      <Link to="/" onClick={() => setMenuOpen(false)}>
        <Logo />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center lg:gap-6 gap-3">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleNavClick(link)}
            className={`lg:text-lg text-base font-semibold transition-all duration-300 lg:px-5 px-2.5 lg:py-2 py-1.5 rounded-lg ${
              location.pathname === link.path && !link.sectionId
                ? "bg-primaryColor text-white"
                : "text-white hover:bg-primaryColor hover:text-white"
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Primary CTA (Desktop only) */}
      <div className="hidden md:block">
        <PrimaryButton name="Join" path="/auth/sign-up" />
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="text-white text-3xl md:hidden"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <IoMdClose /> : <IoMdMenu />}
      </button>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-[72px] left-0 w-full bg-[#859AA5] flex flex-col items-center gap-4 py-6 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleNavClick(link)}
            className="text-lg text-white font-semibold hover:bg-primaryColor rounded-lg px-5 py-2 w-[80%] transition-all duration-300"
          >
            {link.label}
          </button>
        ))}
        <PrimaryButton name="Join" path="/auth/sign-up" />
      </div>
    </header>
  );
};

export default Navbar;
