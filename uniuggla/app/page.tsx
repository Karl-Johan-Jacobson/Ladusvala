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
        <p className="siteNavigation"> Tomorow </p>
        <a href="" className="siteNavigation"><p className="link">Test Site Navigation</p></a>

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
              <li><a href="page"><p className="siteNavigation">Hitta program</p></a></li>
              <li><a href="count"><p className="siteNavigation">Räkna antagningspoäng</p></a></li>
              <li><a href="requerierment"><p className="siteNavigation">Se behörighetskrav</p></a></li>
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
