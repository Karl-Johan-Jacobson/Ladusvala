import Typewriter from "typewriter-effect/dist/core";

export async function MobileTypewriterForTitle(text, htmlClass, moveAfter) {
  var charDelay = 70;
  var brDelay = 300;

  var apps = document.getElementsByClassName(htmlClass);
  var app = apps[0];
  app.style.transition = "transform 0.5s ease-in-out"; // Apply a smooth transition effect
  app.style.transform = "translateY(0)"; // Start at the original position

  var typewriter = new Typewriter(app, {
    delay: charDelay,
  });

  var splitText = text.split("<br />");
  for (let i = 0; i < splitText.length; i++) {
    if (i !== splitText.length - 1) {
      splitText[i] += "<br />";
    }
    typewriter.pauseFor(brDelay).typeString(splitText[i]);

    if (i !== splitText.length - 1) {
      typewriter.callFunction(() => {
        app.style.transform = `translateY(${-(i + 1) * 1.5}em)`; // Move up gradually with each line
      });
    }
  }

  typewriter.start();

  await sleep(10000); // Wait for 10 seconds after the typing finishes
  animateOutOfScreen(app); // Animate the text out of the screen directly.
  //await animateOtherElements(htmlClass); // Animate all other elements upward with a staggered effect

  return charDelay * text.length + brDelay * splitText.length + 10000; // Return the computed time
}

function animateOutOfScreen(element) {
  element.style.transform = "translateY(-100%)"; // Move the element up and out of view smoothly
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animateOtherElements(htmlClass) {
  const allElements = document.body.querySelectorAll(
    "*:not(." + htmlClass + ")"
  );

  // Calculate the total height of the document
  const documentHeight = document.body.clientHeight;

  allElements.forEach((el, idx) => {
    // Calculate the element's position relative to the document height
    const elementPosition = el.getBoundingClientRect().top;
    const moveRatio = elementPosition / documentHeight;

    // Move the element up proportionally
    el.style.transition = "transform 0.5s ease-in-out";
    el.style.transform = `translateY(-${moveRatio * 20}vw)`;
  });

  // Wait for the last animation to complete
  return new Promise((resolve) => setTimeout(resolve, 500));
}