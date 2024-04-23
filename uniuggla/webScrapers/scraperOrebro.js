const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
//   "type": "commonjs", i package.json för scrape

let titleReturn = {
  programTitle_sv: "",
  programPoints: "",
  programDesciption_sv: "",
  programLink: "",
};

// Take list of urls as arg and parse, will make ID work better.
// build master scraper?, with all school scrapers that parse "school" from list and uses correct scraper.
async function scrapeOrebro(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const titleBody = $(".main-article h1"); // Article class ref
      const titleFind = titleBody.first().text();
      let titleHpList = [];
      titleHpList = titleFind.split(",");
      const title = titleHpList[0].trim(); // title holds name of program name
      //titleReturn.programTitle_sv = title;
      console.log("TITLE:" + title);

      //const hpBody = $(".u-mb-50 div");
      const hp = titleHpList[1].trim(); // Holds "Program X högskolepoäng * Y år * Kandidatexamen"

      console.log("HP: " + hp);
      //const leadSubBody = $(".lead p"); // lead class's p elements to subBody
      //const shortDesc = leadSubBody.first().text(); // get first p and convert from HTML to text

      const shortDescBody = $(".col-sm-12 p");
      const shortDesc = shortDescBody.first().text().trim(); // Holds short desciption of program
      console.log("Short Desc: " + shortDesc);

      let hpItems = [];
      hpItems = hp.split("·");
      const regex = /\d+/g;

      const num = hpItems[0].match(regex);
      console.log("HPNUM TO DB: " + num[0]);

      titleReturn.programTitle_sv = title;
      titleReturn.programPoints = num[0];
      titleReturn.programDesciption_sv = shortDesc;
      titleReturn.programLink = url;

      //console.log(titleFinal);
      //console.log("titleReturn: "+titleReturn);
    } else {
      console.log("ERROR CONNECTING:" + error + response.statusCode);
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
/*scrape(
  "https://www.oru.se/utbildning/program/analysvetenskapligt-program-i-kemi-med-inriktning-mot-forensik/"
);*/
module.exports = scrapeOrebro;