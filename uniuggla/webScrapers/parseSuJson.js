const fs = require('fs').promises;

async function parseSuJson() {
    try {
        const data = await fs.readFile('suXHRedusearch.json', 'utf8');

        const jsonData = JSON.parse(data); // Parse JSON


        const eventURLs = []; // Array to store event URL


        if (jsonData.resultRows) {  // Check if the JSON data contains resultRows.

            jsonData.resultRows.forEach(row => { // Extract event URLs from each result row.

                if (row.events) {
                    row.events.forEach(event => {
                        if (event.eventUrl) {
                            eventURLs.push(event.eventUrl);
                        }
                    });
                }
            }); 
        }

        // Write the event URLs to test.txt file with each URL enclosed in quotes, comma at end.
        await fs.writeFile('test.txt', eventURLs.map(url => `"${url}"`).join(',\n'), 'utf8');
        console.log('Event URLs written to test.txt');
    } catch (error) {
        console.error('Error:', error);
    }
}

parseSuJson();
