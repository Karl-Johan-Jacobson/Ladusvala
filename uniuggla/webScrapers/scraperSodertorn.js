const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
//   "type": "commonjs", i package.json för scrape

let titleReturn = { programTitle_sv: "", programPoints: "", programDescription_sv: "", programLink: "", programId: "", schoolName: "" };

// Take list of urls as arg and parse, will make ID work better.
async function scrapeSodertorn(url, programId, schoolName) {
	await new Promise((r) => setTimeout(r, 1000));

	request(url, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			const titleBody = $(".sh-course-page-info"); 
			const title = titleBody.find("h1").text().trim();
			//titleReturn.programTitle_sv = title;
			console.log("TITLE:" + title);
			const hpBody = $(".sh-course-page-info__right p");
			const hp = hpBody.first().text().trim(); 

			console.log("HP: " + hp);

			const shortDescBody = $(".sv-text-portlet-content p");
			const shortDesc = shortDescBody.first().text().trim(); 
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
// NOTE: Get the URL for respective "Inriktning" in the programs that have
//scrapeSodertorn("https://www.sh.se/program--kurser/program/grund/arkivarie--och-informationsforvaltningsprogrammet/inriktningar/foretagsekonomi");
module.exports = scrapeSodertorn;
