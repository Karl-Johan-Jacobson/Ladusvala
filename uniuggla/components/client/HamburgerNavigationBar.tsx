// components/HamburgerNavigationBar.tsx

import React from 'react';

// Define the interface for the component props
interface HamburgerNavigationBarProps {
  onToggle: () => void; // Function that doesn't take parameters and returns void
  isOpen: boolean;     // Boolean state
}

const HamburgerNavigationBar: React.FC<HamburgerNavigationBarProps> = ({ onToggle, isOpen }) => {
  const toggleDropdown = () => {
    onToggle(); // Call the function passed from the parent component
  };

  return (
    <>
      <img className="hamburger-icon" src="../../hamburger.svg" alt="" onClick={toggleDropdown}/>
      {isOpen && (
        <ul className="dropdown-menu">
          <li><a href="/">Hitta program</a></li>
          <li><a href="/cou">Se behörighetskrav</a></li>
          <li><a href="/">Beräkna antagningspoäng</a></li>
          <li><a href="/about">Om oss</a></li>
        </ul>
      )}
    </>
  );
};

export default HamburgerNavigationBar;
