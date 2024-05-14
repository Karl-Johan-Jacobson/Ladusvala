import { ChangeEvent, FormEvent, useState } from "react";

interface RefreshProps {
    imgSource: string;
    altText: string;
    isDisabled: boolean;
    onSubmit: (input: string) => void; // Function to run when button is clicked, passed from parent
}

export default function TextInterestInput({ imgSource, altText, onSubmit, isDisabled }: RefreshProps) {
    const [inputValue, setInputValue] = useState<string>("");

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
 
        if (!inputValue.trim() || inputValue.trim().length === 1) {
            return; 
        }

        onSubmit(inputValue.trim()); 
        setInputValue(""); 
    };

    return (
        <form onSubmit={handleSubmit} className="textInputWrapper">
            <input disabled={isDisabled} placeholder="Skriv in ett intresse..." type="text" value={inputValue} onChange={handleValueChange} required className="textInput" />
            <button title="Lägg till intresset!" type="submit" className="textButton">
                <img className="textButtonImg" src={imgSource} alt={altText} />
            </button>
        </form>
    );
}
