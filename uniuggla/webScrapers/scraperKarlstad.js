const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = { programTitle_sv: "", programPoints: "", programDescription_sv: "", programLink: "", programId: "", schoolName: "" };

// Take list of urls as arg and parse, will make ID work better.
async function scrapeKarlstad(url, programId, schoolName) {
	await new Promise((r) => setTimeout(r, 1000));
	request(url, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			const titleClass = $(".my0"); // class ref
			const title = titleClass.find("span").text();

			const hpClass = $(".inline-block");
			const hp = hpClass.first().text().trim();

			let hpItems = [];
			hpItems = hp.split("·");
			const regex = /\d+/g;

			const num = hpItems[0].match(regex);
			console.log("HPNUM TO DB: " + num[0]);

			const descriptionClass = $(".mb4");
			const descriptionClass2 = descriptionClass.find(".of-aut");
			const descriptionClass3 = descriptionClass2.find("div").first();

			const description = descriptionClass3.find("div").text().split("\n");

			titleReturn.programTitle_sv = title;
			titleReturn.programPoints = num[0];
			titleReturn.programDescription_sv = description[0];
			titleReturn.programLink = url;
			titleReturn.programId = programId;
			titleReturn.schoolName = schoolName;

			console.log(titleReturn);
		} else {
			console.log(response.statusCode);
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
scrapeKarlstad("https://www.kau.se/utbildning/program-och-kurser/program/NGBIO");
module.exports = scrapeKarlstad;
