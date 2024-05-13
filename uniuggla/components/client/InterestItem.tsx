"use client";

import Interest from "@/types/interest";
import { useState } from "react";

interface InterestListItemProps {
	interest: Interest;
	isSelected: boolean;
	isDisabled: boolean;
	updateParent: (interest: Interest, isMounted: boolean) => void;
}

export default function InterestListItem({ interest, isSelected, isDisabled, updateParent }: InterestListItemProps) {
	const [isMounted, setIsMounted] = useState<boolean>(true);

	// This function is called when an animation has ended, i.e when the component has either faded in or out
	const handleParentUpdate = () => {
		// We only want to update the parent when the component is unmounted, i.e. should be removed
		if (!isMounted) {
			updateParent(interest, isMounted);
		}
	};

	const handleClick = () => {
		// The state of an unmounted components shouldn't be able to change
		if (isMounted) {
			setIsMounted(!isMounted);
		}
	};

	return (
		<div className="interestItem">
			{isSelected ? (
			<button
				onClick={handleClick}
				disabled={isDisabled}
				className={`selectedButton ${isMounted ? "fadeInSelected" : "fadeOut"}`}
				onAnimationEnd={handleParentUpdate}>
				<span className="iconText">{interest.interestTitle}</span>
			</button>
			) : (
			<button
				onClick={handleClick}
				disabled={isDisabled}
				onAnimationEnd={handleParentUpdate}
				className={`${isDisabled ? "disabledNotSelectedButton" : "notSelectedButton"} ${isMounted ? "fadeInNew" : "fadeOut"}`}>
				<span className="iconText">{interest.interestTitle}</span>
			</button>
			)}
		</div>
	);
}
