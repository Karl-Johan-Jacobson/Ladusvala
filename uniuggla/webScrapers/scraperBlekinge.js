const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
//   "type": "commonjs", i package.json för scrape

let titleReturn = { programTitle_sv: "", programPoints: "", programDescription_sv: "", programLink: "", programId: "", schoolName: "" };

// Take list of urls as arg and parse, will make ID work better.
async function scrapeBlekinge(url, programId, schoolName) {
	await new Promise((r) => setTimeout(r, 1000));

	request(url, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			const titleBody = $(".title-bg-image"); // class ref
			const title = titleBody.find("h1").text().trim();
			console.log("TITLE:" + title);
			const hpBody = $(".hpoints");
			const hp = hpBody.first().text().trim(); 
			console.log("HP: " + hp);

			const shortDescBody = $(".Wysiwyg p");
			const shortDesc = shortDescBody.next().next().first().text().trim(); // Holds short desciption of program
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
scrapeBlekinge("https://www.bth.se/utbildning/program-och-kurser/dvasa/");
module.exports = scrapeBlekinge;
