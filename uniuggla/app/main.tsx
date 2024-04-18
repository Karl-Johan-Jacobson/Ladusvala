import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="body">
        <div>
          <p className="bot">Vill du gå på högskola eller Universitet?</p>
        </div>
        <div>
          <button><p className="bot">Ja</p></button>
          <button><p className="bot">Nej</p></button>
        </div>
      </div>
    </main>
  );
}