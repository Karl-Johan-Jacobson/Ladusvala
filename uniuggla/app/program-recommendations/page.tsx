'use client'

import { useState } from "react";
import { NextPage } from "next";
import "../globals.css";
import "./programRecommendations.css";
import recommendProgramFromInterest from "@/ai/AiHandler";
import * as dotenv from "dotenv";
dotenv.config();


const ProgramRecommendations:  NextPage = () => {
    const text = "UniU-GPT";
    const [message, setMessage] = useState<string>("");

    let aiAnswer : string = "";

    //activate the typewriter
    async function handleButton () {
        console.log("Clicked")
        setMessage("");
        aiAnswer = await recommendProgramFromInterest()
        typewriter(aiAnswer, 50);
    };

    const typewriter = (text: string, speed: number) => {
        let index = 0;
        const intervalId = setInterval(() => {
            const char = text.charAt(index);
            setMessage(prevMessage => {
                // Add character to message if it's not a line break
                if (char !== '\n') return prevMessage + char;
                // If it's a line break, append a line break to the message
                else return prevMessage + '';
            });
            index++;
            if (index === text.length) clearInterval(intervalId); // Clear the interval after all characters are appended
        }, speed);
    };


    return (
        <div className="container">
            <h1>
                <div className="styles">
                    Welcome!
                    <p>{text}</p>
                </div>
            </h1>

            <div className="userInputScreen">
                <div className="userInput">
                    <p>{message}</p>
                </div>
            </div>

            <h2>
                <button className="button" id="send" onClick={handleButton}>Get recommendations!</button>
            </h2>
        </div>
    );
};

export default ProgramRecommendations;
