"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Prop = {
  scrolled: boolean;
};

const Navbar = ({ scrolled }: Prop) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On home, anchors scroll on the same page.
  // On any other page, prefix with "/" so Next.js navigates
  // back to home and then jumps to the anchor.
  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: isHome ? "#services" : "/#services" },
    { label: "Pourquoi Nous", href: isHome ? "#pourquoi-nous" : "/#pourquoi-nous" },
    { label: "FAQ", href: isHome ? "#faq" : "/#faq" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <div className="fr-page">
      <nav className={`fr-navbar${scrolled ? " scrolled" : ""}`}>
        <Link href={"/"}>
          <div className="group inline-flex items-center gap-3.5 focus:outline-none">
            {/* Icône SVG : Dent géométrique & Éclat d'Aura */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0EA5A0] via-[#0D9488] to-[#D4AF37] p-2 text-white shadow-md shadow-[#0EA5A0]/20 transition-transform duration-300 group-hover:scale-105">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full stroke-current"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 6C12.5 6 10 8.5 10 12.5C10 16 11.2 18.2 12 21.5C12.7 24.3 13 27 14.5 27C15.5 27 15.8 24 16 22.5C16.2 24 16.5 27 17.5 27C19 27 19.3 24.3 20 21.5C20.8 18.2 22 16 22 12.5C22 8.5 19.5 6 16 6Z" />
                <path
                  d="M25 7L27 9M27 7L25 9"
                  strokeWidth="1.5"
                  className="text-[#FFE58F]"
                />
              </svg>
            </div>

            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl font-medium tracking-tight text-black transition-colors duration-200 group-hover:text-[#2DD4BF]">
                AURA
              </span>
              <span className="mt-1 text-[10px] font-semibold tracking-[0.28em] uppercase text-[#A1A1AA]">
                DENTAL
              </span>
            </div>
          </div>
        </Link>

        <div className="fr-nav-links">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
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