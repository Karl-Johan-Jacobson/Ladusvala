const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = {
  programTitle_sv: "",
  programPoints: "",
  programDescription_sv: "",
  programLink: "",
  programId: "",
  schoolName:""
};

// Take list of urls as arg and parse, will make ID work better.
// build master scraper?, with all school scrapers that parse "school" from list and uses correct scraper. Will make ID work easier.
async function scrapeMalmö(url, programId,schoolName) {
  await new Promise((r) => setTimeout(r, 1000));

  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      console.log(url);
      const titleClass = $(".hero__title"); // Article class ref
      const titleItems = titleClass.text().split(" "); // title holds name of program, title, amount of HP

      let title = "";
      titleItems.map((item) => {
        item = item.trim();
        if (item != "") {
          title += item + " ";
        }
      });

      const hpClass = $(".column");

      const hpArr = hpClass.text();

      //console.log(hpArr);
      hp = hpArr;
      const descriptionClass = $(".narrow-content > .wysiwyg");
      const description = descriptionClass.find("p").first().text();

      let hpItems = [];
      hpItems = hp.split("·");
      console.log("after split:" + hpItems[0]);
      const regex = /\d+/g;

      const num = hpItems[0].match(regex);
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
scrapeMalmö("https://mau.se/sok-utbildning/program/vgbap/");
module.exports = scrapeMalmö;
