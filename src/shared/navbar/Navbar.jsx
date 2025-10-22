import PrimaryButton from "@/components/common/PrimaryButton";
import Logo from "@/components/Logo";
import { navLinks } from "@/utils/data";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className=" flex w-full z-[200] fixed  top-0 justify-between items-center gap-5 bg-[rgba(1,1,1,0.20)] backdrop-blur-[8px] section-padding-x py-6">
        <Link to={`/`}>
          <Logo />
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `text-lg font-semibold transition-all hover:bg-primaryColor rounded-lg cursor-pointer hover:text-white duration-300 px-6 py-3 ${
                  isActive ? "bg-primaryColor text-white" : "text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <PrimaryButton
        name={`Join`}
        path={'/join'}
        />
      </header>
    </>
  );
};

export default Navbar;
