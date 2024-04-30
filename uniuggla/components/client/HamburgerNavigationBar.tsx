// components/HamburgerNavigationBar.js

import React, { useState } from 'react';

const HamburgerNavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log("TOGGLE HAMBURGER MENU!!!!!!!!!!!!!!")
  };

  return (
    <nav className={isOpen ? "hamburger-nav hamburgerSomehting": "hamburger-nav"}>
      {/* Hamburger icon to toggle dropdown */}
      <div className="hamburger-icon" onClick={toggleDropdown}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      
      {/* Dropdown menu */}
      {isOpen && (
        <ul className="dropdown-menu">
          <li><a href="/">Hitta program</a></li>
          <li><a href="/">Se behörighetskrav</a></li>
          <li><a href="/">Beräkna antagningspoäng</a></li>
          <li><a href="/about">Om oss</a></li>
          {/* Add more links as needed */}
        </ul>
      )}
    </nav>
  );
};

export default HamburgerNavigationBar;
