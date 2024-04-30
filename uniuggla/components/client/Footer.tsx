"use client";
import React, { useState, useEffect } from 'react';
import HamburgerNavigationBar from "@/components/client/HamburgerNavigationBar";
export default function Footer() {
    const [isWide, setIsWide] = useState(window.innerWidth > 480);

    useEffect(() => {
        function handleResize() {
            setIsWide(window.innerWidth > 480);
        }

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <footer>
            <div className="footerLine"></div>
            {isWide &&  (
                <div className="footerLeft">
                    <div className="footerListDiv">
                        <ul className="footerList">
                            <li>
                                <a href="/" className="siteNavigation">
                                    Hitta program
                                </a>
                            </li>
                            <li>
                                <a href="/count" className="siteNavigation">
                                    Räkna antagningspoäng
                                </a>
                            </li>
                            <li>
                                <a href="/req" className="siteNavigation">
                                    Se behörighetskrav
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="siteNavigation">
                                    Om oss
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )	
		}
            <div className="footerLogoDiv">
                <p> UNIU </p>
            </div>
        </footer>
    );
}
