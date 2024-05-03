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
// build master scraper?, with all school scrapers that parse "school" from list and uses correct scraper.
async function scrapeUppsala(url, programId, schoolName) {
	await new Promise((r) => setTimeout(r, 1000));

	headers = {
		// Can now scrape Uppsala by manually adding "User-Agent" and "Cookie" copy-pasted from website manually.
		"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
		Cookie:
			"BBN7a6436d9053=088d4528d9ab200002830c2dc7a7508dec0e3aadefeb1b4304db63fe1991875c525c22dad9a1bc3a08edbb6f20113000ced1cfa8038d282000108af5c7a06d859381b780c5fab49020e38abcb0dc6ce1210fee6e5e878ed61fc07cff54ff41ef; BBN0183c630=0135ab579ada7d65db5b3739bcbe4aa80fd701dfce5ca078bda8f6ef3932ddc2767335367dd09ed30e3044bb0da2239e3a40f3ba4c6f2e83a601ac14fbb5447497411132499874047802da03dd4aab0948aa0d1a3d6ccc4bac74683b017f1abbca06147baf; JSESSIONID=E9E68C1ADDA360D917F9EF8F96596C0D; sv-cookie-consent=.bm1zdGF0LHJzcGtybG9hZGNvcmUscmVhZHNwZWFrZXJzZXR0aW5ncyxkY3JzZXR0aW5ncw==; SiteVisionLTM=!09ENu2ZKRCEcanPenlzEFn0oniVgynPuL0U3q8UizhmnzUm5aIJv0hm8dKBU0EpHCH+wVJbzYgZZ; _tpc_persistance_cookie=!+RDfiAWmpP/2qz3FX0w2qKR+RWxhhrIEp1eGbq15q4aoG582JJh3RvvLgtwefrPHDIpTmv0JfpWkqA==",
	};
	request({ url, headers }, (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			const titleBody = $(".uu-heading"); // Article class ref
			const title = titleBody.text().trim(); // title holds name of program name
			//titleReturn.programTitle_sv = title;
			console.log("TITLE:" + title);
			const hpBody = $(".education-header-credits p");
			const hp = hpBody.text().trim(); // Holds "Program X högskolepoäng * Y år * Kandidatexamen"

			console.log("HP: " + hp);
			//const leadSubBody = $(".lead p"); // lead class's p elements to subBody
			//const shortDesc = leadSubBody.first().text(); // get first p and convert from HTML to text

			const shortDescBody = $(".lead");
			const shortDesc = shortDescBody.text().trim(); // Holds short desciption of program
			console.log("Short Desc: " + shortDesc);

			let hpItems = [];
			hpItems = hp.split("·");
			const regex = /\d+/g;

			const num = hpItems[0].match(regex);
			console.log("HPNUM TO DB: " + num[0]);

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

		//programId_sv|programUniversity_sv|programTitle_sv|programDescription_sv|programPoints_sv|programYears_sv|programRequirements_sv|programAiDescription_sv|programPlace_sv|programDegree_sv|programLink
	});
}
//scrapeUppsala("https://www.uu.se/utbildning/program/samhallsvetarprogram");
module.exports = scrapeUppsala;
