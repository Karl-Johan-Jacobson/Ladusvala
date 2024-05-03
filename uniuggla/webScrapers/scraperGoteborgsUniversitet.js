const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const scrapeChalmers = require("./scraperChalmers");
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
async function scrapeGoteborg(url,programId,schoolName) {
  await new Promise(r => setTimeout(r, 1000));

  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const titleBody = $(".heading-main"); // Article class ref
      const title = titleBody.text().trim(); // title holds name of program name
      //titleReturn.programTitle_sv = title;
      console.log("TITLE:" + title);

      const hpBody = $(".u-mb-50 div");
      const hp = hpBody.last().text().trim(); // Holds "Program X högskolepoäng * Y år * Kandidatexamen"

      console.log("HP: " + hp);
      //const leadSubBody = $(".lead p"); // lead class's p elements to subBody
      //const shortDesc = leadSubBody.first().text(); // get first p and convert from HTML to text

      const shortDescBody = $(".box p");
      const shortDesc = shortDescBody.first().text().trim(); // Holds short desciption of program
      console.log("Short Desc: " + shortDesc);

      let hpItems = [];
      hpItems = hp.split("·");
      const regex = /\d+/g;

      const num = hpItems[0].match(regex);
      console.log("HPNUM TO DB: "+num[0]);

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
      titleReturn.programId = ("ERROR: "+response.statusCode);
    }

    fs.appendFile("test.json", JSON.stringify(titleReturn, null, 2) + ","+"\n", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });


    //programId_sv|programUniversity_sv|programTitle_sv|programDescription_sv|programPoints_sv|programYears_sv|programRequirements_sv|programAiDescription_sv|programPlace_sv|programDegree_sv|programLink
  });
}
//scrape("https://www.gu.se/studera/hitta-utbildning/antropologprogrammet-s1ant");
module.exports = scrapeGoteborg;