const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = {
  programTitle_sv: "",
  programPoints: "",
  programDesciption_sv: "",
  programLink: "",
  programId: "",
  schoolName:""
};

// Take list of urls as arg and parse, will make ID work better.
// build master scraper?, with all school scrapers that parse "school" from list and uses correct scraper. Will make ID work easier.
async function scrapeMalardalen(url,programId,schoolName) {
  
  await new Promise(r => setTimeout(r, 1000));
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const titleClass = $(".mdh-h1").first(); // Article class ref
      const title = titleClass.text(); // title holds name of program, title, amount of HP

      const hpClass = $(".iYGC_6L5Wv4eAcFH2ftC").first();
      const hpArr = hpClass.text().split(" ");
      
      hp = hpArr[hpArr.length - 2] + " " + hpArr[hpArr.length - 1]
      const descriptionClass = $(".mdh-ingress");
      const description = descriptionClass.text();

      const regex = /\d+/g;

      const num = hp.match(regex);
      console.log(num[0]);


      titleReturn.programTitle_sv = title;
      titleReturn.programPoints = num[0];
      titleReturn.programDesciption_sv = description;
      titleReturn.programLink = url;
      titleReturn.programId = programId;
      titleReturn.schoolName = schoolName;
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
//scrapeMalardalen("https://www.mdu.se/utbildning/program/visualisering-och-textdesign---informationsdesign",1);

module.exports = scrapeMalardalen;