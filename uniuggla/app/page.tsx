"use client"; // Makes it so it is on client side instead of server side because of the function components. 
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import TypewriterComponent from "typewriter-effect";

// Main function that returns the html and handles the animations
export default function Home() {
  const router = useRouter();

  const handleYesButtonClick = () => { 
    router.push('/interest_select/');
  };
  const handleNoButtonClick = () => {
    router.push('/about');
  };
  
  // values for js animations
  const speed = 40;
  const delayBetweenGreetigAndQuestion = 1000
  const delayBetweenQuestionAndAnswer = 500
  const greeting = ["Hej!", "greeting", "typewriter", "typewriter_greeting"];
  const moveGreeting = ['1vw', "greetingDiv"];
  const moveQuestion = ['5vw', "questionDiv"];
  const question = ["Vill du gå på högskola eller universitet?", "question", "typewriter", "typewriter_question"];
  const moveAnswer = ['8vw', "answers"]

  // Starting animationn
  useEffect(() => { 
    // Will be used later on.
    // function enableScroll() {
    // window.onscroll = function () { };
    // }
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
    // Canges top margin from inital top margin
    const modifyTopMargin = (newTopMargin: string, htmlClass: string) => {
      var elements = document.querySelectorAll('.' + htmlClass);
      elements.forEach(function(element) {
        (element as HTMLElement).style.marginTop = newTopMargin;
      });
    }
    
    // Canges opacity from inital opacity
    const modifyOpacity = (newOpacity: string, htmlClass: string) => {
      var elements = document.querySelectorAll('.' + htmlClass);
      elements.forEach(function(element) {
        (element as HTMLElement).style.opacity = newOpacity;
      });
    }
    // Funciton for iniatal js animations
    typeWriter(greeting[0], greeting[1]);
    const timeoutId = setTimeout(() => {
      removeParent(greeting[2], greeting[3]);
      modifyTopMargin(moveGreeting[0], moveGreeting[1]);
      modifyTopMargin(moveQuestion[0], moveQuestion[1]);
      typeWriter(question[0], question[1]);
      setTimeout(() => {
        modifyTopMargin(moveAnswer[0], moveAnswer[1]);
        modifyOpacity('1', moveAnswer[1]);
      }, (question[0].length * speed + delayBetweenQuestionAndAnswer)); 
    }, (greeting[0].length * speed + delayBetweenGreetigAndQuestion));

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
      <div className="typewriter typewriter_greeting greetingDiv" style={{marginTop: '10vw'}}>
        <p className="bot greeting"></p>
      </div>
      <div className="typewriter typewriter_question questionDiv" style={{marginTop: '0vw'}}>
        <p className="bot question"></p>
      </div>
      <div className="answers" style={{marginTop: '100vw', opacity: '0'}}>
        <button className="yesButton answerButton" onClick={handleYesButtonClick}>
          <p className="user">Ja</p>
        </button>
        <button className="noButton answerButton" onClick={handleNoButtonClick}>
          <p className="user">Nej</p>
        </button>
      </div>
    </main>
  );
};