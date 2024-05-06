import React, { useEffect, useState } from "react";
import Program from "@/types/program";
import InterestType from "@/types/interest";
import RecommendationAccordion from "./RecommendationAccordion";

interface RecommendationProps {
	selectedInterests: string[];
	loading: boolean;
	setLoading: (isLoading: boolean) => void;
}

export const INIT_NUMBER_OF_RECOMMENDATIONS = 5;

export default function Recommendation({selectedInterests, loading, setLoading}: RecommendationProps) {
	const [recommendedPrograms, setRecommendedPrograms] = useState<Program[]>([]);
  const [shownRecommendations, setShownRecommendations] = useState<number>(INIT_NUMBER_OF_RECOMMENDATIONS);

	const getRecommendations = (): Promise<Program[]> => {
		return new Promise((resolve) => {
		  setTimeout(() => {
			const dummyData: Program[] = [
			  {
				programId: 1,
				programTitle_sv: "Datavetenskap",
				programPoints: 180,
				programDesciption_sv: "AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH JAG VILL HEM NIGHTMARE NIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARENIGHTMARE",
				programLink: "https://example.com/datavetenskap",
				schoolName: "Tekniska Högskolan",
				aiPrompt: "Utveckla framtiden med AI och maskininlärning.",
				degree: "Kandidatexamen"
			  },
			  {
				programId: 2,
				programTitle_sv: "Industriell Ekonomi",
				programPoints: 180,
				programDesciption_sv: "Förbered dig för en karriär som kombinerar teknik och ekonomi.",
				programLink: "https://example.com/industriellekonomi",
				schoolName: "Handelshögskolan",
				aiPrompt: "Brygga teknik med affärsstrategier.",
				degree: "Kandidatexamen"
			  },
			  // Add more dummy programs as needed
			];
	  
			resolve(dummyData);
		  }, 1000); // Simulates a 2-second delay
		});
	};

	useEffect(() => {
		const fetchRecommendations = async () => {
		  if (loading) {
				try {
					const fetchedRecommendations = await getRecommendations();
					setRecommendedPrograms(fetchedRecommendations);
					setLoading(false); // Assuming you want to set loading to false after fetching
				} catch (error) {
					console.error('Failed to fetch recommendations:', error);
					// Handle the error appropriately
					setLoading(false); // Consider setting loading to false even on error to stop loading indicators
				}
		  }
		};
	
		fetchRecommendations();
	}, [loading]); // Include `loading` in the dependency array if its changes should trigger refetching

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
				{loading ? 
					<div className="loadingGIF">
						<img src="../../uniugglan.gif" alt="Waiting on recomendation." />
					</div> :
					<div className="accordionWrapper">
						<RecommendationAccordion recommendations={recommendedPrograms} shownRecommendations={shownRecommendations} />
						{shownRecommendations < recommendedPrograms.length ?
							<button className="interestReq showMoreButton" onClick={handleShowMoreRecommendation}>
								<span>Visa fler program</span>
							</button> :
							<p className="interestReq">Inga fler rekommendationer</p>
						}
					</div>
				}

			</div>
		</div>
	);
};
