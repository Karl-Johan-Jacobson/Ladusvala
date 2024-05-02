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
    <nav className="hamburger-nav">
      <div className="hamburger-icon" onClick={toggleDropdown}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      
      {isOpen && (
        <ul className="dropdown-menu">
          <li><a href="/">Hitta program</a></li>
          <li><a href="/">Se behörighetskrav</a></li>
          <li><a href="/">Beräkna antagningspoäng</a></li>
          <li><a href="/about">Om oss</a></li>
        </ul>
      )}
    </nav>
  );
};

export default HamburgerNavigationBar;
