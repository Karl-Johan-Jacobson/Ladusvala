import Typewriter from "typewriter-effect/dist/core";
import { modifyTopPadding, modifyTopPaddingRelative } from "@/app/utils";

export function TypewriterForTitle(text, htmlClass) {
	var charDelay = 70;
	var brDelay = 300;
	var time = 0;

	var apps = document.getElementsByClassName(htmlClass);
	var app = apps[0];
	var typewriter = new Typewriter(app, {
		delay: charDelay,
	});

	var splitText = text.split("<br />");
	console.log(text.length);
	for (var i = 0; i < splitText.length; i++) {
		if (i != splitText.length - 1) {
			splitText[i] += "<br />";
			time += brDelay;
		}
		typewriter.pauseFor(brDelay).typeString(splitText[i]).start();
		time += charDelay * splitText[i].length;

		if (i != splitText.length - 1) {
			typewriter.callFunction(function () {
				modifyTopPaddingRelative("-1.5em", htmlClass);
			});
		}
	}
	console.log(time);
	return time;
}