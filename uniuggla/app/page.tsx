import Image from "next/image";

export default function Home() {
  return (
    <main>
      <header>
        <img src = "../../uniu_logo_filled.svg" alt="Logo"/> 
      </header>
      <div className="body typewriter">
        <p className="bot">Vill du gå på högskola eller Universitet?</p>
      </div>
      <div className = "firstAnswer">
        <button className = "yesButton"><p className="bot">Ja</p></button>
        <button className = "noButton"><p className="bot">Nej</p></button>
      </div>
  
      <footer>
        <div className="footerLeft">
        <div className="footerLine"></div>
          <div className="footerListDiv">
            <ul className="footerList">
              <li><a href="page"><p className="siteNavigation">Hitta program</p></a></li>
              <li><a href="count"><p className="siteNavigation">Räkna antagningspoäng</p></a></li>
              <li><a href="req"><p className="siteNavigation">Se behörighetskrav</p></a></li>
            </ul>
          </div>
        </div>
        <div className="footerLogoDiv">
          <img src = "../../text_logo.png" alt="Logo_Text"/> 
        </div>
      </footer> 
    </main>
  );
}
