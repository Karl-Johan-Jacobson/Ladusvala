import fs from "fs";

// Path to your JSON file
const filePath = "./programs_safe.json";

// Keywords to search for in the titles
const keywords = [
  "logoped",
  "lärar",
  "läkar",
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
  "högskoleexamen",
  "tandhygienist",
  "tandläkar",
  "sjöingenjör",
  "vetarprogrammet",
  "sjökapten",
  "180"
];

function transformKeyword(fragment) {
  const fragmentTransforms = {
    logoped: "Logoped",
    lärar: "Lärar",
    läkar: "Läkar",
    kandidat: "Kandidat",
    ämneslärar: "Lärar",
    yrkeslärarutbildning: "Yrkeslärar",
    yrkeslärarprogrammet: "Yrkeslärar",
    psykolog: "Psykolog",
    socionom: "Kandidat",
    audionom: "Audionom",
    biomedicin: "Kandidat",
    civilingenjör: "Civilingenjörs",
    högskoleingenjör: "Högskoleingenjörs",
    arbetsterapeut: "Arbetsterapeut",
    fysioterapeut: "Fysioterapeut",
    sjukskötersk: "Kandidat",
    röntgensjuksköterska: "Röntgensjuksköterske",
    jurist: "Jurist",
    arkitekt: "Arkitekt",
    civilekonom: "Civilekonom",
    högskoleexamen: "Högskole",
    tandhygienist: "Tandhygienist",
    tandläkar: "Tandläkar",
    sjöingenjör: "Sjöingenjör",
    sjökapten: "Sjökapten",
    vetarprogrammet: "Kandidat",
    180: "Kandidat"
  };
  return fragmentTransforms[fragment] || null; // Returns null if no transformation is defined
}

function addKeywordsToDegree(items, keywords) {
  return items.map((item) => {
    const title = item.programTitle_sv.toLowerCase();
    const titleMatchingFragments = keywords.filter((keyword) =>
      title.includes(keyword)
    );
    const titleTransformedKeywords = titleMatchingFragments
      .map(transformKeyword)
      .filter((k) => k); // Filter out nulls after transformation

    let degree = null;

    if (titleTransformedKeywords.length > 0) {
      degree = titleTransformedKeywords.join(", ");
    } else {
      const description = item.programDesciption_sv.toLowerCase();
      const descriptionMatchingFragments = keywords.filter((keyword) =>
        description.includes(keyword)
      );
      const descriptionTransformedKeywords = descriptionMatchingFragments
        .map(transformKeyword)
        .filter((k) => k); // Filter out nulls after transformation

      if (descriptionTransformedKeywords.length > 0) {
        degree = descriptionTransformedKeywords.join(", ");
      } else {
        const points = item.programPoints.toLowerCase();
        const pointsMatchingFragments = keywords.filter((keyword) =>
          points.includes(keyword)
        );
        const pointsTransformedKeywords = pointsMatchingFragments
          .map(transformKeyword)
          .filter((k) => k); // Filter out nulls after transformation

        if (pointsTransformedKeywords.length > 0) {
          degree = pointsTransformedKeywords.join(", ");
        }
      }
    }

    return {
      ...item,
      degree: degree, // Set degree to null if no keywords match
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
  const outputPath = "./programs_safe_updated.json";

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
