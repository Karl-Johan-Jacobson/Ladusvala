const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let titleReturn = {
  programTitle_sv: "",
  programPoints: "",
  programDesciption_sv: "",
  programLink: "",
  programId: ""
};

async function scrapeHKR(url, programId) {
  await new Promise(r => setTimeout(r, 100));

  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Extract the title and hp from the <h1> element
      const fullTitle = $('.content.education__main-info > h1').text().trim();
      
      // Use regex to find the numeric value for hp
      const hpMatch = fullTitle.match(/(\d+)\s*hp/);
      const hp = hpMatch ? hpMatch[1] : 'unknown';

      // Extract the title by removing the hp part and trimming any extra spaces or hyphens
      const title = fullTitle.replace(/-\s*\d+\s*hp/, '').trim();
      
      console.log("TITLE:", title);
      console.log("HP:", hp);

      // Assuming the description is nearby and uses a paragraph <p> tag
      const shortDesc = $('.content__item > span > p').first().text().trim(); // Replace 'description-selector' with the actual selector
      
      // Construct the result object
      titleReturn = {
        programTitle_sv: title,
        programPoints: hp,
        programDesciption_sv: shortDesc,
        programLink: url,
        programId: programId
      };
      
      // Output to console for debugging
      console.log("Short Desc:", shortDesc);
      console.log("Title Return:", titleReturn);
      
      // Append to file
      fs.appendFile("test.json", JSON.stringify(titleReturn, null, 2) + ",\n", (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      });

    } else {
      console.error("Error connecting:", error || response.statusCode);
      titleReturn.programLink = url;
      titleReturn.programId = ("ERROR: "+response.statusCode);
    }
  });
}

scrapeHKR("https://www.hkr.se/program/grundlarare-arbetsplats");
module.exports = scrapeHKR;
