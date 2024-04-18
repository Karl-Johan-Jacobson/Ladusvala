import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <header>
        <img src="../../uniu_logo_filled.svg" alt="Logo"/> 
      </header>
        {children}
      <footer>
        <div className="footerLeft">
          <div className="footerLine"></div>
          <div className="footerListDiv">
            <ul className="footerList">
              <li><a href="page"><p className="siteNavigation">Hitta program</p></a></li>
              <li><a href="count"><p className="siteNavigation">Räkna antagningspoäng</p></a></li>
              <li><a href="req"><p className="siteNavigation">Se behörighetskrav</p></a></li>
              <li><a href="about"><p className="siteNavigation">Om oss</p></a></li>
            </ul>
          </div>
        </div>
        <div className="footerLogoDiv">
          <img src="../../text_logo.png" alt="Logo_Text"/> 
        </div>
      </footer> 
      </body>
    </html>
  );
}