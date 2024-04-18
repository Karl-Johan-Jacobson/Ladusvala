const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = {programTitle_sv:"" , programPoints: "", programDesciption_sv: "", programLink: ""};


// Take list of urls as arg and parse, will make ID work better.
// build master scraper?, with all school scrapers that parse "school" from list and uses correct scraper.
async function scrape(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const titleBody = $(".layout__region--main"); // Article class ref
      const title = titleBody.find("h1").text().trim(); // title holds name of program name

      const programInfoBody = $(".field__kicker p");
      const programInfo = programInfoBody.first().text().trim(); // Holds "Program X högskolepoäng * Y år * Kandidatexamen"
  
      //const leadSubBody = $(".lead p"); // lead class's p elements to subBody
      //const shortDesc = leadSubBody.first().text(); // get first p and convert from HTML to text
      
      const shortDescBody = $(".field__lead");
      const shortDesc = shortDescBody.first().text().trim(); // Holds short desciption of program

      console.log(title);
      console.log(programInfo);
      console.log(shortDesc);



      
      let programInfoItems = [];
      programInfoItems = title.split(",");
      console.log("after split:" + programInfoItems);

      if (titleItems.length >= 3) {
        titleItems[0] = titleItems[0] + "," + titleItems[1]; // concat name of program and title
        titleFinal = [titleItems[0], titleItems[2].trim()]; // return new array
        titleReturn.programTitle_sv = titleItems[0];
        titleReturn.programPoints = titleItems[2].trim();
        titleReturn.programDesciption_sv = shortDesc;
        titleReturn.programLink = url;
      }
      
      console.log(titleFinal);
      console.log(titleReturn);
    } else {
      console.log("ERROR CONNECTING:" + error);
    }

    /*
    fs.writeFile("test.json", JSON.stringify(titleReturn, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });*/

    //programId_sv|programUniversity_sv|programTitle_sv|programDescription_sv|programPoints_sv|programYears_sv|programRequirements_sv|programAiDescription_sv|programPlace_sv|programDegree_sv|programLink
  });
}
scrape("https://www.lu.se/lubas/i-uoh-lu-EGEKO");
