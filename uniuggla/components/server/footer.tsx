import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footerLeft">
        <div className="footerLine"></div>
        <div className="footerListDiv">
          <ul className="footerList">
            <li>
              <Link href="/" className="siteNavigation">
                Hitta program
              </Link>
            </li>
            <li>
              <Link href="/count" className="siteNavigation">
                Räkna antagningspoäng
              </Link>
            </li>
            <li>
              <Link href="/req" className="siteNavigation">
                Se behörighetskrav
              </Link>
            </li>
            <li>
              <Link href="/about" className="siteNavigation">
                Om oss
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footerLogoDiv">
        <img src="../../text_logo.png" alt="Logo_Text" />
      </div>
    </footer>
  );
}