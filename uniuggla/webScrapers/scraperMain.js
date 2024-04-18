const scraperKarolinska = require("./scraperKarolinska.js");
const scraperChalmers = require("./scraperChalmers.js");
const scraperKarlstad = require("./scraperKarlstad.js");
const scraperKTH = require("./scraperKTH.js");


/*
const scraperLinköping = require("./scraperLinkoping.js");
const scraperLund = require("./scraperLund.js");
const scraperMalardalen = require("./scraperMalardalen.js");
const scraperMalmö = require("./scraperMalmo.js");
const scraperOrebro = require("./scraperOrebro.js");
const scraperSu = require("./scraperSu.js");
const scraperUmeå = require("./scraperUmea.js");
const scraperUppsala = require("./scraperUppsala.js");
*/

//const scrapeMittUniversitetet = require("./scraperMittUniversitetet.js");
//const scraperLinne = require("./scraperLinneUni.js");

let j = 1;

// EJ HANDELS. LINNÉ WONT WORK FROM KTH INTERNET, USE PHONE. TRY BY-PASS ON MITTUNI
async function mainScraper() {

  /*
  for (let i = 0; i < karolinskaArray.length; i++) {
    await scraperKarolinska(karolinskaArray[i], j++);
  }

  /*
  for (let i = 0; i < karlstadArray.length; i++) {
    await scraperChalmers(chalmersArray[i], j++);
  }
  */
  for (let i = 0; i < karlstadArray.length; i++) {
    await scraperKarlstad(karlstadArray[i], j++);
  }
  /*
  for (let i = 0; i < kthArray.length; i++) {
    await scraperKTH(kthArray[i], j++);
  }
  /*
  for (let i = 0; i < karolinskaArray.length; i++) {
    await scraperLund(karolinskaArray[i], j++);
  }
  for (let i = 0; i < karolinskaArray.length; i++) {
    await scraperMalardalen(karolinskaArray[i], j++);
  }
  for (let i = 0; i < karolinskaArray.length; i++) {
    await scraperMalmö(karolinskaArray[i], j++);
  }
  for (let i = 0; i < karolinskaArray.length; i++) {
    await scraperOrebro(karolinskaArray[i], j++);
  }
  for (let i = 0; i < karolinskaArray.length; i++) {
    await scraperSu(karolinskaArray[i], j++);
  }
  for (let i = 0; i < karolinskaArray.length; i++) {
    await scraperUmeå(karolinskaArray[i], j++);
  }
  for (let i = 0; i < karolinskaArray.length; i++) {
    await scraperUppsala(karolinskaArray[i], j++);
  }
  for (let i = 0; i < karolinskaArray.length; i++) {
    await scraperLinköping(karolinskaArray[i], j++);
  }
  */

}



const karlstadArray = [

"https://www.kau.se/utbildning/program-och-kurser/program/SGBET",
"https://www.kau.se/utbildning/program-och-kurser/program/NGBIO",
"https://www.kau.se/utbildning/program-och-kurser/program/SACEK",
"https://www.kau.se/utbildning/program-och-kurser/program/TACDA", 
"https://www.kau.se/utbildning/program-och-kurser/program/TACEM", 
"https://www.kau.se/utbildning/program-och-kurser/program/TACIE",
"https://www.kau.se/utbildning/program-och-kurser/program/TACKT", 
"https://www.kau.se/utbildning/program-och-kurser/program/TACMA", 
"https://www.kau.se/utbildning/program-och-kurser/program/TACTF",
"https://www.kau.se/utbildning/program-och-kurser/program/SGFEK", 
"https://www.kau.se/utbildning/program-och-kurser/program/LGFLV", 
"https://www.kau.se/utbildning/program-och-kurser/program/LGFLP",
"https://www.kau.se/utbildning/program-och-kurser/program/LGGLF", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAGLP-GLGT", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAGLP-GL46",
"https://www.kau.se/utbildning/program-och-kurser/program/VGHMS", 
"https://www.kau.se/utbildning/program-och-kurser/program/TGHBY", 
"https://www.kau.se/utbildning/program-och-kurser/program/TGDDI",
"https://www.kau.se/utbildning/program-och-kurser/program/TGHEL", 
"https://www.kau.se/utbildning/program-och-kurser/program/TGHEM", 
"https://www.kau.se/utbildning/program-och-kurser/program/TGHID",
"https://www.kau.se/utbildning/program-och-kurser/program/TGLIT", 
"https://www.kau.se/utbildning/program-och-kurser/program/TGHMT", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGIHP",
"https://www.kau.se/utbildning/program-och-kurser/program/SGIEK", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGITD-AFEK", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGITD-SYSD",
"https://www.kau.se/utbildning/program-och-kurser/program/SGIPA",
"https://www.kau.se/utbildning/program-och-kurser/program/JALAW",
"https://www.kau.se/utbildning/program-och-kurser/program/TGKDV",
"https://www.kau.se/utbildning/program-och-kurser/program/NGFYA", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGKPR", 
"https://www.kau.se/utbildning/program-och-kurser/program/HGMSK",
"https://www.kau.se/utbildning/program-och-kurser/program/HGKVP", 
"https://www.kau.se/utbildning/program-och-kurser/program/TGLMK", 
"https://www.kau.se/utbildning/program-och-kurser/program/NGKEA",
"https://www.kau.se/utbildning/program-och-kurser/program/NGMAA", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGMKV-SGDM", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGMKV-SGVK",
"https://www.kau.se/utbildning/program-och-kurser/program/SGMIS", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGMIR", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAAML",
"https://www.kau.se/utbildning/program-och-kurser/program/HGMPK", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGPAR", 
"https://www.kau.se/utbildning/program-och-kurser/program/VAPSY",
"https://www.kau.se/utbildning/program-och-kurser/program/SGLYS", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGSAM", 
"https://www.kau.se/utbildning/program-och-kurser/program/VGSSP",
"https://www.kau.se/utbildning/program-och-kurser/program/SGGEN", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGSTV",
"https://www.kau.se/utbildning/program-och-kurser/program/OGTHY",
"https://www.kau.se/utbildning/program-och-kurser/program/TNBAR",
"https://www.kau.se/utbildning/program-och-kurser/program/SGTPD", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGTUR", 
"https://www.kau.se/utbildning/program-och-kurser/program/LGVAL",
"https://www.kau.se/utbildning/program-och-kurser/program/SGWEB", 
"https://www.kau.se/utbildning/program-och-kurser/program/LGYRK", 
"https://www.kau.se/utbildning/program-och-kurser/program/LGVAL",
"https://www.kau.se/utbildning/program-och-kurser/program/SGWEB", 
"https://www.kau.se/utbildning/program-och-kurser/program/SGWEB", 
"https://www.kau.se/utbildning/program-och-kurser/program/LGYRK",
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-GYBI", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-GYEN", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-GYHI",
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-IDGY", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-KEGY", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-GYMA", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-GYMF",
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-NKGY", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-REGY", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-GYSH",
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-GYSP", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-GYSV",
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-ENG2",
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-GEG2",
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-IDG2", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-MAG2", 
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-SHG2",
"https://www.kau.se/utbildning/program-och-kurser/program/LAALP-SVG2", 
];


const chalmersArray = [
  "https://www.chalmers.se/utbildning/hitta-program/affarsutveckling-och-entreprenorskap-teknologie-kandidat/",
  "https://www.chalmers.se/utbildning/hitta-program/arkitektur-och-teknik-arkitektcivilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/arkitektur-arkitekt/",
  "https://www.chalmers.se/utbildning/hitta-program/automation-och-mekatronik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/bioteknik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/datateknik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/datateknik-hogskoleingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/design-och-produktutveckling-hogskoleingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/ekonomi-och-produktionsteknik-hogskoleingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/elektroteknik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/elektroteknik-hogskoleingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/globala-system-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/industriell-ekonomi-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/informationsteknik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/internationell-logistik-teknologie-kandidat/",
  "https://www.chalmers.se/utbildning/hitta-program/kemiteknik-med-fysik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/kemiteknik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/kemiteknik-hogskoleingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/larande-och-ledarskap-masterprogram/",
  "https://www.chalmers.se/utbildning/hitta-program/maskinteknik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/maskinteknik-hogskoleingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/medicinteknik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/mekatronik-hogskoleingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/samhallsbyggnadsteknik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/samhallsbyggnadsteknik-hogskoleingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/sjobefal-klass-vii/",
  "https://www.chalmers.se/utbildning/hitta-program/sjoingenjor-sjoingenjorsexamen/",
  "https://www.chalmers.se/utbildning/hitta-program/sjokapten-sjokaptensexamen/",
  "https://www.chalmers.se/utbildning/hitta-program/teknisk-design-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/teknisk-fysik-civilingenjor/",
  "https://www.chalmers.se/utbildning/hitta-program/teknisk-matematik-civilingenjor/",
];

const karolinskaArray = [
  "https://utbildning.ki.se/programme/1OP19/24-25",
  "https://utbildning.ki.se/programme/2PS18/24-25",
  "https://utbildning.ki.se/programme/1RS13/24-25",
  "https://utbildning.ki.se/programme/1SJ24/24-25",
  "https://utbildning.ki.se/programme/1S224/24-25",
  "https://utbildning.ki.se/programme/1TY19/24-25",
  "https://utbildning.ki.se/programme/2TL19/24-25",
  "https://utbildning.ki.se/programme/2LA21/24-25",
  "https://utbildning.ki.se/programme/2LG16/24-25",
  "https://utbildning.ki.se/programme/1BI17/24-25",
  "https://utbildning.ki.se/programme/1FY18/24-25",
  "https://utbildning.ki.se/programme/1BL24/24-25",
  "https://utbildning.ki.se/programme/1AU16/24-25",
  "https://utbildning.ki.se/programme/1AR15/24-25",
];



const kthArray = [
  "https://www.kth.se/utbildning/arkitekt/arkitektutbildning",
  "https://www.kth.se/utbildning/civilingenjor/bioteknik",
  "https://www.kth.se/utbildning/civilingenjor/civing-larare",
  "https://www.kth.se/utbildning/civilingenjor/datateknik",
  "https://www.kth.se/utbildning/civilingenjor/design-produktframtagning",
  "https://www.kth.se/utbildning/civilingenjor/elektroteknik",
  "https://www.kth.se/utbildning/civilingenjor/energimiljo",
  "https://www.kth.se/utbildning/civilingenjor/farkostteknik",
  "https://www.kth.se/utbildning/civilingenjor/industriell-ekonomi",
  "https://www.kth.se/utbildning/civilingenjor/industriell-teknik-hallbarhet",
  "https://www.kth.se/utbildning/civilingenjor/informationsteknik",
  "https://www.kth.se/utbildning/civilingenjor/maskinteknik",
  "https://www.kth.se/utbildning/civilingenjor/materialdesign",
  "https://www.kth.se/utbildning/civilingenjor/medicinsk-teknik",
  "https://www.kth.se/utbildning/civilingenjor/medieteknik",
  "https://www.kth.se/utbildning/civilingenjor/samhallsbyggnad",
  "https://www.kth.se/utbildning/civilingenjor/teknisk-fysik",
  "https://www.kth.se/utbildning/civilingenjor/teknisk-kemi",
  "https://www.kth.se/utbildning/civilingenjor/teknisk-kemi-mittuniversitet-kth",
  "https://www.kth.se/utbildning/civilingenjor/teknisk-matematik",
  "https://www.kth.se/utbildning/civilingenjor/oppen-ingang",
  "https://www.kth.se/utbildning/hogskoleingenjor/byggteknik-design",
  "https://www.kth.se/utbildning/hogskoleingenjor/datateknik-flemingsberg",
  "https://www.kth.se/utbildning/hogskoleingenjor/datateknik-kista",
  "https://www.kth.se/utbildning/hogskoleingenjor/elektronik-datorteknik",
  "https://www.kth.se/utbildning/hogskoleingenjor/elektroteknik",
  "https://www.kth.se/utbildning/hogskoleingenjor/industriell-teknik",
  "https://www.kth.se/utbildning/hogskoleingenjor/kemiteknik",
  "https://www.kth.se/utbildning/hogskoleingenjor/medicinsk-teknik",
  "https://www.kth.se/utbildning/hogskoleingenjor/teknik-ekonomi",
  "https://www.kth.se/utbildning/kandidatutbildning/fastighet-finans",
  "https://www.kth.se/utbildning/kandidatutbildning/fastighetsutveckling-fastighetsformedling",
  "https://www.kth.se/utbildning/kandidatutbildning/informations-och-kommunikationsteknik",
  "https://www.kth.se/utbildning/civilingenjor/civing-larare",


];



//Done
const linköping = [
  "https://liu.se/utbildning/program/6cien",
  "https://liu.se/utbildning/program/l7ulv",
  "https://liu.se/utbildning/program/mgsk5",
  "https://liu.se/utbildning/program/mgat2",
  "https://liu.se/utbildning/program/mala3",
  "https://liu.se/utbildning/program/mgfy3",
  "https://liu.se/utbildning/program/mkuba",
  "https://liu.se/utbildning/program/mgba2",
  "https://liu.se/utbildning/program/f7ysc",
  "https://liu.se/utbildning/program/f7kmk",
  "https://liu.se/utbildning/program/l1g46",
  "https://liu.se/utbildning/program/l1fri",
  "https://liu.se/utbildning/program/lfkgy",
  "https://liu.se/utbildning/program/lfk46",
  "https://liu.se/utbildning/program/lfkf3",
  "https://liu.se/utbildning/program/lfk79",
  "https://liu.se/utbildning/program/l1gr2",
  "https://liu.se/utbildning/program/l1efr",
  "https://liu.se/utbildning/program/l1fh1",
  "https://liu.se/utbildning/program/l1gy1",
  "https://liu.se/utbildning/program/f7kar",
  "https://liu.se/utbildning/program/f7kpo",
  "https://liu.se/utbildning/program/f7yef",
  "https://liu.se/utbildning/program/f7yes",
  "https://liu.se/utbildning/program/f7yet",
  "https://liu.se/utbildning/program/f7hku",
  "https://liu.se/utbildning/program/f7khr",
  "https://liu.se/utbildning/program/f7yek",
  "https://liu.se/utbildning/program/f7kom",
  "https://liu.se/utbildning/program/f7ksm",
  "https://liu.se/utbildning/program/f7ksy",
  "https://liu.se/utbildning/program/f7ksk",
  "https://liu.se/utbildning/program/f7yee",
  "https://liu.se/utbildning/program/f7ksp",
  "https://liu.se/utbildning/program/f7kko",
  "https://liu.se/utbildning/program/f7ksa",
  "https://liu.se/utbildning/program/f7kgs",
  "https://liu.se/utbildning/program/6kmat",
  "https://liu.se/utbildning/program/6cite",
  "https://liu.se/utbildning/program/6cemm",
  "https://liu.se/utbildning/program/6zbas",
  "https://liu.se/utbildning/program/6ielk",
  "https://liu.se/utbildning/program/6kkem",
  "https://liu.se/utbildning/program/6asik",
  "https://liu.se/utbildning/program/6kftl",
  "https://liu.se/utbildning/program/6kmod",
  "https://liu.se/utbildning/program/6cddd",
  "https://liu.se/utbildning/program/6cmju",
  "https://liu.se/utbildning/program/6cmen",
  "https://liu.se/utbildning/program/6idat",
  "https://liu.se/utbildning/program/6ckeb",
  "https://liu.se/utbildning/program/6asij",
  "https://liu.se/utbildning/program/6kbio",
  "https://liu.se/utbildning/program/6ckts",
  "https://liu.se/utbildning/program/6kgdk",
  "https://liu.se/utbildning/program/6kmot",
  "https://liu.se/utbildning/program/6klog",
  "https://liu.se/utbildning/program/6klog",
  "https://liu.se/utbildning/program/6kdjp",
  "https://liu.se/utbildning/program/6ciii",
  "https://liu.se/utbildning/program/6kipr",
  "https://liu.se/utbildning/program/6dbas",
  "https://liu.se/utbildning/program/6cdpu",
  "https://liu.se/utbildning/program/6kmos",
  "https://liu.se/utbildning/program/6cmmm",
  "https://liu.se/utbildning/program/6cmed",
  "https://liu.se/utbildning/program/6cyyy",
  "https://liu.se/utbildning/program/6imas",
  "https://liu.se/utbildning/program/6ikea",
  "https://liu.se/utbildning/program/6ctma",
  "https://liu.se/utbildning/program/6ibyg",
  "https://liu.se/utbildning/program/6ctbi",
  "https://liu.se/utbildning/program/mgbx3",
  "https://liu.se/utbildning/program/l7va2",
  "https://liu.se/utbildning/program/mgmb2",
  "https://liu.se/utbildning/program/6cdut",
  "https://liu.se/utbildning/program/l2a79",
  "https://liu.se/utbildning/program/l1agy",
  "https://liu.se/utbildning/program/l1for",
  "https://liu.se/utbildning/program/l1gf3",
  "https://liu.se/utbildning/program/l1yrk",
  "https://liu.se/utbildning/program/malo5",
  "https://liu.se/utbildning/program/f7ypu",
];



mainScraper();