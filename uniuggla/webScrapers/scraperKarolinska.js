const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = {
	programId: "",
	programTitle_sv: "",
	programPoints: "",
	programDescription_sv: "",
	programLink: "",
	schoolName: "",
};

// Take list of urls as arg and parse, will make ID work better.
async function scrapeKarolinska(url, programId, schoolName) {
	await new Promise((r) => setTimeout(r, 1000));

	request(url, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			const titleClass = $(".wrapper").first(); // class ref
			const title = titleClass.text().trim().split(" "); 

			const hpClass = $(".item-1").first();
			const hpUnTrimed = hpClass.text();

			const descriptionClass = $(".lead");
			const description = descriptionClass.text().trim();

			let hpItems = [];
			hpItems = hpUnTrimed.split("\n");

			let hp = "";
			hpItems.map((item) => {
				item = item.trim();
				if (item != "") {
					hp += item + " ";
				}
			});
			titleReturn.programTitle_sv = title[0].trim();
			titleReturn.programPoints = hp;
			titleReturn.programDescription_sv = description;
			titleReturn.programLink = url;
			titleReturn.programId = programId;

			console.log(titleReturn);
		} else {
			console.log("ERROR CONNECTING:" + error);
			titleReturn.programLink = url;
			titleReturn.programId = "ERROR: " + response.statusCode;
		}

		fs.appendFile("test.json", JSON.stringify(titleReturn, null, 2) + "," + "\n", (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log("Successfully written data to file");
		});

	});
}
//scrape("https://utbildning.ki.se/program/2la21-lakarprogrammet");
module.exports = scrapeKarolinska;
