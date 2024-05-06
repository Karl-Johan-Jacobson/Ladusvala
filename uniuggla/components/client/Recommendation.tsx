import React from "react";

export default function Recommendation() {
	return (
		<div id="recommmendation" className="wrapper recommmendationWrapper recommmendation">
			<p className="bot titleTypewriter recommmendationText" style={{ paddingTop: "10vh" }}></p>
			<div className="recommendedWrapper">
				<div className="loadingGIF">
					<img src="../../uniugglan.gif" alt="Waiting on recomendation." />
				</div>
			</div>
		</div>
	);
};
