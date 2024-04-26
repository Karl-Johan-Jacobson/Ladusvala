const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = {programTitle_sv:"" , programPoints: "", programDesciption_sv: "", programLink: "", programId: "",schoolName:""};

// Take list of urls as arg and parse, will make ID work better.
// build master scraper?, with all school scrapers that parse "school" from list and uses correct scraper. Will make ID work easier.
async function scrapeKarlstad(url, programId,schoolName) {
  await new Promise(r => setTimeout(r, 1000));
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const titleClass = $(".my0"); // Article class ref
      const title = titleClass.find("span").text(); // title holds name of program, title, amount of HP

      const hpClass = $(".inline-block");
      const hp = hpClass.first().text().trim();

      let hpItems = [];
      hpItems = hp.split("·");
      const regex = /\d+/g;

      const num = hpItems[0].match(regex);
      console.log("HPNUM TO DB: " + num[0]);

      
      const descriptionClass = $(".mb4");
      const descriptionClass2 = descriptionClass.find(".of-aut");
      const descriptionClass3 = descriptionClass2.find("div").first();

      const description = descriptionClass3.find("div").text().split("\n");


        titleReturn.programTitle_sv = title;
        titleReturn.programPoints = num[0];
        titleReturn.programDesciption_sv = description[0];
        titleReturn.programLink = url;
        titleReturn.programId = programId;
        titleReturn.schoolName = schoolName;
    
      console.log(titleReturn);
    } else {
      console.log(response.statusCode)
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
scrapeKarlstad("https://www.kau.se/utbildning/program-och-kurser/program/NGBIO");
module.exports = scrapeKarlstad;
