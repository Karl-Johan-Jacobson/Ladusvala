const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
//   "type": "commonjs", i package.json för scrape

let titleReturn = {
	programTitle_sv: "",
	programPoints: "",
	programDescription_sv: "",
	programLink: "",
	programId: "",
	schoolName: "",
};

// Take list of urls as arg and parse, will make ID work better.
async function scrapeLund(url, programId, schoolName) {
	await new Promise((r) => setTimeout(r, 1000));
	request(url, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			const titleBody = $(".layout__region--main"); // class ref
			const title = titleBody.find("h1").text().trim();
			titleReturn.programTitle_sv = title;

			const hpBody = $(".field__kicker");
			const hp = hpBody.first().text().trim(); 


			const shortDescBody = $(".lubas-info__description p");
			const shortDesc = shortDescBody.first().text().trim(); // Holds short desciption of program

			console.log("title: " + title + "\n");
			console.log("HP: " + hp + "\n");
			console.log("shortDesc: " + shortDesc + "\n");

			let programInfoItems = [];
			programInfoItems = hp.split("·");
			console.log("after split:" + programInfoItems);
			const regex = /\d+/g;

			const num = programInfoItems[0].match(regex);
			console.log("HP TO DB: " + num[0]);

			titleReturn.programTitle_sv = title;
			titleReturn.programPoints = num[0];
			titleReturn.programDescription_sv = shortDesc;
			titleReturn.programLink = url;
			titleReturn.programId = programId;
			titleReturn.schoolName = schoolName;

			console.log("titleReturn: " + titleReturn);
		} else {
			console.log("ERROR CONNECTING:" + error);
			titleReturn.programLink = "ERROR: " + response.statuscode + " AT:  " + url;
			titleReturn.programId = programId;
			titleReturn.schoolName = schoolName;
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
//scrapeLund("https://www.lu.se/lubas/i-uoh-lu-HGJAP");
module.exports = scrapeLund;
