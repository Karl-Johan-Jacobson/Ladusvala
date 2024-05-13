// Footer component
"use client";
import React, { useState, useEffect } from 'react';
import HamburgerNavigationBar from "@/components/client/HamburgerNavigationBar";

export default function Footer() {
    const [isWide, setIsWide] = useState(window.innerWidth > 480);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsWide(window.innerWidth > 480);
            if (window.innerWidth > 480) {
                setIsOpen(false); // Close the menu when resizing to a wide view
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <footer>
            {isWide ? (
                <>
                    <div className="footerLine"></div>
                    <div className="footerLeft">
                        <div className="footerListDiv">
                            <ul className="footerList">
                                <li><a href="/" className="siteNavigation">Hitta program</a></li>
                                <li><a href="/count" className="siteNavigation">Räkna antagningspoäng</a></li>
                                <li><a href="/about" className="siteNavigation">Om oss</a></li>
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <div className={`footerLine ${isOpen ? "footerLineAnimDown" : "footerLineAnimUp"}`}>
                    <HamburgerNavigationBar onToggle={toggleMenu} isOpen={isOpen} />
                </div>
            )}
            <div className="footerLogoDiv">
                <a href='/'>
                <p>UNIU</p>
                </a>
            </div>
        </footer>
    );
}
