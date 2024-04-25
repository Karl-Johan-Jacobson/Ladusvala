const shArray = [
  "https://www.sh.se/program--kurser/program/grund/arkivarie--och-informationsforvaltningsprogrammet/inriktningar/foretagsekonomi",
  "https://www.sh.se/program--kurser/program/grund/arkivarie--och-informationsforvaltningsprogrammet/inriktningar/journalistik",
  "https://www.sh.se/program--kurser/program/grund/arkivarie--och-informationsforvaltningsprogrammet/inriktningar/statsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/arkivarie--och-kulturarvsprogrammet/inriktningar/arkeologi",
  "https://www.sh.se/program--kurser/program/grund/arkivarie--och-kulturarvsprogrammet/inriktningar/etnologi",
  "https://www.sh.se/program--kurser/program/grund/arkivarie--och-kulturarvsprogrammet/inriktningar/historia",
  "https://www.sh.se/program--kurser/program/grund/arkivarie--och-kulturarvsprogrammet/inriktningar/idehistoria",
  "https://www.sh.se/program--kurser/program/grund/arkivarie--och-kulturarvsprogrammet/inriktningar/konstvetenskap",
  "https://www.sh.se/program--kurser/program/grund/arkivarie--och-kulturarvsprogrammet/inriktningar/religionsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/bibliotekarieprogrammet",
  "https://www.sh.se/program--kurser/program/grund/digital-affarsutveckling-inom-event-och-projekt",
  "https://www.sh.se/program--kurser/program/grund/ekonomi-teknik-och-design",
  "https://www.sh.se/program--kurser/program/grund/ekonomie-kandidatprogrammet/inriktningar/foretagsekonomi",
  "https://www.sh.se/program--kurser/program/grund/ekonomie-kandidatprogrammet/inriktningar/nationalekonomi",
  "https://www.sh.se/program--kurser/program/grund/entreprenorskap-innovation-och-marknad",
  "https://www.sh.se/program--kurser/program/grund/estetikprogrammet",
  "https://www.sh.se/program--kurser/program/grund/europaprogrammet/inriktningar/etnologi",
  "https://www.sh.se/program--kurser/program/grund/europaprogrammet/inriktningar/offentlig-ratt",
  "https://www.sh.se/program--kurser/program/grund/europaprogrammet/inriktningar/religionsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/europaprogrammet/inriktningar/statsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/europaprogrammet/inriktningar/miljovetenskap",
  "https://www.sh.se/program--kurser/program/grund/filosofi-politik-och-ekonomi/inriktningar/filosofi",
  "https://www.sh.se/program--kurser/program/grund/filosofi-politik-och-ekonomi/inriktningar/statsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/filosofi-politik-och-ekonomi/inriktningar/nationalekonomi",
  "https://www.sh.se/program--kurser/program/grund/forskollararutbildning-med-interkulturell-profil",
  "https://www.sh.se/program--kurser/program/grund/forskollararutbildning-med-interkulturell-profil-erfarenhetsbaserad",
  "https://www.sh.se/program--kurser/program/grund/forvaltningsprogrammet---offentlig-organisation-och-ledning",
  "https://www.sh.se/program--kurser/program/grund/genusvetarprogrammet",
  "https://www.sh.se/program--kurser/program/grund/globala-utvecklingsstudier",
  "https://www.sh.se/program--kurser/program/grund/grundlararutbildning-med-interkulturell-profil-med-inriktning-mot-fritidshem",
  "https://www.sh.se/program--kurser/program/grund/grundlararutbildning-med-interkulturell-profil-med-inriktning-mot-fritidshem-arbetsintegrerad",
  "https://www.sh.se/program--kurser/program/grund/grundlararutbildning-med-interkulturell-profil-med-inriktning-mot-fritidshem-erfarenhetsbaserad",
  "https://www.sh.se/program--kurser/program/grund/grundlararutbildning-med-interkulturell-profil-med-inriktning-mot-forskoleklass-och-arskurs-1-3",
  "https://www.sh.se/program--kurser/program/grund/grundlararutbildning-med-interkulturell-profil-mot-arskurs-4-6",
  "https://www.sh.se/program--kurser/program/grund/historikerprogrammet",
  "https://www.sh.se/program--kurser/program/grund/hallbarhetsstrateg",
  "https://www.sh.se/program--kurser/program/grund/interkulturellt-foretagande/inriktningar/etnologi",
  "https://www.sh.se/program--kurser/program/grund/interkulturellt-foretagande/inriktningar/religionsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/interkulturellt-foretagande/inriktningar/foretagsekonomi",
  "https://www.sh.se/program--kurser/program/grund/internationell-migration-och-etniska-relationer-imer/inriktningar/etnologi",
  "https://www.sh.se/program--kurser/program/grund/internationell-migration-och-etniska-relationer-imer/inriktningar/historia",
  "https://www.sh.se/program--kurser/program/grund/internationell-migration-och-etniska-relationer-imer/inriktningar/offentlig-ratt",
  "https://www.sh.se/program--kurser/program/grund/internationell-migration-och-etniska-relationer-imer/inriktningar/religionsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/internationell-migration-och-etniska-relationer-imer/inriktningar/sociologi",
  "https://www.sh.se/program--kurser/program/grund/internationell-migration-och-etniska-relationer-imer/inriktningar/statsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/internationella-ekonomprogrammet",
  "https://www.sh.se/program--kurser/program/grund/it-medier-och-design",
  "https://www.sh.se/program--kurser/program/grund/journalistik-med-samhallsstudier/inriktningar/etnologi",
  "https://www.sh.se/program--kurser/program/grund/journalistik-med-samhallsstudier/inriktningar/historia",
  "https://www.sh.se/program--kurser/program/grund/journalistik-med-samhallsstudier/inriktningar/idehistoria",
  "https://www.sh.se/program--kurser/program/grund/journalistik-med-samhallsstudier/inriktningar/religionsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/journalistik-med-samhallsstudier/inriktningar/sociologi",
  "https://www.sh.se/program--kurser/program/grund/journalistik-med-samhallsstudier/inriktningar/statsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/journalistik-och-digitala-medier",
  "https://www.sh.se/program--kurser/program/grund/kandidatprogram-i-juridik-med-inriktning-mot-affarsratt-och-offentlig-ratt",
  "https://www.sh.se/program--kurser/program/grund/kandidatprogram-i-liberal-arts",
  "https://www.sh.se/program--kurser/program/grund/kommunikatorsprogrammet",
  "https://www.sh.se/program--kurser/program/grund/kompletterande-pedagogisk-utbildning-med-inriktning-mot-gymnasieskolan/inriktningar/biologi",
  "https://www.sh.se/program--kurser/program/grund/kompletterande-pedagogisk-utbildning-med-inriktning-mot-gymnasieskolan/inriktningar/engelska",
  "https://www.sh.se/program--kurser/program/grund/kompletterande-pedagogisk-utbildning-med-inriktning-mot-gymnasieskolan/inriktningar/filosofi",
  "https://www.sh.se/program--kurser/program/grund/kompletterande-pedagogisk-utbildning-med-inriktning-mot-gymnasieskolan/inriktningar/foretagsekonomi",
  "https://www.sh.se/program--kurser/program/grund/kompletterande-pedagogisk-utbildning-med-inriktning-mot-gymnasieskolan/inriktningar/geografi",
  "https://www.sh.se/program--kurser/program/grund/kompletterande-pedagogisk-utbildning-med-inriktning-mot-gymnasieskolan/inriktningar/historia",
  "https://www.sh.se/program--kurser/program/grund/kompletterande-pedagogisk-utbildning-med-inriktning-mot-gymnasieskolan/inriktningar/psykologi",
  "https://www.sh.se/program--kurser/program/grund/kompletterande-pedagogisk-utbildning-med-inriktning-mot-gymnasieskolan/inriktningar/religionskunskap",
  "https://www.sh.se/program--kurser/program/grund/kompletterande-pedagogisk-utbildning-med-inriktning-mot-gymnasieskolan/inriktningar/samhallskunskap",
  "https://www.sh.se/program--kurser/program/grund/kompletterande-pedagogisk-utbildning-med-inriktning-mot-gymnasieskolan/inriktningar/svenska",
  "https://www.sh.se/program--kurser/program/grund/konst-kultur-och-ekonomi/inriktningar/idehistoria",
  "https://www.sh.se/program--kurser/program/grund/konst-kultur-och-ekonomi/inriktningar/foretagsekonomi",
  "https://www.sh.se/program--kurser/program/grund/kulturanalys-med-inriktning-hallbar-utveckling",
  "https://www.sh.se/program--kurser/program/grund/logistik-och-ekonomi",
  "https://www.sh.se/program--kurser/program/grund/management-med-it",
  "https://www.sh.se/program--kurser/program/grund/medier-engelska-och-globalisering",
  "https://www.sh.se/program--kurser/program/grund/medievetarprogrammet",
  "https://www.sh.se/program--kurser/program/grund/miljo-och-utveckling",
  "https://www.sh.se/program--kurser/program/grund/personalvetarprogrammet/inriktningar/psykologi",
  "https://www.sh.se/program--kurser/program/grund/personalvetarprogrammet/inriktningar/sociologi",
  "https://www.sh.se/program--kurser/program/grund/polisprogrammet",
  "https://www.sh.se/program--kurser/program/grund/religionsvetenskapligt-program",
  "https://www.sh.se/program--kurser/program/grund/retorikkonsultprogrammet-inriktning-mot-politisk-kommunikation-och-hallbar-utveckling",
  "https://www.sh.se/program--kurser/program/grund/retorikkonsultprogrammet-inriktning-mot-radgivning-och-utbildning",
  "https://www.sh.se/program--kurser/program/grund/samhallsplanering-och-gis",
  "https://www.sh.se/program--kurser/program/grund/socionomprogrammet-med-storstadsprofil",
  "https://www.sh.se/program--kurser/program/grund/spelprogrammet/inriktningar/grafik",
  "https://www.sh.se/program--kurser/program/grund/spelprogrammet/inriktningar/speldesign-och-scripting",
  "https://www.sh.se/program--kurser/program/grund/sport-management",
  "https://www.sh.se/program--kurser/program/grund/turismprogrammet",
  "https://www.sh.se/program--kurser/program/grund/amneslararutbildning-med-interkulturell-profil-med-inriktning-mot-gymnasieskolan/inriktningar/engelska",
  "https://www.sh.se/program--kurser/program/grund/amneslararutbildning-med-interkulturell-profil-med-inriktning-mot-gymnasieskolan/inriktningar/svenska",
  "https://www.sh.se/program--kurser/program/grund/amneslararutbildning-med-interkulturell-profil-med-inriktning-mot-gymnasieskolan/inriktningar/religionsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/amneslararutbildning-med-interkulturell-profil-med-inriktning-mot-gymnasieskolan/inriktningar/historia",
  "https://www.sh.se/program--kurser/program/grund/amneslararutbildning-med-interkulturell-profil-med-inriktning-mot-gymnasieskolan/inriktningar/samhallsvetenskap",
  "https://www.sh.se/program--kurser/program/grund/amneslararutbildning-med-interkulturell-profil-med-inriktning-mot-gymnasieskolan/inriktningar/svenska-som-andrasprak"
];