const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = {programTitle_sv:"" , programPoints: "", programDesciption_sv: "", programLink: "", programId: ""};

// Take list of urls as arg and parse, will make ID work better.
// build master scraper?, with all school scrapers that parse "school" from list and uses correct scraper. Will make ID work easier.
async function scrapeKTH(url, programId) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
 
      const $ = cheerio.load(html);

      const titleBody = $(".article"); // Article class ref
      const title = titleBody.find("h1").text().trim(); // title holds name of program name
      //titleReturn.programTitle_sv = title;
      console.log("TITLE:" + title);

      const hpBody = $(".mt-3");
      const hp = hpBody.text().trim(); // Holds "Program X högskolepoäng * Y år * Kandidatexamen"

      //const leadSubBody = $(".lead p"); // lead class's p elements to subBody
      //const shortDesc = leadSubBody.first().text(); // get first p and convert from HTML to text

      const shortDescBody = $(".lead p");
      const shortDesc = shortDescBody.first().text().trim(); // Holds short desciption of program

      let hpItems = [];
      hpItems = title.split(",");
      const regex = /\d+/g;
      let num;
      if(hpItems.length == 3){
       num = hpItems[2].match(regex);
       titleReturn.programTitle_sv = (hpItems[0]+","+hpItems[1]);
       console.log("IF NUM: "+num)

      }
      else if(hpItems.length > 3){
        num = hpItems[3].match(regex);
        titleReturn.programTitle_sv = (hpItems[0]+","+hpItems[1]+","+hpItems[2]);
        console.log("ELSE IF NUM: "+num);
        console.log("ELSE IF title: "+titleReturn.programTitle_sv);

      }
      else{
        num = hpItems[1].match(regex);
        titleReturn.programTitle_sv = (hpItems[0]);
        console.log("ELSE NUM: "+num)
      }
      
      titleReturn.programPoints = num[0];
      titleReturn.programDesciption_sv = shortDesc;
      titleReturn.programLink = url;
      titleReturn.programId = programId;

      //console.log(titleFinal);
      //console.log("titleReturn: "+titleReturn);
    } else {
      console.log("ERROR CONNECTING:" + error);
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
//scrapeKTH("https://www.kth.se/utbildning/arkitekt/arkitektutbildning");
module.exports = scrapeKTH;