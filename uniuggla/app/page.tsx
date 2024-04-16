import Image from "next/image";

export default function Home() {
  return (
    <main>
      <header>
        <img src = "../../uniu_logo_inkscape.svg" alt="Error"/> 
      </header>
       <div className="body">
        <p className="bot">Bot:Tomorow </p>
        <p className="user">User: Robot Serif</p>
        <p className="logo"> Tomorow</p>
        <p className="Site"> Tomorow </p>

        <a href="" className="siteNavigation">Test Site Navigation</a>
        <input type="text" id="userIntrest" name="name"></input>
        <button type="button">Test button</button>

        <ul>
            <li><p className="bot">Biokemi KTH</p></li>
            <li><p className="bot">Handels Chalmers</p></li>
            <li><p className="bot">Teknisk fysik KTH</p></li>
        </ul>
        </div>
      <footer>
        <div className="footerLeft">
        <div className="footerLine"></div>
          <div className="footerListDiv">
            <ul className="footerList">
              <li><p className="siteNavigation">Hitta program</p></li>
              <li><p className="siteNavigation">Räkna antagningspoäng</p></li>
              <li><p className="siteNavigation">Se behörighetskrav</p></li>
            </ul>
          </div>
        </div>
        <div className="footerLogoDiv">
          <p className="logo">UNIU</p>
        </div>
      </footer> 
    </main>
  );
}
