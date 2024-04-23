const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

async function scrapeLinkHv(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $('.text-wrapper a').each((index, element) => {
        const link = $(element).attr('href');
        fs.appendFile("test.txt",'"'+"https://www.hv.se"+ link + '"'+ ",\n", (err) => {
          if (err) {
            console.error("Error appending to file:", err);
          } else {
            console.log("Successfully appended data to file");
          }
        });
      });
    } else {
      console.log("ERROR CONNECTING:" + error + response.statusCode);
    }
  });
}

scrapeLinkHv("https://www.su.se/sok-kurser-och-program?level=1&edutype=2&notforcedreason=0&q=&xpanded=&currentPage=9");
module.exports = scrapeLinkHv;
