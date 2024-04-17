"use client"; // Makes it so it is on client side instead of server side because of the function components. 
import Image from "next/image";
import { useState, useEffect } from 'react';
  // Main function that returns the html and handles the typewriter animation code 
  const Home: React.FC = () => {
    const speed = 50;
    const greeting = ["Hej!", "greeting", "typewriter", "typewriter_greeting"];
    const question = ["Vill du gå på högskola eller universitet?", "question", "typewriter", "typewriter_question"];
  // Starting animationn
  useEffect(() => {
    let typeWriterInterval: ReturnType<typeof setInterval> | undefined;
    // Typewriteranimationn input string and class of <p> element
    const typeWriter = (textToType: string, htmlClass: string) => {
      let i = 0;
      const elements = document.getElementsByClassName(htmlClass);
      const element = elements[0] as HTMLElement;
      if (element) {
        if (typeWriterInterval) {
          clearInterval(typeWriterInterval);
        }
        typeWriterInterval = setInterval(() => {
          if (i < textToType.length) {
            element.innerHTML += textToType.charAt(i);
            i++;
          } else {
            clearInterval(typeWriterInterval);
          }
        }, speed);
      }
    };
    // Removes parents classes to remove css annimation on parent <div>
    const removeParent = (htmlParenntClass: string, htmlClassRemove: string) => {
      const parentElements = document.getElementsByClassName(htmlParenntClass)
      const parentElement = parentElements[0] as HTMLElement;
      parentElement.classList.remove(htmlClassRemove);
    }
    // Funciton fro iniatal js animations
    typeWriter(greeting[0], greeting[1]);
    const timeoutId = setTimeout(() => {
      removeParent(greeting[2], greeting[3]);
      typeWriter(question[0], question[1]);
    }, (greeting[0].length * speed + 1500));

    return () => {
      if (typeWriterInterval) {
        clearInterval(typeWriterInterval);
      }
      clearTimeout(timeoutId);
    };
  }, []);
  // HTML code, within <main>
  return (
    <main>
      <header>
        <img src="../../uniu_logo_filled.svg" alt="Logo"/> 
      </header>
      <div className="body">
        <div className="typewriter typewriter_greeting">
          <p className="bot greeting"></p>
        </div>
        <div className="typewriter typewriter_question">
          <p className="bot question"></p>
        </div>
        <div className="universityForYou">
          <button className="yesButton"><p className="user">Ja</p></button>
          <button className="noButton"><p className="user">Nej</p></button>
        </div>
      </div>
  
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
    </main>
  );
}

export default Home;
