//import { fetchAllInterests } from "@/firebase/firebaseHandler";
//import { DocumentData } from "@firebase/firestore";

let index: number = 0;

const typeWriterElement = document.getElementById("typewriter");

let text : string  = "fotboll \n programmering \n ";

export function typeWriter(){
    if(index < text.length && typeWriterElement != null){
        typeWriterElement.innerHTML += `<span style="color: red;">${text.charAt(index)}</span>`
        typeWriterElement.textContent += text.charAt(index);
        index++;

        setTimeout(typeWriter, 100);
    }

}



/*async function fetchFromFirebase(){

    const interests : DocumentData[] = await fetchAllInterests();
    const interestsString : string[] = interests.map((doc) => {
        
        return doc.interestTitle + "\n";
    })
    if(interestsString != null)
    {
        for(let i = 0; i < interestsString.length; i++)
        {
            text += interestsString[i];
        }
    }
    
    typeWriter();
}*/

typeWriter();