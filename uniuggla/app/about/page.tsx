export default function About() {
	// HTML code, within <main>
	return (
		<main>
			<div className="title" style={{ marginTop: "12vh" }}>
				<p className="bot">OM UNIU</p>

				<div className="body" style={{ marginTop: "4vh" }}>
					<p className="bot">UNIU är din AI-baserade studievägledare som kan hjälpa dig <br></br> att hitta din drömutbildning baserat på dina intressen. <br></br> Vi baserar våra svar på marjoriteten av all universitets/högskole utbildningar</p>
				</div>
				<div className="body" style={{ marginTop: "3vh" }}>
					<p className="bot">Hemsidan har skapats av 8st KTH-studenter för kursen II1305, <br></br>Projekt inom informations- och kommunikationsteknik, under våren 2024.</p>
				</div>
				<div className="body" style={{ marginTop: "3vh" }}>
					<p className="bot">Utvecklingen av hemsidan fortlöpte under Scrum ramverket med sprintar som motsvarade 4st arbetsveckor. <br></br> Mer information om projektet kan läsas här: <a href="https://ladusvala2024.wixsite.com/teamladusvala"> projekt sida</a></p>
				</div>
			</div>
			<div className="body" style={{margin: "0 auto", textAlign: "left", width: "max-content", display: "block"}}>
					<p className="user" style={{ marginTop: "3vh", textDecoration: "underline"}}> UTVECKLARE </p>
					<p className="bot" style={{ marginTop: "0.5vh"}}> Elias Gaghlasian </p>
					<p className="bot" style={{ marginTop: "0.5vh"}}> Fredrik Berzins </p>
					<p className="bot" style={{ marginTop: "0.5vh"}}> Karl-Johan Jakobsson Wejnefalk</p>
					<p className="bot" style={{ marginTop: "0.5vh"}}> Love Mitteregger </p>
					<p className="bot" style={{ marginTop: "0.5vh"}}> Naveed Rahman </p>
					<p className="bot" style={{ marginTop: "0.5vh"}}> Oscar Gertling </p>
					<p className="bot" style={{ marginTop: "0.5vh"}}> Rasmus Sjöberg </p>
					<p className="bot" style={{ marginTop: "0.5vh"}}> Victor Karlström </p>
			</div>
			<div className="body">
				<p className="user" style={{ marginTop: "2.5vh"}}> Den applicerade AI-modellen är OpenAI:s ChatGPT 3.5 Turbo </p>
				<p className="user" style={{ marginTop: "1.5vh"}}> Information om utbildningsprogrammen är hämtat från respektive utbildningsprograms lärosäte. </p>
				<p className="user" style={{ marginTop: "1.5vh"}}> Jämförelsetalsräknaren är baserad på den metod för uträkning av jämförelsetal som Antagning.se applicerar</p>
				<p className="user" style={{ marginTop: "1.5vh"}}> Copyright: </p>
			</div>
		</main>
	);
}