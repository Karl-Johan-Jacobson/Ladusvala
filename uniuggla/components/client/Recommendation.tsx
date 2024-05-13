import React, { useEffect, useState } from "react";
import { getRecommendations } from "@/ai/AiHandler";
import ProgramRecommendation from "@/types/ProgramRecommendation";
import RecommendationItemImproved from "./RecommendationItem";

interface RecommendationProps {
	selectedInterests: string[];
	shouldFetch: boolean;
}

export default function Recommendation({selectedInterests, shouldFetch}: RecommendationProps) {
	const [recommendedPrograms, setRecommendedPrograms] = useState<ProgramRecommendation[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>();

	useEffect(() => {
		const fetchRecommendations = async () => {
		  if (shouldFetch) {
				try {
					setIsLoading(true);
					const fetchedRecommendations = await getRecommendations(selectedInterests);
					setRecommendedPrograms(fetchedRecommendations);
				} catch (e) {
					setError(e)
				} finally {
					setIsLoading(false);
				}
		  }
		};
	
		fetchRecommendations();
	}, [shouldFetch]); // Shouldn't have any problems with race condition since shouldFetch is only updated once
	
	return (
		<div id="recommmendation" className="wrapper recommmendationWrapper recommmendation">
			<p className="bot titleTypewriter recommmendationText" style={{ paddingTop: "10vh" }}></p>
			<div className="recommendedWrapper">
				{isLoading ? (
					<div className="loadingGIF">
						<img src="../../uniugglan.gif" alt="Waiting on recomendation." />
					</div>
				) : (
					<div className="recommendationAccordion">
						{recommendedPrograms.map((recommendation, index) => (
							<RecommendationItemImproved
								key={index}
								recommendation={recommendation}
								index={index}
							/>
						))}
					</div>
					)}
			</div>
		</div>
	);
};
