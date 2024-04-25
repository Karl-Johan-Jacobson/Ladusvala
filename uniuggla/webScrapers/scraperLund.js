const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
//   "type": "commonjs", i package.json för scrape

let titleReturn = {
  programTitle_sv: "",
  programPoints: "",
  programDesciption_sv: "",
  programLink: "",
  programId: "",
};

// Take list of urls as arg and parse, will make ID work better.
// build master scraper?, with all school scrapers that parse "school" from list and uses correct scraper.
async function scrapeLund(url, programId) {
  
  await new Promise((r) => setTimeout(r, 500));
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const titleBody = $(".layout__region--main"); // Article class ref
      const title = titleBody.find("h1").text().trim(); // title holds name of program name
      titleReturn.programTitle_sv = title;

      const hpBody = $(".field__kicker");
      const hp = hpBody.first().text().trim(); // Holds "Program X högskolepoäng * Y år * Kandidatexamen"

      //const leadSubBody = $(".lead p"); // lead class's p elements to subBody
      //const shortDesc = leadSubBody.first().text(); // get first p and convert from HTML to text

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
      titleReturn.programDesciption_sv = shortDesc;
      titleReturn.programLink = url;
      titleReturn.programId = programId;

      //console.log(titleFinal);
      console.log("titleReturn: " + titleReturn);
    } else {
      console.log("ERROR CONNECTING:" + error);
      titleReturn.programLink = url;
      titleReturn.programId = "ERROR: " + response.statusCode;
    }

    fs.appendFile(
      "test.json",
      JSON.stringify(titleReturn, null, 2) + "," + "\n",
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      }
    );

    //programId_sv|programUniversity_sv|programTitle_sv|programDescription_sv|programPoints_sv|programYears_sv|programRequirements_sv|programAiDescription_sv|programPlace_sv|programDegree_sv|programLink
  });
}
//scrapeLund("https://www.lu.se/lubas/i-uoh-lu-HGJAP");
module.exports = scrapeLund;
