import Typewriter from "typewriter-effect/dist/core";
import { addClass, modifyTopPaddingRelative, modifyTop, modifyHeight, modifyHeightRelative } from "@/app/utils";

export function TypewriterForTitle(text, htmlClass, moveAfter, removeAfter) {
	var charDelay = 70;
	var brDelay = 300;
	var time = 0;

	var elements = document.getElementsByClassName(htmlClass);
	var element = elements[0];
	var typewriter = new Typewriter(element, {
		delay: charDelay,
	});

	var splitText = text.split("<br />");
	var i = 0;
	for (i = 0; i < splitText.length; i++) {
		if (i != splitText.length - 1) {
			splitText[i] += "<br />";
			time += brDelay;
		}
		typewriter.pauseFor(brDelay).typeString(splitText[i]).start();
		time += charDelay * splitText[i].length;

		if (i != splitText.length - 1) {
			typewriter.callFunction(function () {
				modifyTopPaddingRelative("-1.5em", htmlClass);
				modifyHeightRelative("1.5em", htmlClass);
			});
		}
	}
	if (moveAfter && !removeAfter && i != splitText.length - 1) {
		typewriter.callFunction(function () {
			modifyTopPaddingRelative("-1.5em", htmlClass);
		});
	} else if (moveAfter && removeAfter) {
		typewriter.callFunction(function () {
			var currentHeight = "-" + window.getComputedStyle(element).height;
			modifyTop(currentHeight, htmlClass);
			modifyHeight("0", htmlClass);
		});
		typewriter.callFunction(function () {
			setTimeout( () => {addClass("hide", htmlClass);}, 100 );
		});
	}
	return time;
}
