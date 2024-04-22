import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <img src="../../uniu_logo_filled.svg" alt="Logo" />
      </Link>
    </header>
  );
}
