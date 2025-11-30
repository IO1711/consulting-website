import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

  const TabButton = ({ tab }) => {

    return (
    <NavLink
      to={`/adminPage/${tab.key}`}
      className={({isActive}) => (isActive ? 
        "px-4 py-2 rounded-full text-sm md:text-base transition bg-[#04322f] text-[#fffef8] shadow"
        : "px-4 py-2 rounded-full text-sm md:text-base transition text-[#04322f] hover:bg-[#04322f14]"
      )}
      end
    >
      {tab.label}
    </NavLink>
  );
}

  export default TabButton;