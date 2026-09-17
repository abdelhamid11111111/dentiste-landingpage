import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#161616] py-16 text-[#A1A1AA]">
      <div className="mx-auto flex max-w-7xl flex-col space-y-12 px-6 sm:px-8 lg:flex-row lg:justify-between lg:space-y-0">
        {/* Column 1: Brand */}
        <div className="flex max-w-sm flex-col">
          <div className="flex items-center gap-3">
            
            <Link href={"/"}>
              <div
                className={`group inline-flex items-center gap-3.5 focus:outline-none `}
              >
                {/* SVG icon: geometric tooth & Aura sparkle */}
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
                    {/* Clean tooth silhouette */}
                    <path d="M16 6C12.5 6 10 8.5 10 12.5C10 16 11.2 18.2 12 21.5C12.7 24.3 13 27 14.5 27C15.5 27 15.8 24 16 22.5C16.2 24 16.5 27 17.5 27C19 27 19.3 24.3 20 21.5C20.8 18.2 22 16 22 12.5C22 8.5 19.5 6 16 6Z" />
                    {/* Light sparkle (Aura) */}
                    <path
                      d="M25 7L27 9M27 7L25 9"
                      strokeWidth="1.5"
                      className="text-[#FFE58F]"
                    />
                  </svg>
                </div>

                {/* Brand typography */}
                <div className="flex flex-col leading-none">
                  <span className="font-serif text-xl font-medium tracking-tight text-white transition-colors duration-200 group-hover:text-[#2DD4BF]">
                    AURA
                  </span>
                  <span className="mt-1 text-[10px] font-semibold tracking-[0.28em] uppercase text-[#A1A1AA]">
                    DENTAL
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-[#A1A1AA]">
            Swiss-precision dentistry in a calm, modern setting. Complete care,
            from the routine check-up to a full smile design.
          </p>
        </div>

        {/* Column 2: Quick links */}
        <div className="flex flex-col">
          <h3 className="mb-6 text-xs font-semibold tracking-[0.15em] text-[#A1A1AA] uppercase">
            Quick Links
          </h3>
          <ul className="flex flex-col space-y-4 text-[15px] text-[#E4E4E7]">
            <li>
              <Link
                href={"/"}
                className="hover:text-teal-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/services"}
                className="hover:text-teal-400 transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className="hover:text-teal-400 transition-colors"
              >
                Why Us
              </Link>
            </li>
            <li>
              <Link
                href={"/faq"}
                className="hover:text-teal-400 transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Hours */}
        <div className="flex flex-col">
          <h3 className="mb-6 text-xs font-semibold tracking-[0.15em] text-[#A1A1AA] uppercase">
            Opening Hours
          </h3>
          <ul className="flex flex-col space-y-4 text-[15px] text-[#E4E4E7]">
            <li>Mon – Fri: 8:00 am – 7:00 pm</li>
            <li>Saturday: 9:00 am – 3:00 pm</li>
            <li>Sunday: Closed</li>
            <li>Emergency line: 24/7</li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col">
          <h3 className="mb-6 text-xs font-semibold tracking-[0.15em] text-[#A1A1AA] uppercase">
            Contact
          </h3>
          <ul className="flex flex-col space-y-4 text-[15px] text-[#E4E4E7]">
            <li>
              <a
                href="mailto:hello@auradental.example"
                className="hover:text-teal-400 transition-colors"
              >
                hello@auradental.example
              </a>
            </li>
            <li>
              <a
                href="tel:+14155550192"
                className="hover:text-teal-400 transition-colors"
              >
                +1 (415) 555-0192
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
