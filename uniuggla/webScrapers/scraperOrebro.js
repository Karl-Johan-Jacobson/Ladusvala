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
async function scrapeOrebro(url, programId, schoolName) {
	await new Promise((r) => setTimeout(r, 1000));

	request(url, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			const titleBody = $(".main-article h1"); // class ref
			const titleFind = titleBody.first().text().trim();

			// Regex to find and exclude the hp points from the title
			const regexRemoveHp = /,\s*\d+ hp/g;
			const titleOnly = titleFind.replace(regexRemoveHp, ""); // Remove hp points from the title

			console.log("TITLE:" + titleOnly);

			const hp = titleFind.trim();

			console.log("HP: " + hp);

			const shortDescBody = $(".col-sm-12 p");
			const shortDesc = shortDescBody.first().text().trim(); 
			console.log("Short Desc: " + shortDesc);

			let hpItems = [];
			hpItems = hp.split("·");
			const regex = /\d+/g;

			const num = hpItems[0].match(regex);
			console.log("HPNUM TO DB: " + num[0]);

			titleReturn.programTitle_sv = titleOnly;
			titleReturn.programPoints = num[0];
			titleReturn.programDescription_sv = shortDesc;
			titleReturn.programLink = url;
			titleReturn.programId = programId;
			titleReturn.schoolName = schoolName;
		} else {
			console.log("ERROR CONNECTING:" + error + response.statusCode);
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
/*scrapeOrebro(
  "https://www.oru.se/utbildning/program/analysvetenskapligt-program-i-kemi-med-inriktning-mot-forensik/"
);*/
module.exports = scrapeOrebro;
