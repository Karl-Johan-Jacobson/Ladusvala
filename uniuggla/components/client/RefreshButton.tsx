import React, { useState } from "react";

interface RefreshProps {
	imgSource: string;
	altText: string;
	refresh: () => void; // Function to run when button is clicked, passed from parent
}

const RefreshButton: React.FC<RefreshProps> = ({ imgSource, altText, refresh }) => {
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const handleRefresh = () => {
		setIsClicked(!isClicked);
		refresh();
	};

	return (
		<div className="buttonInputWrapper">
			<button onClick={handleRefresh} className="buttonInput refreshButton" type="button">
				<img className="buttonInputImg" src={imgSource} alt={altText} />
			</button>
		</div>
	);
};

export default RefreshButton;
