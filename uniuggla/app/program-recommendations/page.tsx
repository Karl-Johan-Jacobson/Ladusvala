import { NextPage } from "next";
import "../globals.css";
import "./programRecommendations.css";
import { fetchAllInterests } from "@/firebase/firebaseHandler";
import { DocumentData } from "@firebase/firestore";
import { buttonLogic } from "./buttonLogic";

export default async function ProgramRecommendations(){
    let text : string  = "fotboll \n programmering \n ";

    //console.log(interests);
    return(
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
            <button className="button" id="send" onClick={buttonLogic}></button>
            <form>
            <label htmlFor="textfield">Enter text:</label>
            <input type="text" id="textfield" name="textfield"></input>
            </form>
            </h2>
            <script src="buttonLogic.js"
>
            </script>
        </div>

    );
};


