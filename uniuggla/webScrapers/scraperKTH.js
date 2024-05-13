const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = { programTitle_sv: "", programPoints: "", programDescription_sv: "", programLink: "", programId: "" };

// Take list of urls as arg and parse, will make ID work better.
async function scrapeKTH(url, programId, schoolName) {
	await new Promise((r) => setTimeout(r, 1000));

	request(url, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			const titleBody = $(".article"); // class ref
			const title = titleBody.find("h1").text().trim(); // title holds name of program
			console.log("TITLE:" + title);

			const hpBody = $(".mt-3");
			const hp = hpBody.text().trim();


			const shortDescBody = $(".lead p");
			const shortDesc = shortDescBody.first().text().trim(); // Holds short desciption of program

			let hpItems = [];
			hpItems = title.split(",");
			const regex = /\d+/g;
			let num;
			if (hpItems.length == 3) {
				num = hpItems[2].match(regex);
				titleReturn.programTitle_sv = hpItems[0] + "," + hpItems[1];
				console.log("IF NUM: " + num);
			} else if (hpItems.length > 3) {
				num = hpItems[3].match(regex);
				titleReturn.programTitle_sv = hpItems[0] + "," + hpItems[1] + "," + hpItems[2];
				console.log("ELSE IF NUM: " + num);
				console.log("ELSE IF title: " + titleReturn.programTitle_sv);
			} else {
				num = hpItems[1].match(regex);
				titleReturn.programTitle_sv = hpItems[0];
				console.log("ELSE NUM: " + num);
			}

			titleReturn.programPoints = num[0];
			titleReturn.programDescription_sv = shortDesc;
			titleReturn.programLink = url;
			titleReturn.programId = programId;
			titleReturn.schoolName = schoolName;
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
scrapeKTH("https://www.kth.se/utbildning/arkitekt/arkitektutbildning");
module.exports = scrapeKTH;
