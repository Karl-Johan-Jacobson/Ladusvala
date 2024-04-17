'use client'

import { useState } from "react";
import { NextPage } from "next";
import "../globals.css";
import "./programRecommendations.css";
import recommendProgramFromInterest from "@/ai/AiHandler";


//Page for DEMO to show that ai can recommend programs
const ProgramRecommendations:  NextPage = () => {
    const text = "UniU-GPT";
    //Used to updated ai messages on the screen
    const [message, setMessage] = useState<string>("");

    //ai answer that will be updated 
    let aiAnswer : string = "";

    //activate the typewriter
    //Make request to AI when button is clicked
    async function handleButton () {
        console.log("Clicked")
        setMessage("");
        aiAnswer = await recommendProgramFromInterest()
        typewriter(aiAnswer, 50);
    };
    //Function to write the text out one character at a time
    const typewriter = (text: string, speed: number) => {
        let index = 0;
        const intervalId = setInterval(() => {
            const char = text.charAt(index);
            setMessage(prevMessage => prevMessage + char);
            index++;
            if (index === text.length) clearInterval(intervalId); // Clear the interval after all characters are appended
        }, speed);
    };



    //HTML code
    return (
        <div className="container">
            <h1 className="styles">Welcome!</h1>
            <p className="styles">{text}</p>
            
            <div className="userInputScreen"> 
                <div className="userInput">
                    {message.split('\n').map((line, index) => (
                        <p key={index}>
                            {line}
                            <br />
                            <br />
                            </p>
                    ))}
                </div>
            </div>
    
            <button className="button" id="send" onClick={handleButton}>Get recommendations!</button>
        </div>
    );
};

export default ProgramRecommendations;
