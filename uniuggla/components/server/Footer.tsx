export default function Footer() {
	return (
		<footer>
			<div className="footerLine"></div>
			<div className="footerLeft">
				<div className="footerListDiv">
					<ul className="footerList">
						<li>
							<a href="/" className="siteNavigation">
								Hitta program
							</a>
						</li>
						<li>
							<a href="/count" className="siteNavigation">
								Räkna antagningspoäng
							</a>
						</li>
						<li>
							<a href="/req" className="siteNavigation">
								Se behörighetskrav
							</a>
						</li>
						<li>
							<a href="/about" className="siteNavigation">
								Om oss
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="footerLogoDiv">
				<p> UNIU </p>
			</div>
		</footer>
	);
}
