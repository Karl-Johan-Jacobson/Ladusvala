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

async function scrapeHV(url, programId) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const fullTitle = $(".small").text().trim(); // Use a more specific selector if available
      // Regex to capture the title without comma and hp separately
      const titleRegex = /(.+?),?\s?(\d+)\s*hp/;
      const matches = fullTitle.match(titleRegex);
      const title = matches && matches[1] ? matches[1].trim() : 'Unknown Title';
      const hp = matches && matches[2] ? matches[2].trim() : 'Unknown HP';
      
      console.log("TITLE:", title);
      console.log("HP:", hp);

      const shortDesc = $(".preamble").text().trim(); // Use the correct selector for the description
      console.log("Short Desc:", shortDesc);

      titleReturn = {
        programTitle_sv: title,
        programPoints: hp,
        programDesciption_sv: shortDesc,
        programLink: url,
        programId: programId
      };
      
      fs.appendFile("test.json", JSON.stringify(titleReturn, null, 2) + ",\n", (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return;
        }
        console.log("Successfully written data to file");
      });

    } else {
      console.error("Error connecting:", error || response.statusCode);
    }
  });
}

scrapeHV("https://www.hv.se/utbildning/program/industriell-ekonomi-heltid-campus-tgiem/");
module.exports = scrapeHV;
