import fs from "fs";

const interests = [
  {
    interestId: "mathematics",
    interestTitle: "Matematik",
    interestDescription:
      "Om du är intresserad av siffror, ekvationer, algoritmer eller matematisk teori.",
    coreSubject: true,
  },
  {
    interestId: "swedish",
    interestTitle: "Svenska",
    interestDescription:
      "Grundläggande ämne som omfattar studiet av det svenska språket, litteraturen och grammatiken.",
    coreSubject: true,
  },
  {
    interestId: "english",
    interestTitle: "Engelska",
    interestDescription:
      "Grundläggande ämne som omfattar studiet av det engelska språket, litteraturen och kommunikation.",
    coreSubject: true,
  },
  {
    interestId: "physics",
    interestTitle: "Fysik",
    interestDescription:
      "Om du är intresserad av materiens och energins natur och egenskaper.",
    coreSubject: true,
  },
  {
    interestId: "chemistry",
    interestTitle: "Kemi",
    interestDescription:
      "Om du är intresserad av ämnen som materien är sammansatt av, undersökningen av deras egenskaper och reaktioner, samt användningen av sådana reaktioner för att bilda nya ämnen.",
    coreSubject: true,
  },
  {
    interestId: "biology",
    interestTitle: "Biologi",
    interestDescription: "Om du är intresserad av liv och levande organismer.",
    coreSubject: true,
  },
  {
    interestId: "social-studies",
    interestTitle: "Samhällskunskap",
    interestDescription:
      "Grundläggande ämne som omfattar studiet av samhällets strukturer, organisation och funktioner.",
    coreSubject: true,
  },
  {
    interestId: "history",
    interestTitle: "Historia",
    interestDescription:
      "Om du är intresserad av att studera historiska händelser, människor eller epoker.",
    coreSubject: true,
  },
  {
    interestId: "religious-studies",
    interestTitle: "Religion",
    interestDescription:
      "Grundläggande ämne som omfattar studiet av olika religiösa traditioner, trosföreställningar och etik.",
    coreSubject: true,
  },
  {
    interestId: "physical-education",
    interestTitle: "Idrott och hälsa",
    interestDescription:
      "Grundläggande ämne som omfattar studiet av fysisk aktivitet, hälsa och livsstil.",
    coreSubject: true,
  },
  {
    interestId: "modern-languages",
    interestTitle: "Moderna språk",
    interestDescription:
      "Grundläggande ämne som omfattar studiet av främmande språk och deras kultur.",
    coreSubject: true,
  },
  {
    interestId: "geography",
    interestTitle: "Geografi",
    interestDescription:
      "Grundläggande ämne som omfattar studiet av jordens fysiska egenskaper, miljö och människors påverkan på landskapet.",
    coreSubject: true,
  },
  {
    interestId: "sports",
    interestTitle: "Sport",
    interestDescription:
      "Om du är sportintresserad kan du överväga universitet med starka idrottsprogram eller faciliteter.",
    coreSubject: false,
  },
  {
    interestId: "arts",
    interestTitle: "Konst",
    interestDescription:
      "Detta kan inkludera bildkonst, scenkonst, musik, film osv.",
    coreSubject: false,
  },
  {
    interestId: "technology",
    interestTitle: "Teknologi",
    interestDescription:
      "Om du är intresserad av områden som datavetenskap, AI, datavetenskap osv.",
    coreSubject: false,
  },
  {
    interestId: "design",
    interestTitle: "Design",
    interestDescription:
      "Detta kan vara grafisk design, industriell design, modedesign, inredningsdesign osv.",
    coreSubject: false,
  },
  {
    interestId: "building-engineering",
    interestTitle: "Byggning/Ingenjörsvetenskap",
    interestDescription:
      "Intressen för att konstruera strukturer, maskiner, enheter, system eller processer.",
    coreSubject: false,
  },
  {
    interestId: "business",
    interestTitle: "Affärer",
    interestDescription:
      "Om du är intresserad av entreprenörskap, marknadsföring, ekonomi osv.",
    coreSubject: false,
  },
  {
    interestId: "healthcare",
    interestTitle: "Hälsovård",
    interestDescription:
      "Detta kan omfatta medicin, sjuksköterska, farmaci till folkhälsa osv.",
    coreSubject: false,
  },
  {
    interestId: "social-sciences",
    interestTitle: "Samhällsvetenskap",
    interestDescription:
      "Intressen inom områden som psykologi, sociologi, antropologi osv.",
    coreSubject: false,
  },
  {
    interestId: "environment",
    interestTitle: "Miljö",
    interestDescription:
      "Om du brinner för miljövetenskap, bevarande, klimatförändringar osv.",
    coreSubject: false,
  },
  {
    interestId: "languages",
    interestTitle: "Språk",
    interestDescription: "Intresse för att lära sig nya språk och kulturer.",
    coreSubject: false,
  },
  {
    interestId: "writing",
    interestTitle: "Skrivande",
    interestDescription:
      "Detta kan vara skönlitterärt skrivande, journalistik osv.",
    coreSubject: false,
  },
  {
    interestId: "law",
    interestTitle: "Juridik",
    interestDescription: "Om du är intresserad av juridiska studier.",
    coreSubject: false,
  },
  {
    interestId: "education",
    interestTitle: "Utbildning",
    interestDescription:
      "Om du är intresserad av undervisning eller utbildningspolitik.",
    coreSubject: false,
  },
  {
    interestId: "research",
    interestTitle: "Forskning",
    interestDescription:
      "Om du gillar att utföra djupgående studier om olika ämnen.",
    coreSubject: false,
  },
  {
    interestId: "culinary-arts",
    interestTitle: "Matlagning och konstnärlig utformning",
    interestDescription:
      "Om du är intresserad av matlagning, bakning, matpresentation osv.",
    coreSubject: false,
  },
  {
    interestId: "philosophy",
    interestTitle: "Filosofi",
    interestDescription:
      "Om du gillar att tänka på och diskutera djupa, grundläggande frågor om existens, verklighet, kunskap osv.",
    coreSubject: false,
  },
  {
    interestId: "astronomy",
    interestTitle: "Astronomi",
    interestDescription:
      "Om du är fascinerad av universum, stjärnor, planeter osv.",
    coreSubject: false,
  },
  {
    interestId: "geography",
    interestTitle: "Geografi",
    interestDescription:
      "Om du är intresserad av jordens fysiska egenskaper och dess atmosfär, samt mänsklig aktivitet och hur den påverkar och påverkas av dessa.",
    coreSubject: false,
  },
  {
    interestId: "political-science",
    interestTitle: "Statsvetenskap",
    interestDescription:
      "Om du är intresserad av teorin och praktiken av politik och beskrivning och analys av politiska system och politiskt beteende.",
    coreSubject: false,
  },
  {
    interestId: "economics",
    interestTitle: "Ekonomi",
    interestDescription:
      "Om du är intresserad av produktion, distribution och konsumtion av varor och tjänster.",
    coreSubject: false,
  },
  {
    interestId: "anthropology",
    interestTitle: "Antropologi",
    interestDescription:
      "Om du är intresserad av studiet av människor, mänskligt beteende och samhällen i det förflutna och nutiden.",
    coreSubject: false,
  },
  {
    interestId: "sociology",
    interestTitle: "Sociologi",
    interestDescription:
      "Om du är intresserad av utvecklingen, strukturen och funktionen av mänsklig samhälle.",
    coreSubject: false,
  },
  {
    interestId: "psychology",
    interestTitle: "Psykologi",
    interestDescription:
      "Om du är intresserad av den mänskliga sinnet och dess funktioner.",
    coreSubject: false,
  },
  {
    interestId: "archaeology",
    interestTitle: "Arkeologi",
    interestDescription:
      "Om du är intresserad av studiet av mänsklig historia och förhistoria genom utgrävning av platser och analys av artefakter och andra fysiska lämningar.",
    coreSubject: false,
  },
  {
    interestId: "theology",
    interestTitle: "Teologi",
    interestDescription:
      "Om du är intresserad av studiet av religiösa tro, praktiker och erfarenheter.",
    coreSubject: false,
  },
  {
    interestId: "music",
    interestTitle: "Musik",
    interestDescription:
      "Om du är intresserad av att spela ett instrument, sjunga, komponera eller musikteori.",
    coreSubject: false,
  },
  {
    interestId: "dance",
    interestTitle: "Dans",
    interestDescription:
      "Om du är intresserad av olika danstilar, koreografi eller danshistoria.",
    coreSubject: false,
  },
  {
    interestId: "photography",
    interestTitle: "Fotografi",
    interestDescription:
      "Om du är intresserad av att ta och redigera foton, eller studera fotografiets historia.",
    coreSubject: false,
  },
  {
    interestId: "film-studies",
    interestTitle: "Filmstudier",
    interestDescription:
      "Om du är intresserad av filmproduktion, filmkritik eller filmhistoria.",
    coreSubject: false,
  },
  {
    interestId: "literature",
    interestTitle: "Litteratur",
    interestDescription:
      "Om du är intresserad av att läsa, analysera och skriva om litteratur.",
    coreSubject: false,
  },
  {
    interestId: "statistics",
    interestTitle: "Statistik",
    interestDescription:
      "Om du är intresserad av att samla, analysera, tolka, presentera och organisera data.",
    coreSubject: false,
  },
  {
    interestId: "agriculture",
    interestTitle: "Jordbruk",
    interestDescription:
      "Om du är intresserad av jordbruk, trädgårdsskötsel eller jordbruksvetenskap.",
    coreSubject: false,
  },
  {
    interestId: "animal-science",
    interestTitle: "Djurhållning",
    interestDescription:
      "Om du är intresserad av att studera biologin hos djur som är under människans kontroll.",
    coreSubject: false,
  },
  {
    interestId: "astronautics",
    interestTitle: "Astronautik",
    interestDescription:
      "Om du är intresserad av teorin och praktiken att navigera utanför jordens atmosfär.",
    coreSubject: false,
  },
  {
    interestId: "robotics",
    interestTitle: "Robotik",
    interestDescription:
      "Om du är intresserad av att designa, konstruera, använda och tillämpa robotar.",
    coreSubject: false,
  },
  {
    interestId: "nanotechnology",
    interestTitle: "Nanoteknik",
    interestDescription:
      "Om du är intresserad av manipulation av materia på en atomär, molekylär och supramolekylär skala.",
    coreSubject: false,
  },
  {
    interestId: "meteorology",
    interestTitle: "Meteorologi",
    interestDescription:
      "Om du är intresserad av studiet av atmosfären, väder och klimat.",
    coreSubject: false,
  },
  {
    interestId: "geology",
    interestTitle: "Geologi",
    interestDescription:
      "Om du är intresserad av den fasta jorden, dess bergarter och de processer genom vilka de förändras över tid.",
    coreSubject: false,
  },
  {
    interestId: "marine-biology",
    interestTitle: "Marinbiologi",
    interestDescription:
      "Om du är intresserad av organismer i havet eller andra marina vattendrag.",
    coreSubject: false,
  },
  {
    interestId: "forestry",
    interestTitle: "Skogsbruk",
    interestDescription:
      "Om du är intresserad av skapandet, förvaltningen, användningen, bevarandet och reparationen av skogar, skogsområden och relaterade resurser.",
    coreSubject: false,
  },
  {
    interestId: "urban-planning",
    interestTitle: "Stadsplanering",
    interestDescription:
      "Om du är intresserad av den tekniska och politiska processen som rör utvecklingen och utformningen av markanvändning och den byggda miljön.",
    coreSubject: false,
  },
  {
    interestId: "public-policy",
    interestTitle: "Offentlig politik",
    interestDescription:
      "Om du är intresserad av skapandet, genomförandet och utvärderingen av lagar och förordningar.",
    coreSubject: false,
  },
  {
    interestId: "international-relations",
    interestTitle: "Internationella relationer",
    interestDescription:
      "Om du är intresserad av relationerna mellan länder, de suveräna staternas roller, internationella organisationer, icke-statliga organisationer och multinationella företag.",
    coreSubject: false,
  },
  {
    interestId: "gender-studies",
    interestTitle: "Genus",
    interestDescription:
      "Om du är intresserad av studiet av kön och dess relation till andra aspekter av det sociala livet.",
    coreSubject: false,
  },
  {
    interestId: "linguistics",
    interestTitle: "Lingvistik",
    interestDescription:
      "Om du är intresserad av den vetenskapliga studien av språk och dess struktur.",
    coreSubject: false,
  },
  {
    interestId: "architectural-studies",
    interestTitle: "Arkitektur",
    interestDescription:
      "Om du är intresserad av studiet av byggnader, inklusive deras design och konstruktion, deras kulturella implikationer och deras historiska utveckling.",
    coreSubject: false,
  },
  {
    interestId: "communication-studies",
    interestTitle: "Kommunikation",
    interestDescription:
      "Om du är intresserad av studiet av mänsklig kommunikation, inklusive de verbala och icke-verbala meddelanden som en grupp individer utbyter under interaktion.",
    coreSubject: false,
  },
  {
    interestId: "journalism",
    interestTitle: "Journalistik",
    interestDescription:
      "Om du är intresserad av aktiviteten att samla, bedöma, skapa och presentera nyheter och information.",
    coreSubject: false,
  },
  {
    interestId: "library-science",
    interestTitle: "Biblioteksvetenskap",
    interestDescription:
      "Om du är intresserad av förvaltningen och spridningen av information, ofta genom ett offentligt eller institutionellt bibliotek.",
    coreSubject: false,
  },
  {
    interestId: "museum-studies",
    interestTitle: "Museologi",
    interestDescription:
      "Om du är intresserad av studiet av museer, deras historia, deras roll i samhället och deras särskilda metoder för allmän utbildning.",
    coreSubject: false,
  },
  {
    interestId: "hospitality-management",
    interestTitle: "Hotell- och restaurangförvaltning",
    interestDescription:
      "Om du är intresserad av studiet av hotell- och restaurangbranschen, inklusive hotell, restauranger, kryssningsfartyg, nöjesparker, destination marknadsföringsorganisationer, konferenscenter och country clubs.",
    coreSubject: false,
  },
  {
    interestId: "real-estate-brokerage",
    interestTitle: "Fastighetsmäkleri",
    interestDescription:
      "Fokus på att förmedla köp, försäljning och uthyrning av fastigheter.",
    coreSubject: false,
  },
  {
    interestId: "real-estate-development",
    interestTitle: "Fastighetsutveckling",
    interestDescription:
      "Inriktning på att planera och utveckla fastigheter för olika ändamål.",
    coreSubject: false,
  },
  {
    interestId: "real-estate-management",
    interestTitle: "Fastighetsförvaltning",
    interestDescription:
      "Hantering och skötsel av fastigheter för att säkerställa deras värde och funktion.",
    coreSubject: false,
  },
  {
    interestId: "real-estate-law",
    interestTitle: "Fastighetsjuridik",
    interestDescription:
      "Studium av lagar och förordningar som reglerar fastighetsaffärer och -förvaltning.",
    coreSubject: false,
  },
  {
    interestId: "real-estate-finance",
    interestTitle: "Fastighetsfinansiering",
    interestDescription:
      "Fokus på finansiella aspekter av fastighetsinvesteringar och transaktioner.",
    coreSubject: false,
  },
  {
    interestId: "human-resources",
    interestTitle: "Personalhantering",
    interestDescription:
      "Om du är intresserad av hanteringen av människor inom en organisation.",
    coreSubject: false,
  },
  {
    interestId: "marketing",
    interestTitle: "Marknadsföring",
    interestDescription:
      "Om du är intresserad av marknadsföring och försäljning av produkter eller tjänster.",
    coreSubject: false,
  },
  {
    interestId: "finance",
    interestTitle: "Ekonomi",
    interestDescription:
      "Om du är intresserad av hanteringen av pengar och investeringar.",
    coreSubject: false,
  },
  {
    interestId: "personal-finance",
    interestTitle: "Privatekonomi",
    interestDescription:
      "Hantering av personliga ekonomiska frågor som budgetering, sparande och skuldsättning.",
    coreSubject: false,
  },
  {
    interestId: "investment-banking",
    interestTitle: "Investment Banking",
    interestDescription:
      "Studie och tillämpning av finansiella tjänster som rådgivning, kapitalanskaffning, och företagsfusioner och förvärv, vanligtvis för större företag och institutioner.",
    coreSubject: false,
  },
  {
    interestId: "stocks",
    interestTitle: "Aktier",
    interestDescription:
      "Att köpa andelar av ett företag och förvänta sig ökning av värde och/eller utdelning över tiden.",
    coreSubject: false,
  },
  {
    interestId: "bonds",
    interestTitle: "Obligationer",
    interestDescription:
      "Att låna pengar till en organisation eller stat och förvänta sig ränta och återbetalning över tiden.",
    coreSubject: false,
  },
  {
    interestId: "mutual-funds",
    interestTitle: "Fondinvestering",
    interestDescription:
      "Att investera i en portfölj av värdepapper som administreras av professionella förvaltare.",
    coreSubject: false,
  },
  {
    interestId: "commodities",
    interestTitle: "Råvaruhandel",
    interestDescription:
      "Att investera i fysiska varor såsom olja, guld, spannmål eller valutor.",
    coreSubject: false,
  },
  {
    interestId: "corporate-finance",
    interestTitle: "Företagsekonomi",
    interestDescription:
      "Hantering av finansiella frågor inom företag, inklusive kapitalanskaffning, investeringsbeslut och riskhantering.",
    coreSubject: false,
  },
  {
    interestId: "financial-markets",
    interestTitle: "Finansmarknader",
    interestDescription:
      "Studium av aktie-, obligations- och derivatmarknader samt deras funktioner och reglering.",
    coreSubject: false,
  },
  {
    interestId: "financial-analysis",
    interestTitle: "Finansiell analys",
    interestDescription:
      "Användning av kvantitativa metoder för att bedöma och förutsäga företags och investeringsprestationer.",
    coreSubject: false,
  },
  {
    interestId: "accounting",
    interestTitle: "Redovisning",
    interestDescription:
      "Om du är intresserad av mätning, bearbetning och kommunikation av finansiell information.",
    coreSubject: false,
  },
  {
    interestId: "entrepreneurship",
    interestTitle: "Entreprenörskap",
    interestDescription:
      "Om du är intresserad av processen att designa, lansera och driva ett nytt företag.",
    coreSubject: false,
  },
  {
    interestId: "public-administration",
    interestTitle: "Offentlig förvaltning",
    interestDescription:
      "Om du är intresserad av genomförandet av regeringspolitik, teorin om offentlig förvaltning och beteendet hos offentliga tjänstemän.",
    coreSubject: false,
  },
  {
    interestId: "social-work",
    interestTitle: "Socialt arbete",
    interestDescription:
      "Om du är intresserad av att ge hjälp för att förbättra individens och samhällets sociala funktion.",
    coreSubject: false,
  },
  {
    interestId: "counseling",
    interestTitle: "Rådgivning",
    interestDescription:
      "Om du är intresserad av att hjälpa individer, familjer och grupper att uppnå mental hälsa, välbefinnande, utbildning och karriärmål.",
    coreSubject: false,
  },
  {
    interestId: "nutrition",
    interestTitle: "Nutrition",
    interestDescription:
      "Om du är intresserad av vetenskapen som tolkar näringsämnena och andra ämnen i mat i relation till underhåll, tillväxt, reproduktion, hälsa och sjukdom hos en organism.",
    coreSubject: false,
  },
  {
    interestId: "physical-therapy",
    interestTitle: "Fysioterapi",
    interestDescription:
      "Om du är intresserad av behandling av sjukdomar, skador eller deformiteter genom fysiska metoder som massage, värmebehandling och träning.",
    coreSubject: false,
  },
  {
    interestId: "occupational-therapy",
    interestTitle: "Arbetsterapi",
    interestDescription:
      "Om du är intresserad av användningen av bedömning och intervention för att utveckla, återhämta eller upprätthålla meningsfulla aktiviteter eller yrken hos individer, grupper eller samhällen.",
    coreSubject: false,
  },
  {
    interestId: "speech-therapy",
    interestTitle: "Logopedi",
    interestDescription:
      "Om du är intresserad av behandling av tal- och kommunikationsstörningar.",
    coreSubject: false,
  },
  {
    interestId: "pharmacy",
    interestTitle: "Farmaci",
    interestDescription:
      "Om du är intresserad av vetenskapen och tekniken för att förbereda, distribuera och granska läkemedel och tillhandahålla ytterligare kliniska tjänster.",
    coreSubject: false,
  },
  {
    interestId: "veterinary-medicine",
    interestTitle: "Veterinärmedicin",
    interestDescription:
      "Om du är intresserad av förebyggande, diagnos och behandling av sjukdom, störning och skada hos djur.",
    coreSubject: false,
  },
  {
    interestId: "interior-design",
    interestTitle: "Inredningsdesign",
    interestDescription: "Dekorering och design av layout för bostadsutrymmen.",
    coreSubject: false,
  },
  {
    interestId: "fashion-design",
    interestTitle: "Mode design",
    interestDescription: "Design av kläder, följer modetrender, etc.",
    coreSubject: false,
  },
  {
    interestId: "outdoor-activities",
    interestTitle: "Utomhusaktiviteter",
    interestDescription:
      "Vandring, camping, fågelskådning, trädgårdsarbete, fiske, jakt, etc.",
    coreSubject: false,
  },
  {
    interestId: "arts-and-crafts",
    interestTitle: "Konst och hantverk",
    interestDescription: "Målning, teckning, keramik, stickning, sömnad, etc.",
    coreSubject: false,
  },
  {
    interestId: "painting",
    interestTitle: "Målning",
    interestDescription:
      "Konstform som använder färger och pigment för att skapa estetiska eller uttrycksfulla bilder på en yta.",
    coreSubject: false,
  },
  {
    interestId: "drawing",
    interestTitle: "Teckning",
    interestDescription:
      "Skapande av bilder med hjälp av olika ritmaterial som blyertspennor, kol, bläck, eller färgkritor.",
    coreSubject: false,
  },
  {
    interestId: "ceramics",
    interestTitle: "Keramik",
    interestDescription:
      "Konsten att skapa objekt av bränd lera, inklusive keramik och porslin.",
    coreSubject: false,
  },
  {
    interestId: "knitting",
    interestTitle: "Stickning",
    interestDescription:
      "Skapandet av tygstycken genom att interlocka trådar med stickor eller maskiner.",
    coreSubject: false,
  },
  {
    interestId: "sewing",
    interestTitle: "Sömnad",
    interestDescription:
      "Processen att fästa eller sy ihop tyger med nål och tråd för att skapa textilprodukter.",
    coreSubject: false,
  },
  {
    interestId: "performing-arts",
    interestTitle: "Scenkonst",
    interestDescription:
      "Dans, sång, skådespeleri, spela musikinstrument, etc.",
    coreSubject: false,
  },
  {
    interestId: "board-games",
    interestTitle: "Brädspel",
    interestDescription:
      "Spel som spelas på en spelplan med brickor, tärningar eller kort, vanligtvis mot andra spelare.",
    coreSubject: false,
  },
  {
    interestId: "video-games",
    interestTitle: "Datorspel",
    interestDescription:
      "Elektroniska spel som spelas på en skärm och kontrolleras med hjälp av en handkontroll, tangentbord eller mus.",
    coreSubject: false,
  },
  {
    interestId: "card-games",
    interestTitle: "Kortspel",
    interestDescription:
      "Spel som spelas med en uppsättning spelkort, inklusive traditionella kortspel och samlarkortspel.",
    coreSubject: false,
  },
  {
    interestId: "puzzles",
    interestTitle: "Pussel",
    interestDescription:
      "Uppgifter som kräver tänkande eller logik för att lösa, vanligtvis genom att sätta samman bitar för att bilda en komplett bild eller mönster.",
    coreSubject: false,
  },
  {
    interestId: "cooking-and-baking",
    interestTitle: "Matlagning och bakning",
    interestDescription: "Prova nya recept, baka efterrätter, grilla, etc.",
    coreSubject: false,
  },
  {
    interestId: "travel",
    interestTitle: "Resor",
    interestDescription:
      "Utforska nya platser, lära dig om olika kulturer, prova ny mat, etc.",
    coreSubject: false,
  },
  {
    interestId: "learning",
    interestTitle: "Lärande",
    interestDescription: "Akademiska ämnen, språk, färdigheter, etc.",
    coreSubject: false,
  },
  {
    interestId: "socializing",
    interestTitle: "Socialisering",
    interestDescription:
      "Tid med vänner och familj, träffa nya människor, delta i sociala evenemang, etc.",
    coreSubject: false,
  },
  {
    interestId: "volunteering",
    interestTitle: "Volontärarbete",
    interestDescription:
      "Hjälpa till på lokala skyddshem, delta i gemenskapsstädningar, mentorering, etc.",
    coreSubject: false,
  },
  {
    interestId: "fitness-and-health",
    interestTitle: "Fitness och hälsa",
    interestDescription: "Yoga, gym, meditation, näringslära, etc.",
    coreSubject: false,
  },
  {
    interestId: "technology",
    interestTitle: "Teknologi",
    interestDescription:
      "Programmering, webbdesign, grafisk design, utforska ny teknik, etc.",
    coreSubject: false,
  },
  {
    interestId: "photography",
    interestTitle: "Fotografi",
    interestDescription:
      "Landskapsfotografi, porträttfotografi, naturfotografi, etc.",
    coreSubject: false,
  },
  {
    interestId: "fashion",
    interestTitle: "Mode",
    interestDescription: "Följa trender, shoppa, designa kläder, etc.",
    coreSubject: false,
  },
  {
    interestId: "animals-and-nature",
    interestTitle: "Djur och natur",
    interestDescription:
      "Skötsel av husdjur, fågelskådning, trädgårdsarbete, bevarande, etc.",
    coreSubject: false,
  },
  {
    interestId: "collecting",
    interestTitle: "Samlarobjekt",
    interestDescription: "Frimärken, mynt, vintageartiklar, etc.",
    coreSubject: false,
  },
  {
    interestId: "home-improvement",
    interestTitle: "Hemförbättring",
    interestDescription:
      "Gör-det-själv-projekt, möbeltillverkning, trädgårdsarbete, etc.",
    coreSubject: false,
  },
  {
    interestId: "investing",
    interestTitle: "Investering",
    interestDescription: "Aktier, fastigheter, kryptovaluta, etc.",
    coreSubject: false,
  },
  {
    interestId: "podcasts",
    interestTitle: "Podcasts",
    interestDescription: "Lyssna på eller skapa podcasts om olika ämnen.",
    coreSubject: false,
  },
  {
    interestId: "movies-and-tv-shows",
    interestTitle: "Filmer och TV-program",
    interestDescription:
      "Titta på, analysera eller diskutera filmer och serier.",
    coreSubject: false,
  },
  {
    interestId: "music",
    interestTitle: "Musik",
    interestDescription:
      "Lyssna på musik, gå på konserter, upptäcka nya artister, etc.",
    coreSubject: false,
  },
  {
    interestId: "astronomy",
    interestTitle: "Astronomi",
    interestDescription: "Stjärnskådning, lära sig om himlakroppar, etc.",
    coreSubject: false,
  },
  {
    interestId: "history",
    interestTitle: "Historia",
    interestDescription:
      "Lära sig om olika perioder, civilisationer, historiska personer, etc.",
    coreSubject: false,
  },
  {
    interestId: "science",
    interestTitle: "Vetenskap",
    interestDescription:
      "Lära sig om olika vetenskapliga fält, genomföra experiment, etc.",
    coreSubject: false,
  },
  {
    interestId: "philosophy",
    interestTitle: "Filosofi",
    interestDescription: "Diskutera livet, existensen, etik, etc.",
    coreSubject: false,
  },
  {
    interestId: "psychology",
    interestTitle: "Psykologi",
    interestDescription:
      "Förstå mänskligt beteende, känslor, kognitiva processer, etc.",
    coreSubject: false,
  },
  {
    interestId: "spirituality",
    interestTitle: "Andlighet",
    interestDescription: "Meditation, yoga, mindfulness, etc.",
    coreSubject: false,
  },
  {
    interestId: "social-media",
    interestTitle: "Sociala medier",
    interestDescription:
      "Skapa innehåll, följa influencers, delta i online-communityn, etc.",
    coreSubject: false,
  },
  {
    interestId: "volunteering",
    interestTitle: "Volontärarbete",
    interestDescription:
      "Hjälpa till på lokala skyddshem, delta i gemenskapsstädningar, mentorering, etc.",
    coreSubject: false,
  },
  {
    interestId: "magic-and-illusions",
    interestTitle: "Magi och illusioner",
    interestDescription: "Utföra magiska trick, korttrick, etc.",
    coreSubject: false,
  },
  {
    interestId: "stand-up-comedy",
    interestTitle: "Ståuppkomik",
    interestDescription: "Titta på, skriva eller utföra ståuppkomik.",
    coreSubject: false,
  },
  {
    interestId: "diy-projects",
    interestTitle: "Gör-det-själv-projekt",
    interestDescription: "Bygga möbler, göra hemförbättringar, skapa, etc.",
    coreSubject: false,
  },
  {
    interestId: "gardening",
    interestTitle: "Trädgårdsarbete",
    interestDescription: "Odla växter, grönsaker, blommor, etc.",
    coreSubject: false,
  },
  {
    interestId: "wine-tasting",
    interestTitle: "Vinprovning",
    interestDescription: "Lära sig om och provsmaka olika typer av vin.",
    coreSubject: false,
  },
  {
    interestId: "coffee-brewing",
    interestTitle: "Kaffebryggning",
    interestDescription: "Testa olika bryggmetoder, bönor och smaker.",
    coreSubject: false,
  },
  {
    interestId: "bird-watching",
    interestTitle: "Fågelskådning",
    interestDescription: "Observation och lärande om olika fågelarter.",
    coreSubject: false,
  },
  {
    interestId: "yoga",
    interestTitle: "Yoga",
    interestDescription:
      "Praktisera olika positioner, förbättra flexibilitet och mindfulness.",
    coreSubject: false,
  },
  {
    interestId: "meditation",
    interestTitle: "Meditation",
    interestDescription: "Praktisera mindfulness, minska stress och ångest.",
    coreSubject: false,
  },
  {
    interestId: "running",
    interestTitle: "Löpning",
    interestDescription: "Delta i lopp, gå med i löparklubbar, terränglöpning.",
    coreSubject: false,
  },
  {
    interestId: "cycling",
    interestTitle: "Cykling",
    interestDescription: "Mountainbike, landsvägscykling, cykelturer.",
    coreSubject: false,
  },
  {
    interestId: "sustainable-living",
    interestTitle: "Hållbart liv",
    interestDescription: "Minska avfall, kompostering, återvinning, etc.",
    coreSubject: false,
  },
  {
    interestId: "interior-design",
    interestTitle: "Inredningsdesign",
    interestDescription: "Inredning och design av boendeytor.",
    coreSubject: false,
  },
  {
    interestId: "fashion-design",
    interestTitle: "Modedesign",
    interestDescription: "Design av kläder, följa modetrender, etc.",
    coreSubject: false,
  },
  {
    interestId: "programming",
    interestTitle: "Programmering",
    interestDescription:
      "Lära sig olika programmeringsspråk, bidra till öppen källkod, etc.",
    coreSubject: true,
  },
  {
    interestId: "science-fiction-and-fantasy",
    interestTitle: "Science fiction och fantasy",
    interestDescription:
      "Läsa sci-fi och fantasy-böcker, delta i konvent, cosplay, etc.",
    coreSubject: false,
  },
  {
    interestId: "board-games",
    interestTitle: "Brädspel",
    interestDescription:
      "Spela strategiska brädspel, delta i brädspelsträffar, etc.",
    coreSubject: false,
  },
  {
    interestId: "comic-books",
    interestTitle: "Serieböcker",
    interestDescription:
      "Läsa serieböcker, delta i seriekonvent, samla på sällsynta serietidningar, etc.",
    coreSubject: false,
  },
  {
    interestId: "robotics",
    interestTitle: "Robotik",
    interestDescription:
      "Bygga och programmera robotar, delta i robotiktävlingar, etc.",
    coreSubject: false,
  },
  {
    interestId: "electronics",
    interestTitle: "Elektronik",
    interestDescription: "Bygga kretsar, skapa DIY-elektroniska prylar, etc.",
    coreSubject: false,
  },
  {
    interestId: "chess",
    interestTitle: "Schack",
    interestDescription:
      "Spela schack, studera schackstrategier, delta i schackturneringar, etc.",
    coreSubject: false,
  },
  {
    interestId: "video-game-development",
    interestTitle: "Spelutveckling",
    interestDescription:
      "Designa och utveckla datorspel, lära sig om spelmotorer, etc.",
    coreSubject: false,
  },
  {
    interestId: "quantum-physics",
    interestTitle: "Kvantfysik",
    interestDescription:
      "Studera principerna för kvantmekanik, förstå komplexa teorier, etc.",
    coreSubject: true,
  },
  {
    interestId: "linguistics",
    interestTitle: "Lingvistik",
    interestDescription:
      "Lära sig om språkens struktur, studera fonetik, syntax, etc.",
    coreSubject: true,
  },
  {
    interestId: "philosophy",
    interestTitle: "Filosofi",
    interestDescription: "Dyk ner i metafysik, etik, logik, etc.",
    coreSubject: true,
  },
  {
    interestId: "artificial-intelligence",
    interestTitle: "Artificiell intelligens",
    interestDescription:
      "Studera maskininlärningsalgoritmer, neurala nätverk, etc.",
    coreSubject: false,
  },
  {
    interestId: "cryptology",
    interestTitle: "Kryptologi",
    interestDescription:
      "Lära sig om kryptering, dekryptering och chiffer-system.",
    coreSubject: false,
  },
  {
    interestId: "data-analysis",
    interestTitle: "Dataanalys",
    interestDescription:
      "Arbeta med stora dataset, statistisk analys, prediktiv modellering, etc.",
    coreSubject: false,
  },
  {
    interestId: "machine-learning",
    interestTitle: "Maskininlärning",
    interestDescription:
      "Designa och implementera maskininlärningsmodeller, studera teorin bakom olika algoritmer, etc.",
    coreSubject: false,
  },
  {
    interestId: "anime",
    interestTitle: "Anime",
    interestDescription: "Titta på anime, delta i animekonvent, etc.",
    coreSubject: false,
  },
  {
    interestId: "manga",
    interestTitle: "Manga",
    interestDescription: "Läsa manga, delta i manga-events, etc.",
    coreSubject: false,
  },
  {
    interestId: "cryptocurrencies",
    interestTitle: "Kryptovalutor",
    interestDescription:
      "Studera blockkedjeteknik, investera i kryptovalutor, etc.",
    coreSubject: false,
  },
  {
    interestId: "dungeons-and-dragons",
    interestTitle: "Dungeons & Dragons",
    interestDescription: "Spela D&D, skapa kampanjer, bygga karaktärer, etc.",
    coreSubject: false,
  },
  {
    interestId: "cosplay",
    interestTitle: "Cosplay",
    interestDescription:
      "Designa och skapa kostymer, delta i cosplay-evenemang, etc.",
    coreSubject: false,
  },
  {
    interestId: "star-trek-star-wars",
    interestTitle: "Star Trek/Star Wars",
    interestDescription:
      "Titta på serier/filmer, läsa böckerna, delta i fan-klubbar, etc.",
    coreSubject: false,
  },
  {
    interestId: "lord-of-the-rings",
    interestTitle: "Sagan om ringen",
    interestDescription: "Läsa böckerna, titta på filmerna, studera lore, etc.",
    coreSubject: false,
  },
  {
    interestId: "harry-potter",
    interestTitle: "Harry Potter",
    interestDescription:
      "Läsa böckerna, titta på filmerna, delta i fan-klubbar, etc.",
    coreSubject: false,
  },
  {
    interestId: "marvel-dc-comics",
    interestTitle: "Marvel/DC Comics",
    interestDescription:
      "Läsa serietidningar, titta på filmerna, följa karaktärerna, etc.",
    coreSubject: false,
  },
  {
    interestId: "retro-computing",
    interestTitle: "Retro-datorer",
    interestDescription:
      "Samla och restaurera gamla datorer, studera datorhistoria, etc.",
    coreSubject: false,
  },
  {
    interestId: "model-trains",
    interestTitle: "Modelljärnvägar",
    interestDescription:
      "Bygga och driva modelljärnvägar, samla modelljärnvägar, etc.",
    coreSubject: false,
  },
  {
    interestId: "lego-building",
    interestTitle: "Lego-byggande",
    interestDescription:
      "Skapa komplexa strukturer och modeller med Lego, samla sällsynta Lego-set, etc.",
    coreSubject: false,
  },

  {
    interestId: "paleontology",
    interestTitle: "Paleontologi",
    interestDescription:
      "Studera fossil för att fastställa organismernas evolution och interaktioner med varandra och deras miljöer.",
    coreSubject: true,
  },
  {
    interestId: "mythology",
    interestTitle: "Mytologi",
    interestDescription:
      "Studera myter från olika kulturer, inklusive grekisk, romersk, nordisk, egyptisk, etc.",
    coreSubject: false,
  },
  {
    interestId: "quantum-mechanics",
    interestTitle: "Kvantmekanik",
    interestDescription:
      "Dyk ner i den grundläggande teorin inom fysiken som ger en beskrivning av naturens fysiska egenskaper på atom- och subatomisk nivå.",
    coreSubject: true,
  },
  {
    interestId: "astrophysics",
    interestTitle: "Astrofysik",
    interestDescription:
      "Utforska principerna för astronomi och fysik, såsom tidens natur och universums ursprung.",
    coreSubject: true,
  },
  {
    interestId: "bioinformatics",
    interestTitle: "Bioinformatik",
    interestDescription:
      "Använda programvara och datormetodik för att förstå biologisk data, särskilt när det gäller DNA, RNA och proteinsekvensdata.",
    coreSubject: false,
  },
  {
    interestId: "microbiology",
    interestTitle: "Mikrobiologi",
    interestDescription:
      "Studera mikroskopiska organismer, såsom bakterier, virus, arkeer, svampar och protozoer.",
    coreSubject: false,
  },
  {
    interestId: "neuroscience",
    interestTitle: "Neurovetenskap",
    interestDescription:
      "Lära sig om nervsystemets och hjärnans struktur och funktion.",
    coreSubject: false,
  },
  {
    interestId: "genetics",
    interestTitle: "Genetik",
    interestDescription:
      "Studera gener, genetisk variation och ärftlighet hos organismer.",
    coreSubject: false,
  },
  {
    interestId: "geology",
    interestTitle: "Geologi",
    interestDescription:
      "Studera fast jord, de stenar den är sammansatt av och de processer genom vilka de förändras.",
    coreSubject: true,
  },
  {
    interestId: "archeology",
    interestTitle: "Arkeologi",
    interestDescription:
      "Studera mänsklig historia och förhistoria genom utgrävning av platser och analys av artefakter och andra fysiska lämningar.",
    coreSubject: true,
  },
  {
    interestId: "cartography",
    interestTitle: "Kartografi",
    interestDescription: "Studien och praxisen att göra och använda kartor.",
    coreSubject: false,
  },
  {
    interestId: "philology",
    interestTitle: "Filologi",
    interestDescription:
      "Studiet av språk i muntliga och skriftliga historiska källor.",
    coreSubject: false,
  },
  {
    interestId: "epistemology",
    interestTitle: "Epistemologi",
    interestDescription:
      "Studiet av kunskap, motivering och rationaliteten hos tro.",
    coreSubject: false,
  },
  {
    interestId: "logic",
    interestTitle: "Logik",
    interestDescription:
      "Den systematiska studien av inferensformerna, de relationer som leder till antagandet av en proposition, slutsatsen, på grundval av en uppsättning andra propositioner, premissarna.",
    coreSubject: false,
  },
  {
    interestId: "ethnography",
    interestTitle: "Etnografi",
    interestDescription:
      "Den systematiska studien av människor och kulturer, utformad för att utforska kulturella fenomen.",
    coreSubject: false,
  },
  {
    interestId: "heraldry",
    interestTitle: "Heraldik",
    interestDescription:
      "Studiet av heraldiska vapen (vapensköldar), spårar deras historia och betydelse.",
    coreSubject: false,
  },
  {
    interestId: "numismatics",
    interestTitle: "Numismatik",
    interestDescription: "Studiet eller samlar mynt, sedlar och medaljer.",
    coreSubject: false,
  },
  {
    interestId: "graph-theory",
    interestTitle: "Graffteori",
    interestDescription:
      "Studiet av grafer, som är matematiska strukturer som används för att modellera parvis relationer mellan objekt.",
    coreSubject: false,
  },
  {
    interestId: "topology",
    interestTitle: "Topologi",
    interestDescription:
      "Studiet av egenskaper som bevaras under kontinuerliga deformationer, såsom sträckning, skrynklighet och böjning, men inte sönderdelning eller limning.",
    coreSubject: false,
  },
  {
    interestId: "quantum-computing",
    interestTitle: "Kvantberäkning",
    interestDescription:
      "Studieområdet som fokuserar på att utveckla datorbaserade teknologier som är centrerade kring kvantteorins principer.",
    coreSubject: false,
  },
  {
    interestId: "astrobiology",
    interestTitle: "Astrobiologi",
    interestDescription:
      "Studiet av livets ursprung, evolution, fördelning och framtid i universum.",
    coreSubject: false,
  },
  {
    interestId: "cryptography",
    interestTitle: "Kryptografi",
    interestDescription:
      "Praktiken och studiet av tekniker för säker kommunikation i närvaro av tredje part.",
    coreSubject: false,
  },
  {
    interestId: "paleography",
    interestTitle: "Paleografi",
    interestDescription:
      "Studiet av antika skriftsystem och dechiffrering och datering av historiska manuskript.",
    coreSubject: false,
  },
  {
    interestId: "bioengineering",
    interestTitle: "Bioengineering",
    interestDescription:
      "Användningen av biologins principer och ingenjörskapets verktyg för att skapa användbara, materiella, ekonomiskt lönsamma produkter.",
    coreSubject: false,
  },
  {
    interestId: "nanoscience",
    interestTitle: "Nanovetenskap",
    interestDescription:
      "Studiet av fenomen och manipulation av material på atom-, molekylär- och makromolekylär nivå.",
    coreSubject: false,
  },
  {
    interestId: "myrmecology",
    interestTitle: "Myrmekologi",
    interestDescription:
      "Den vetenskapliga studien av myror, en gren av entomologi.",
    coreSubject: false,
  },
  {
    interestId: "ornithology",
    interestTitle: "Ornitologi",
    interestDescription: "Den vetenskapliga studien av fåglar.",
    coreSubject: false,
  },
  {
    interestId: "ichthyology",
    interestTitle: "Ichtyologi",
    interestDescription: "Den vetenskapliga studien av fiskar.",
    coreSubject: false,
  },
  {
    interestId: "herpetology",
    interestTitle: "Herpetologi",
    interestDescription:
      "Grenen av zoologi som rör sig om studiet av grodor och kräldjur.",
    coreSubject: false,
  },
  {
    interestId: "sustainability",
    interestTitle: "Hållbarhet",
    interestDescription:
      "Intresse för hållbart liv, förnybar energi, bevarande, etc.",
    coreSubject: false,
  },
  {
    interestId: "archaeoastronomy",
    interestTitle: "Arkeoastronomi",
    interestDescription:
      "Studiet av hur tidigare civilisationer förstod fenomenen på himlen, hur de använde dessa fenomen i sin kultur och vilken roll himlen spelade i kulturen.",
    coreSubject: false,
  },
  {
    interestId: "genealogy",
    interestTitle: "Genealogi",
    interestDescription:
      "Studiet och spårningen av familjelinjer och historia.",
    coreSubject: false,
  },
  {
    interestId: "martial-arts",
    interestTitle: "Kampsport",
    interestDescription:
      "Praktik eller studium av olika discipliner inom kampsport.",
    coreSubject: false,
  },
  {
    interestId: "parkour",
    interestTitle: "Parkour",
    interestDescription:
      "Aktivitet eller sport som går ut på att röra sig snabbt genom ett område, vanligtvis i en stadsmiljö, och ta sig över hinder genom att springa, hoppa och klättra.",
    coreSubject: false,
  },
  {
    interestId: "brewing",
    interestTitle: "Bryggning",
    interestDescription: "Göra ditt eget öl, vin eller sprit hemma.",
    coreSubject: false,
  },
  {
    interestId: "foraging",
    interestTitle: "Fodring",
    interestDescription: "Söka efter vilda matresurser.",
    coreSubject: false,
  },
  {
    interestId: "meteorology-additional",
    interestTitle: "Meteorologi",
    interestDescription:
      "Studiet av väder, klimat och de atmosfäriska förhållanden som producerar väder.",
    coreSubject: false,
  },
  {
    interestId: "permaculture",
    interestTitle: "Permakultur",
    interestDescription:
      "Utvecklingen av jordbruks-ekosystem som är avsedda att vara hållbara och självförsörjande.",
    coreSubject: false,
  },
  {
    interestId: "radio",
    interestTitle: "Radio",
    interestDescription: "Amatörradiooperation, skapande av podcaster, etc.",
    coreSubject: false,
  },
  {
    interestId: "pottery",
    interestTitle: "Keramik",
    interestDescription: "Skapa objekt med lera och andra keramiska material.",
  },
  {
    interestId: "calligraphy",
    interestTitle: "Kalligrafi",
    interestDescription:
      "Design och utförande av bokstäver med ett brett spetsat instrument, pensel eller annan skrivutrustning.",
  },
  {
    interestId: "aquarium-keeping",
    interestTitle: "Akvariehållning",
    interestDescription:
      "Underhålla ett hemakvarium med fiskar eller andra akvatiska husdjur.",
  },
  {
    interestId: "bird-watching-additional",
    interestTitle: "Fågelskådning",
    interestDescription:
      "Observera fåglar i deras naturliga miljöer som en hobby.",
  },
  {
    interestId: "philately",
    interestTitle: "Filateli",
    interestDescription: "Att samla eller studera frimärken.",
  },
  {
    interestId: "amateur-radio",
    interestTitle: "Amatörradio",
    interestDescription:
      "Användning av olika typer av radioutrustning för att kommunicera med andra radiolyssnare för allmän service, rekreation och egen träning.",
  },
  {
    interestId: "model-building",
    interestTitle: "Modellbygge",
    interestDescription:
      "Skapa repliker av objekt eller strukturer i en mindre skala, som modellbilar, båtar, flygplan och tåg.",
  },
  {
    interestId: "gardening",
    interestTitle: "Trädgårdsskötsel",
    interestDescription: "Odla och vårda växter.",
  },
  {
    interestId: "beekeeping",
    interestTitle: "Biodling",
    interestDescription:
      "Underhåll av bikupor, vanligtvis i bikupor, av människor.",
  },
  {
    interestId: "furniture-restoration",
    interestTitle: "Möbelrenovering",
    interestDescription:
      "Processen att återställa gamla möbler till sitt ursprungliga utseende och funktionalitet.",
  },
  {
    interestId: "homebrewing",
    interestTitle: "Hembryggning",
    interestDescription:
      "Bryggning av öl, sake, cider, mjöd och andra drycker genom jäsning i liten skala som en hobby.",
  },
  {
    interestId: "scrapbooking",
    interestTitle: "Scrapbooking",
    interestDescription:
      "Skapa och bevara fotoalbum som ofta är dekorerade och kommenterade.",
  },
  {
    interestId: "cars",
    interestTitle: "Bilar",
    interestDescription:
      "Intresse för bilar, inklusive deras design, teknik, historia och kulturella betydelser.",
  },
  {
    interestId: "airplanes",
    interestTitle: "Flygplan",
    interestDescription:
      "Intresse för flygplan, inklusive deras design, funktion, historia och roll i luftfarten.",
  },
  {
    interestId: "boats",
    interestTitle: "Båtar",
    interestDescription:
      "Intresse för båtar och fartyg, inklusive deras konstruktion, navigering, historia och användningsområden.",
  },
  {
    interestId: "ocean",
    interestTitle: "Hav",
    interestDescription:
      "Intresse för havet som en ekosystem, resurs, miljö och plats för utforskning och rekreation.",
  },
];

const coreSubjects = interests.sort((interest) => !interest.coreSubject);

let i = 0;

const updated = interests.map(
  ({ interestId, interestTitle, interestDescription, coreSubject }) => {
    return {
      interestId: (i++).toString(),
      interestTitle: interestTitle,
      interestDescription: interestDescription,
      coreSubject: coreSubject,
    };
  }
);

const content = updated.reduce((total, interest) => {
  return (
    total +
    `
    {
      "interestId": "${interest.interestId}",
      "interestTitle": "${interest.interestTitle}",
      "interestDescription": "${interest.interestDescription}",
      "coreSubject": ${
        interest.coreSubject === undefined ? false : interest.coreSubject
      }
    },`
  );
}, "");

fs.writeFile("public/dataset/interests.json", "[" + content + "\n]", (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
