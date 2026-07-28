import Link from 'next/link'
import React from 'react'

type Prop = {
    scrolled: boolean
}

const Navbar = ({scrolled}: Prop) => {
  return (
    <div> <nav className={`fr-navbar${scrolled ? " scrolled" : ""}`}>
        <div className="fr-logo">
          <span className="fr-logo-mark" />
          AURA DENTAL
        </div>
        <div className="fr-nav-links">
          <a href="#accueil">Accueil</a>
          <a href="#services">Services</a>
          <a href="#pourquoi-nous">Pourquoi Nous</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
        <Link href={"/rendez-vous"}>
          <button className="rounded-full bg-[#18181b] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#3f3f46] focus:outline-none focus:ring-2 focus:ring-gray-400">
            <span>Prendre Rendez-vous</span>
          </button>
        </Link>
      </nav></div>
  )
}

export default Navbar