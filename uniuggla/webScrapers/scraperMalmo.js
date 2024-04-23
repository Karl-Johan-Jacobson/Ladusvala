const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = {
  programTitle_sv: "",
  programPoints: "",
  programDesciption_sv: "",
  programLink: "",
  programId: "",
};

// Take list of urls as arg and parse, will make ID work better.
// build master scraper?, with all school scrapers that parse "school" from list and uses correct scraper. Will make ID work easier.
async function scrapeMalmö(url,programId) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const titleClass = $(".hero__title"); // Article class ref
      const titleItems = titleClass.text().split(" "); // title holds name of program, title, amount of HP


      let title = "";
      titleItems.map((item) => {
        item = item.trim();
        if (item != "") {
          title += item + " ";
        }
      });

      const hpClass = $(".edu-sticky-block-content");

      const hpArr = hpClass.text().replace(/[^hp0-9]/g, '').split("hp");
      
      hp = hpArr[0] + " " + "hp"
        const descriptionClass = $(".wysiwyg");
        const description = descriptionClass.find("p").first().text();



      titleReturn.programTitle_sv = title;
      titleReturn.programPoints = hp;
      titleReturn.programDesciption_sv = description;
      titleReturn.programLink = url;
      titleReturn.programId = programId;

      console.log(titleReturn);
    } else {
      console.log(response.statusCode);
      console.log("ERROR CONNECTING:" + error);
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
//scrapeMalmö("https://mau.se/sok-utbildning/program/vgbap/");
module.exports = scrapeMalmö;