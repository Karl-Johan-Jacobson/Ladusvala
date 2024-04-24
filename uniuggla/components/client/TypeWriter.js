import Typewriter from "typewriter-effect/dist/core";


export function typewriterTest() {

	var apps = document.getElementsByClassName("tempTypewriter");
    var app = apps[0];
	var typewriter = new Typewriter(app, {
		loop: false,
		delay: 75,
	});

	typewriter
		.pauseFor(1000)
		.typeString("Jag är en AI och jag<br /> rekommenderar this")
		.start();
}
