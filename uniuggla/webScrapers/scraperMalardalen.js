const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = {
	programTitle_sv: "",
	programPoints: "",
	programDescription_sv: "",
	programLink: "",
	programId: "",
	schoolName: "",
};

// Take list of urls as arg and parse, will make ID work better.
async function scrapeMalardalen(url, programId, schoolName) {
	await new Promise((r) => setTimeout(r, 1000));
	request(url, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			const titleClass = $(".mdh-h1").first(); 
			const title = titleClass.text(); 

			const hpClass = $(".iYGC_6L5Wv4eAcFH2ftC").first();
			const hpArr = hpClass.text().split(" ");

			hp = hpArr[hpArr.length - 2] + " " + hpArr[hpArr.length - 1];
			const descriptionClass = $(".mdh-ingress");
			const description = descriptionClass.text();

			const regex = /\d+/g;

			const num = hp.match(regex);
			console.log(num[0]);

			titleReturn.programTitle_sv = title;
			titleReturn.programPoints = num[0];
			titleReturn.programDescription_sv = description;
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
//scrapeMalardalen("https://www.mdu.se/utbildning/program/visualisering-och-textdesign---informationsdesign",1);

module.exports = scrapeMalardalen;
