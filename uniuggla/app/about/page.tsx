export default function About() {
	// HTML code, within <main>
	return (
		<main>
			<div className="wrapper">
				<div className="body" style={{ marginTop: "18vh" }}>
					<div className="user" style={{ marginTop: "2vh" }}>
						<p>UNIU är Europas första AI-baserade studievägledare som kan hjälpa dig att hitta din drömutbildning baserat på dina intressen.<br></br> De utbildningar som UNIU rekommenderar är hämtade från majoriteten av alla universitets-/högskoleutbildningar i Sverige.<br></br>Matchningen sker med hjälp av ChatGPT 3.5 Turbo från OpenAI.</p>
					</div>
					<div className="user" style={{ marginTop: "2vh" }}>
						<p>UNIU skapades av åtta KTH-studenter för kursen II1305, Projekt inom informations- och kommunikationsteknik, under våren 2024.<br></br>Utvecklingen av hemsidan pågick under fyra arbetsveckor och applicerade Scrum som samarbetesramverk.<br></br>
					   Mer information om projektet kan läsas här: <a className="aboutUsLink" href="https://ladusvala2024.wixsite.com/teamladusvala"> Team Ladusvala </a></p>
					</div>
					<div className="user" style={{ marginTop: "2vh" }}>
						<p>Hemsidan UNIU.nu är primärt byggd i TypeScript-kod och applicerar Next.js som React-ramverk, hosting sker via Vercel.
							<br></br>Designen av hemsidan framställdes via Figma.</p>
					</div>
				</div>
				<div className="body" style={{margin: "0 auto", textAlign: "left", width: "max-content", display: "block"}}>
						<p className="user" style={{ marginTop: "3vh", textDecoration: "underline"}}> UTVECKLARE </p>
						<p style={{ marginTop: "0.5vh"}}> Elias Gaghlasian </p>
						<p style={{ marginTop: "0.5vh"}}> Fredrik Berzins </p>
						<p style={{ marginTop: "0.5vh"}}> Karl-Johan Jakobsson Wejnefalk</p>
						<p style={{ marginTop: "0.5vh"}}> Love Mitteregger </p>
						<p style={{ marginTop: "0.5vh"}}> Naveed Rahman </p>
						<p style={{ marginTop: "0.5vh"}}> Oscar Gertling </p>
						<p style={{ marginTop: "0.5vh"}}> Rasmus Sjöberg </p>
						<p style={{ marginTop: "0.5vh"}}> Victor Karlström </p>
				</div>
				<div className="body">
					<p className="user" style={{ marginTop: "1.5vh"}}> Information om utbildningsprogrammen är hämtat från respektive utbildningsprograms lärosäte. </p>
					<p className="user" style={{ marginTop: "1.5vh"}}> Jämförelsetalsräknaren är baserad på den metod för uträkning av jämförelsetal som Antagning.se applicerar</p>
					<p className="user" style={{ marginTop: "1.5vh"}}> 
<br></br>
<br></br>
COPYRIGHT 2024 TEAM LADUSVALA*
<br></br>
<br></br>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
<br></br>
<br></br>
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
<br></br>
<br></br>
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
<br></br>
<br></br>
</p>
<p className="user" style={{ marginTop: "1.5vh"}}> 
*Team Ladusvala consists of:
Elias Gaghlasian, Fredrik Berzins, Karl-Johan Jakobsson Wejnefalk, Love Mitteregger, Naveed Rahman, Oscar Gertling, Rasmus Sjöberg, Victor Karlström</p>
				</div>
			</div>
		</main>
	);
}
