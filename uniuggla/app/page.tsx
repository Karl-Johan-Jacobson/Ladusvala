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
      <div>
        <button><p className="bot">Ja</p></button>
        <button><p className="bot">Nej</p></button>
      </div>
      <div className="body">
       <div className="body">
        <p className="bot">Bot:Tomorow </p>
        <p className="user">User: Robot Serif</p>
        <p className="logo"> Tomorow</p>
        <p className="siteNavigation"> Tomorow </p>
        <a href="" className="siteNavigation"><p className="link">Test Site Navigation</p></a>

        <input type="text" placeholder="intrests"></input>
        <button type="button"><p className="bot">Test button</p></button>

        <ul>
            <li><p className="bot">Biokemi KTH</p></li>
            <li><p className="bot">Handels Chalmers</p></li>
            <li><p className="bot">Teknisk fysik KTH</p></li>
        </ul>
      </div>
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
