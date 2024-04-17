'use client'


import { useState } from "react";
import { NextPage } from "next";
import "../globals.css";
import "./programRecommendations.css";
import { fetchAllInterests } from "@/firebase/firebaseHandler";
import { DocumentData } from "@firebase/firestore";
import { handleButtonClick } from "./buttonLogic";

const ProgramRecommendations: NextPage = () => {
    const text = "UniU-GPT";
    const [userInput, setUserInput] = useState<string>("");
    const[message, setMessage] = useState<string>("");

    const handleButton = () => {
        setMessage(userInput);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
        
    };

    return (
        <div className="container">
            <h1>
                <div className="styles">
                    Welcome!
                    <p>
                        {text}
                    </p>
                </div>
            </h1>
            <h2>
                <button className="button" id="send" onClick={handleButton}>Click me</button>
                <form>
                    <label htmlFor="textfield"></label>
                    <input 
                        type="text" 
                        id="textfield" 
                        name="textfield" 
                        value={userInput}
                        onChange={handleInputChange}
                    ></input>
                </form>
            </h2>
            <div className="userInputScreen">
                <div className = "userInput">
                        <p>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProgramRecommendations;
