import React, { useEffect, useRef, useState } from "react";
import Program from "@/types/program";
import InterestType from "@/types/interest";
import RecommendationAccordion from "./RecommendationAccordion";
import { getRecommendationsDummy, getRecommendationsFromAI } from "@/app/utils";

interface RecommendationProps {
	selectedInterests: string[];
	shouldFetch: boolean;
}

export const INIT_NUMBER_OF_RECOMMENDATIONS = 1;

export default function Recommendation({selectedInterests, shouldFetch}: RecommendationProps) {
	const [recommendedPrograms, setRecommendedPrograms] = useState<Program[]>([]);
  const [shownRecommendations, setShownRecommendations] = useState<number>(INIT_NUMBER_OF_RECOMMENDATIONS);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>();

	// const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		const fetchRecommendations = async () => {
		  if (shouldFetch) {
				// To manage race condition, maybe move functionality to AIHandler
				// abortControllerRef.current?.abort();
				// abortControllerRef.current = new AbortController();

				try {
					setIsLoading(true);
					// const response = await getRecommendationsFromAI(selectedInterests, abortControllerRef)
					// https://www.youtube.com/watch?v=00lxm_doFYw
					
					// For AI, fix this to call the AI from here and update the recommended programs
					// getRecommendationsFromAI(selectedInterests); 

					const fetchedRecommendations = await getRecommendationsDummy(); // Dummy function to simulate an API call
					setRecommendedPrograms(fetchedRecommendations);
				} catch (e) {
					setError(e)
				} finally {
					setIsLoading(false);
				}
		  }
		};
	
		fetchRecommendations();
	}, [shouldFetch]); // Include `loading` in the dependency array if its changes should trigger refetching

  const handleShowMoreRecommendation = () => {
		console.log(shownRecommendations);
    if (shownRecommendations >= recommendedPrograms.length) {
      return; // Can't show more interests than the length of the 
    };
    setShownRecommendations(shownRecommendations + 5);
  }
	
	return (
		<div id="recommmendation" className="wrapper recommmendationWrapper recommmendation">
			<p className="bot titleTypewriter recommmendationText" style={{ paddingTop: "10vh" }}></p>
			<div className="recommendedWrapper">
				{isLoading ? (
					<div className="loadingGIF">
						<img src="../../uniugglan.gif" alt="Waiting on recomendation." />
					</div> 
				) : (
					<div className="accordionWrapper">
						<RecommendationAccordion recommendations={recommendedPrograms} shownRecommendations={shownRecommendations} />
						{shownRecommendations < recommendedPrograms.length ? (
							<button className="showMoreButton" onClick={handleShowMoreRecommendation}>
								<span>Tryck på mig för att visa flera rekommenda</span>
							</button> 
						) : (
							<p className="showMoreButton">Inga fler rekommendationer</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
