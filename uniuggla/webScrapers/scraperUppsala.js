const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");




// DONT WORK NOSNIFF PROTOCOL



let titleReturn = {
  programTitle_sv: "",
  programPoints: "",
  programDesciption_sv: "",
  programLink: "",
};

async function scrape(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
        
      const programTitleClassName = $(".uu-heading");
      const programTitleContainer = programTitleClassName.text();

      const programPointsClassName = $(".uu-text");
      const programPointsContainer = programPointsClassName.text();

      const programDescriptionClassName = $(".lead");
      const programDescriptionContainer = programDescriptionClassName.text();

      titleReturn.programTitle_sv = programTitleContainer;
      titleReturn.programPoints = programPointsContainer;
      titleReturn.programDesciption_sv = programDescriptionContainer;
      titleReturn.programLink = url;

      fs.writeFile("test.json", JSON.stringify(titleReturn, null, 2), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      });
    } else {
    console.log(response.statusCode);
      console.log("ERROR CONNECTING:" + error);
    }
  });
}

scrape("https://www.uu.se/utbildning/program/apotekarprogrammet");
