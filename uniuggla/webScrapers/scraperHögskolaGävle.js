const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
//   "type": "commonjs", i package.json för scrape

let titleReturn = { programTitle_sv: "", programPoints: "", programDescription_sv: "", programLink: "", programId: "", schoolName: "" };

// Take list of urls as arg and parse, will make ID work better.
async function scrapeHIG(url, programId, schoolName) {
	await new Promise((r) => setTimeout(r, 1000));

	headers = {
		// Can now scrape Uppsala by manually adding "User-Agent" and "Cookie" copy-pasted from website manually.
		"User-Agent": "asd",
		Cookie:"asd",
	};
	request({ url, headers }, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			const fullTitle = $('[data-cid="12.41f70d8418df29f29d71e39c"]').find("h1").text().trim(); // Use a more specific selector if available
			// Regex to capture the title without comma and hp separately
			const titleRegex = /(.+?),?\s?(\d+)\s*hp/;
			const matches = fullTitle.match(titleRegex);
			const title = matches && matches[1] ? matches[1].trim() : "Unknown Title";
			const hp = matches && matches[2] ? matches[2].trim() : "Unknown HP";

			console.log("TITLE:", title);
			console.log("HP:", hp);

			const shortDescBody = $(".sv-text-portlet-content");
			const shortDesc = shortDescBody.find("p").first().text().trim(); // Holds short desciption of program
			console.log("Short Desc: " + shortDesc);

			let hpItems = [];
			hpItems = hp.split("·");
			console.log("after split:" + hpItems);
			const regex = /\d+/g;

			const num = hpItems[0].match(regex);
			console.log(num[0]);

			titleReturn.programTitle_sv = title;
			titleReturn.programPoints = num[0];
			titleReturn.programDescription_sv = shortDesc;
			titleReturn.programLink = url;
			titleReturn.programId = programId;
			titleReturn.schoolName = schoolName;

			//console.log(titleFinal);
			//console.log("titleReturn: "+titleReturn);
		} else {
			console.log("ERROR CONNECTING:" + error + response.statusCode);
		}

		fs.appendFile("test.json", JSON.stringify(titleReturn, null, 2) + "," + "\n", (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log("Successfully written data to file");
		});

		//programId_sv|programUniversity_sv|programTitle_sv|programDescription_sv|programPoints_sv|programYears_sv|programRequirements_sv|programAiDescription_sv|programPlace_sv|programDegree_sv|programLink
	});
}
//scrapeHIG("https://www.hig.se/utbildning/intresseomraden-och-program/hogskoleingenjor/automationsingenjor-co-op-180-hp");
module.exports = scrapeHIG;
