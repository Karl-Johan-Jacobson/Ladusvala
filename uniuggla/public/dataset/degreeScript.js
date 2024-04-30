const fs = require("fs");

// Path to your JSON file
const filePath = "./filtered_programs.json";

// Keywords to search for in the titles
const keywords = [
  "kandidat",
  "yrkeslärarutbildning",
  "yrkeslärarprogrammet",
  "civilingenjör",
  "högskoleingenjör",
  "ämneslärar",
  "psykolog",
  "läkare",
  "socionom",
  "audionom",
  "biomedicin",
  "arbetsterapeut",
  "fysioterapeut",
  "sjukskötersk",
  "röntgensjuksköterska",
  "jurist",
  "arkitekt",
  "civilekonom",
];

function transformKeyword(fragment) {
  const fragmentTransforms = {
    ämneslärar: "Lärare",
    yrkeslärarutbildning: "Yrkeslärarexamen",
    yrkeslärarprogrammet: "Yrkeslärarexamen",
    psykolog: "Psykologexamen",
    läkare: "Läkarexamen",
    socionom: "Kandidatexamen",
    audionom: "Audionomexamen",
    biomedicin: "Kandidatexamen",
    kandidat: "Kandidatexamen",
    civilingenjör: "Civilingenjörsexamen",
    högskoleingenjör: "Högskoleingenjörsexamen",
    arbetsterapeut: "Arbetsterapeutexamen",
    fysioterapeut: "Fysioterapeutexamen",
    sjukskötersk: "Kandidatexamen",
    röntgensjuksköterska: "Röntgensjuksköterskeexamen",
    jurist: "Juristexamen",
    arkitekt: "Arkitektexamen",
    civilekonom: "Civilekonomexamen",
  };
  return fragmentTransforms[fragment] || null; // Returns null if no transformation is defined
}

function addKeywordsToDegree(items, keywords) {
  return items.map((item) => {
    const title = item.programTitle_sv.toLowerCase();
    const matchingFragments = keywords.filter((keyword) =>
      title.includes(keyword)
    );
    const transformedKeywords = matchingFragments
      .map(transformKeyword)
      .filter((k) => k); // Filter out nulls after transformation

    const degree =
      transformedKeywords.length > 0 ? transformedKeywords.join(", ") : null; // Sets degree to null if no keywords match

    return {
      ...item,
      degree: degree, // Directly set degree to the calculated value or null
    };
  });
}

// Read the JSON file, process the data, and write it back to a new file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  let programs = JSON.parse(data);
  const updatedPrograms = addKeywordsToDegree(programs, keywords);
  const outputPath = "./programs_updated.json";

  fs.writeFile(
    outputPath,
    JSON.stringify(updatedPrograms, null, 2),
    "utf8",
    (writeErr) => {
      if (writeErr) {
        console.error("Error writing to output file:", writeErr);
        return;
      }
      console.log(
        `Updated programs with degree information written to file: ${outputPath}`
      );
    }
  );
});
