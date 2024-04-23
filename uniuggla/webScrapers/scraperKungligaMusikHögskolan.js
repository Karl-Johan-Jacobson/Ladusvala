const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
//   "type": "commonjs", i package.json för scrape

let titleReturn = { programTitle_sv: "", programPoints: "", programDesciption_sv: "", programLink: "", programId: "" };

// Take list of urls as arg and parse, will make ID work better.
// build master scraper?, with all school scrapers that parse "school" from list and uses correct scraper.
async function scrapeKMH(url, programId) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const titleBody = $('.sv-text-portlet-content > h1'); // Article class ref 
      const title = titleBody.text().trim(); // title holds name of program name
      //titleReturn.programTitle_sv = title;
      console.log("TITLE:" + title);
   
      let hp;
$('.lp-education-meta p.normal').each((i, el) => {
  // Check if the text contains "180"
  const text = $(el).text().trim();
  if (text.includes('180') || text.includes('90') || text.includes('240') || text.includes('300') || text.includes("300-330") || text.includes("60")) {
    hp = text;
    return false; // This breaks out of the .each() loop in jQuery
  }
});

// Log the result
console.log("HP Text: " + hp);

// Now you can extract the number with regex
const regex = /(\d+)\s*hp/;


  

      const shortDescBody = $('.sv-text-portlet-content > p.preamble');
      const shortDesc = shortDescBody.text().trim(); // Holds short desciption of program
      console.log("Short Desc: " + shortDesc);

    

      titleReturn.programTitle_sv = title;
      titleReturn.programPoints = hp;
      titleReturn.programDesciption_sv = shortDesc;
      titleReturn.programLink = url;
      titleReturn.programId = programId;

      //console.log(titleFinal);
      //console.log("titleReturn: "+titleReturn);
    } else {
      console.log("ERROR CONNECTING:" + error + response.statusCode);
      titleReturn.programLink = url;
      titleReturn.programId = ("ERROR: "+response.statusCode);
    }


    fs.appendFile("test.json", JSON.stringify(titleReturn, null, 2) + "," + "\n", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });


    //programId_sv|programUniversity_sv|programTitle_sv|programDescription_sv|programPoints_sv|programYears_sv|programRequirements_sv|programAiDescription_sv|programPlace_sv|programDegree_sv|programLink
  });
}
scrapeKMH("https://www.kmh.se/utbildningar/alla-utbildningar/pianostammarutbildning.html");
module.exports = scrapeKMH;