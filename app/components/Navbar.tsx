import Link from "next/link";
import React from "react";

type Prop = {
  scrolled: boolean;
};

const Navbar = ({ scrolled }: Prop) => {
  return (
    <div>
      <nav className={`fr-navbar${scrolled ? " scrolled" : ""}`}>
        <Link href={'/'}>
        <div className="fr-logo">
          <span className="fr-logo-mark" />
          AURA DENTAL
        </div>
        </Link>
        <div className="fr-nav-links">
          <Link href="#accueil">Accueil</Link>
          <Link href="#services">Services</Link>
          <Link href="#pourquoi-nous">Pourquoi Nous</Link>
          <Link href="#faq">FAQ</Link>
          <Link href="#contact">Contact</Link>
        </div>
        <Link href={"/rendez-vous"}>
          <button className="rounded-full bg-[#18181b] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#3f3f46] focus:outline-none focus:ring-2 focus:ring-gray-400">
            <span>Prendre Rendez-vous</span>
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
