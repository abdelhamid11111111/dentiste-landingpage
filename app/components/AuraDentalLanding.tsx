"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Image } from "sanity";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useGsapScrollAnimations } from "../hooks/useGsapScrollAnimations";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Option 2: Phosphor Icons Integration
import {
  Tooth,
  MagnifyingGlass,
  Sparkle,
  Gear,
  SlidersHorizontal,
  Pulse,
  ShieldCheck,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   CONTENT DATA (EN)
   ============================================================ */

interface OrbitItem {
  label: string;
}

const orbitData: OrbitItem[] = [
  { label: "Invisalign® Provider" },
  { label: "Straumann Implants" },
  { label: "ADA Member" },
  { label: "Swiss Dental Technology" },
  { label: "ISO 9001 Certified" },
  { label: "Diamond Provider" },
];

interface Service {
  name: string;
  desc: string;
  Icon: React.ComponentType<React.ComponentProps<typeof Tooth>>;
}

/* ------------------------------------------------------------
   SERVICE ICONS (@phosphor-icons/react - Option 2)
   ------------------------------------------------------------ */

function GeneralCheckupIcon(props: React.ComponentProps<typeof Tooth>) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Tooth size={38} weight="duotone" className="text-[#0EA5A0]" {...props} />
      <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-1 ring-gray-100">
        <MagnifyingGlass size={12} weight="bold" className="text-gray-800" />
      </div>
    </div>
  );
}

function WhiteningIcon(props: React.ComponentProps<typeof Tooth>) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Tooth size={38} weight="duotone" className="text-[#0EA5A0]" {...props} />
      <Sparkle
        size={18}
        weight="fill"
        className="absolute -top-1.5 -right-1.5 text-amber-400 animate-pulse"
      />
    </div>
  );
}

function ImplantsIcon(props: React.ComponentProps<typeof Tooth>) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Tooth size={38} weight="duotone" className="text-[#0EA5A0]" {...props} />
      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-1 ring-gray-100">
        <Gear size={12} weight="bold" className="text-gray-800" />
      </div>
    </div>
  );
}

function InvisalignIcon(props: React.ComponentProps<typeof Tooth>) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Tooth size={38} weight="duotone" className="text-[#0EA5A0]" {...props} />
      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-1 ring-gray-100">
        <SlidersHorizontal size={12} weight="bold" className="text-gray-800" />
      </div>
    </div>
  );
}

function RootCanalIcon(props: React.ComponentProps<typeof Tooth>) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Tooth size={38} weight="duotone" className="text-[#0EA5A0]" {...props} />
      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-1 ring-gray-100">
        <Pulse size={12} weight="bold" className="text-rose-500" />
      </div>
    </div>
  );
}

function VeneersIcon(props: React.ComponentProps<typeof Tooth>) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Tooth size={38} weight="duotone" className="text-[#0EA5A0]" {...props} />
      <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-1 ring-gray-100">
        <ShieldCheck size={12} weight="bold" className="text-teal-600" />
      </div>
    </div>
  );
}

// Default icon, used when a title coming from Sanity does not match
// any of the known icons below.
function DefaultServiceIcon(props: React.ComponentProps<typeof Tooth>) {
  return (
    <Tooth size={38} weight="duotone" className="text-[#0EA5A0]" {...props} />
  );
}

// Map: exact service title (Sanity) -> local icon.
// If a title matches nothing here, DefaultServiceIcon is used.
// The French keys are kept as aliases so service documents still
// published in French in the Studio keep their icon.
const iconMap: Record<
  string,
  React.ComponentType<React.ComponentProps<typeof Tooth>>
> = {
  "General Check-up": GeneralCheckupIcon,
  "Teeth Whitening": WhiteningIcon,
  "Dental Implants": ImplantsIcon,
  "Invisalign®": InvisalignIcon,
  "Root Canal Treatment": RootCanalIcon,
  Veneers: VeneersIcon,
  "Contrôle Général": GeneralCheckupIcon,
  "Blanchiment des Dents": WhiteningIcon,
  "Implants Dentaires": ImplantsIcon,
  "Traitement de Canal": RootCanalIcon,
  Facettes: VeneersIcon,
};

// This array is the fallback list used when the Sanity Studio is empty.
const services: Service[] = [
  {
    name: "General Check-up",
    desc: "Thorough exams and cleanings that keep small problems from becoming big ones.",
    Icon: GeneralCheckupIcon,
  },
  {
    name: "Teeth Whitening",
    desc: "Clinically supervised brightening, calibrated to your own enamel.",
    Icon: WhiteningIcon,
  },
  {
    name: "Dental Implants",
    desc: "Straumann precision implants placed with 3D guidance.",
    Icon: ImplantsIcon,
  },
  {
    name: "Invisalign®",
    desc: "Clear aligners designed from a full digital simulation of your bite.",
    Icon: InvisalignIcon,
  },
  {
    name: "Root Canal Treatment",
    desc: "Microscope-assisted therapy, designed to be genuinely painless.",
    Icon: RootCanalIcon,
  },
  {
    name: "Veneers",
    desc: "Hand-shaped porcelain shells matched to your natural shade.",
    Icon: VeneersIcon,
  },
];

interface FaqItem {
  q: string;
  a: string;
}

const faqData: FaqItem[] = [
  {
    q: "Are there hidden costs in my treatment plan?",
    a: "No. Every plan comes with a fixed quote and a 3D visualisation before any care begins, and it does not change once treatment has started.",
  },
  {
    q: "Do you offer sedation for anxious patients?",
    a: "Yes. We offer nitrous oxide, oral sedation and IV sedation, matched to your comfort level after a short conversation beforehand.",
  },
  {
    q: "How does the AI Smile Preview work?",
    a: "We scan your bite and generate a realistic 3D preview of the result, so you can see it before committing to a plan.",
  },
  {
    q: "Are your implants and aligners certified?",
    a: "Yes. We use Straumann implant systems and are a certified Invisalign Diamond provider, both audited every year.",
  },
  {
    q: "What should I expect at my first visit?",
    a: "A full exam, a digital scan and an honest conversation about options and costs — usually 45 to 60 minutes, with no drilling needed.",
  },
];

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/auradental",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/auradental",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M15 8h-2c-1.1 0-2 .9-2 2v2H9v3h2v7h3v-7h2.2l.8-3H14v-1.5c0-.4.3-.7.7-.7H16V8Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/auradental",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="8" cy="8.5" r="1" fill="currentColor" stroke="none" />
        <path d="M8 11v6M12 17v-3.5c0-1.4 1-2.5 2.2-2.5S16 12.1 16 13.5V17M12 11v6" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@auradental",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M13 3v11.2a3.3 3.3 0 1 1-2.4-3.18M13 3c.4 2.4 2.1 4 4.6 4.2" />
      </svg>
    ),
  },
];

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export interface SanityService {
  _id: string;
  title: string;
  description: string;
}

export default function AuraDentalLanding({
  sanityServices,
  sanityHero,
}: {
  sanityServices?: SanityService[];
  sanityHero?: { title: string; subtitle: string; img?: Image; word: string };
}) {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // If Sanity has published services, we use them (title + description),
  // reusing the local icons by title.
  // Otherwise (empty Studio) we fall back to the hard-coded list above,
  // so the site is never broken or empty.
  const mergedServices: Service[] =
    sanityServices && sanityServices.length > 0
      ? sanityServices.map((s) => ({
          name: s.title,
          desc: s.description,
          Icon: iconMap[s.title] ?? DefaultServiceIcon,
        }))
      : services;

  const pageRef = useRef<HTMLDivElement>(null);
  useGsapScrollAnimations(pageRef);

  const heroRef = useRef<HTMLElement>(null);
  const orbitBadgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orbitPaused = useRef(false);
  const orbitAngles = useRef<number[]>(
    orbitData.map((_, i) => (i / orbitData.length) * Math.PI * 2),
  );
  const rafId = useRef<number>(1);
  const showcaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* --- Navigation bar: scrolled state --- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Parallax on the hero scene --- */
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      /* The hero CTA sits above the fold: revealed on load, without a
         ScrollTrigger, so that it always stays visible. */
      gsap.fromTo(
        ".fr-hero-ctas button",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.85, delay: 0.35, ease: "power2.out" },
      );

      gsap.to(".fr-hero-visual svg", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(".fr-badge-1", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(".fr-badge-2", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(".fr-badge-3", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, heroRef);

    const imgs = Array.from(document.querySelectorAll("img"));
    const waitForImages = Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
      ),
    );

    waitForImages.then(() => {
      ScrollTrigger.refresh();
    });

    window.addEventListener("load", () => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      window.removeEventListener("load", () => ScrollTrigger.refresh());
    };
  }, []);

  /* --- Scroll effect on images, buttons, cards & links --- */
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const scrollTargets = gsap.utils.toArray<HTMLElement>([
        ".fr-hero-visual",
        ".fr-showcase-card",
        ".fr-service-card",
        ".fr-why-visual img",
        ".fr-btn-gold",
        ".fr-social-btn",
      ]);

      scrollTargets.forEach((target) => {
        gsap.fromTo(
          target,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: target,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const showcaseImages = [
    "https://images.pexels.com/photos/19879741/pexels-photo-19879741/free-photo-of-woman-at-dentists.jpeg",
    "https://img.magnific.com/premium-photo/doctor-uniform-checking-up-female-patient-s-teeth-dental-clinic_104603-4955.jpg?semt=ais_hybrid&w=740&q=80",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDk-X7qENwf-AZhWZ4jmyKV9HlF2VwsDJRp0HJCHXvIfQlkkUvYoWHPASl&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThC0LLFJ8JiMxpmlNihdwFZr4P_a9cn4oSRoDAfuUDYGZWw6PGVd8e6Q&s=10",
    "https://images.squarespace-cdn.com/content/v1/66be95663e8e9b44a62199f0/ece9dade-e560-4b74-ae6d-0862bc00b3de/InvisalignDYD.webp",
  ];

  const showcaseRotations = [-7, 4, -3, 5, -4];

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];
    showcaseRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { rotation: showcaseRotations[i] });
      const t = gsap.to(el, {
        y: i % 2 === 0 ? -16 : 16,
        duration: 2.4 + i * 0.35,
        delay: i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      tweens.push(t);
    });
    return () => tweens.forEach((t) => t.kill());
  }, []);

  /* --- 3D orbit loop (accreditation badges) --- */
  useEffect(() => {
    const radiusX = 260;
    const radiusY = 90;
    const speed = 0.0032;

    const render = (t: number) => {
      orbitData.forEach((_, i) => {
        const el = orbitBadgeRefs.current[i];
        if (!el) return;
        if (!orbitPaused.current) {
          orbitAngles.current[i] =
            (i / orbitData.length) * Math.PI * 2 + t * speed;
        }
        const angle = orbitAngles.current[i];
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY * 0.55;
        const z = Math.sin(angle);
        const scale = 0.72 + ((z + 1) / 2) * 0.5;
        const blur = (1 - (z + 1) / 2) * 3.2;
        const opacity = 0.55 + ((z + 1) / 2) * 0.45;
        const zIndex = Math.round(z * 100) + 100;

        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y - 20}px) scale(${scale})`;
        el.style.filter = `blur(${blur}px)`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
      });
      rafId.current = requestAnimationFrame(render);
    };
    rafId.current = requestAnimationFrame(render);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  /* --- Animated counters (Why Us) --- */
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const triggers: ScrollTrigger[] = [];
    counters.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-count") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      const isDecimal = target % 1 !== 0;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent =
                (isDecimal
                  ? obj.val.toFixed(1)
                  : Math.round(obj.val).toLocaleString("en-US")) + suffix;
            },
          });
        },
      });
      triggers.push(st);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  /* --- 3D tilt on the service cards --- */
  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${py * -8}deg) rotateY(${px * 10}deg) translateY(-4px)`;
  };
  const handleCardLeave = (idx: number) => {
    const card = cardRefs.current[idx];
    if (card) card.style.transform = "";
  };

  /* --- FAQ accordion --- */
  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="fr-page" ref={pageRef}>
      <style>{`
        :root{
          --bg-alabaster:#FAFAF8;
          --bg-canvas:#F4F4F0;
          --teal:#0EA5A0;
          --teal-deep:#0D9488;
          --gold:#D4AF37;
          --border-soft:#E2E8F0;
          --ink:#1A1A1A;
          --ink-soft:#262626;
          --glass:rgba(255,255,255,0.65);
          --footer-dark:#141414;
        }
        .fr-page{
          background:var(--bg-alabaster);
          color:var(--ink);
          font-family:var(--font-jakarta),sans-serif;
          overflow-x:hidden;
          -webkit-font-smoothing:antialiased;
        }
        .fr-page h1, .fr-page h2, .fr-page h3, .fr-page .serif{ font-family:'Fraunces',serif; letter-spacing:-0.01em; }
        .fr-eyebrow{ font-family:var(--font-jakarta),sans-serif; font-size:12px; letter-spacing:.14em; text-transform:uppercase; font-weight:600; color:var(--teal-deep); }
        .fr-page a{ text-decoration:none; color:inherit; }
        .fr-page button{ font-family:inherit; cursor:pointer; }
        .fr-page a:focus-visible, .fr-page button:focus-visible{ outline:2px solid var(--teal-deep); outline-offset:3px; border-radius:8px; }
        @media (prefers-reduced-motion: reduce){
          .fr-page *{ animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important; }
        }

        .fr-navbar{
          position:fixed; top:0; left:0; right:0; z-index:100;
          display:flex; align-items:center; justify-content:space-between;
          padding:22px 5vw;
          transition: background .45s ease, backdrop-filter .45s ease, box-shadow .45s ease, padding .35s ease, border-color .45s ease;
          background:transparent; border-bottom:1px solid transparent;
        }
        .fr-navbar.scrolled{
          padding:12px 5vw; background:rgba(250,250,248,.72);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 12px 30px -18px rgba(0,0,0,.15); border-bottom:1px solid var(--border-soft);
        }
        .fr-logo{ display:flex; align-items:center; gap:10px; font-family:'Fraunces',serif; font-size:19px; font-weight:500; }
        .fr-logo-mark{ width:30px; height:30px; border-radius:99px; background:linear-gradient(135deg, var(--teal) 0%, var(--gold) 100%); display:inline-block; flex-shrink:0; }
        .fr-nav-links{ position:absolute; left:50%; transform:translateX(-50%); display:flex; gap:6px; background: var(--glass); backdrop-filter: blur(10px); border:1px solid rgba(255,255,255,.6); padding:6px; border-radius:999px; box-shadow: 0 8px 24px -14px rgba(0,0,0,.08); }
        .fr-nav-links a{ padding:9px 18px; border-radius:999px; font-size:14px; font-weight:500; color:var(--ink-soft); transition: background .25s ease, color .25s ease; }
        .fr-nav-links a:hover{ background:rgba(13,148,136,.08); color:var(--teal-deep); }
        .fr-btn-outline{ padding:11px 24px; border-radius:999px; font-size:14px; font-weight:600; border:1.5px solid var(--ink); color:var(--ink); transition: border-color .3s ease, color .3s ease, background .3s ease; background:none; }
        .fr-btn-outline:hover{ border-color:var(--teal-deep); color:var(--teal-deep); background:rgba(13,148,136,.06); }

        .fr-hero{ min-height:100vh; min-height:100dvh; padding:clamp(96px, 12vh, 130px) 5vw clamp(24px, 4vh, 40px); box-sizing:border-box; display:grid; grid-template-columns:1.05fr 1fr; gap:clamp(28px, 4vh, 60px); align-items:center; position:relative; }
        .fr-hero-copy{ display:flex; flex-direction:column; justify-content:center; align-items:stretch; }
        .fr-hero-eyebrow-pill{ align-self:flex-start; display:inline-flex; align-items:center; gap:8px; padding:7px 16px; border-radius:999px; background:rgba(212,175,55,.12); border:1px solid rgba(212,175,55,.35); color:#8a6d1f; font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; margin-bottom:clamp(14px, 2.5vh, 26px); }
        .fr-hero-eyebrow-pill .dot{ width:6px; height:6px; border-radius:50%; background:var(--gold); }
        .fr-hero h1{ font-size:clamp(30px, 4vw, 58px); line-height:1.1; font-weight:500; color:var(--ink); margin:0 0 clamp(12px, 2.2vh, 26px); }
        .fr-hero h1 em{ font-style:italic; color:var(--teal-deep); }
        .fr-hero p.lead{ font-size:clamp(14.5px, 1.6vh, 17px); line-height:1.65; color:#4a4a46; max-width:460px; margin:0 0 clamp(16px, 3vh, 38px); }
        .fr-hero-ctas{ display:flex; gap:16px; flex-wrap:wrap; margin-bottom:clamp(18px, 3.4vh, 44px); }
        .fr-hero-trust{ display:flex; align-items:center; gap:18px; }
        .fr-hero-trust .avatars{ display:flex; }
        .fr-hero-trust .avatars div{ width:36px; height:36px; border-radius:50%; border:2.5px solid var(--bg-alabaster); margin-left:-10px; background:linear-gradient(135deg,#cfe8e6,#e9dcb8); }
        .fr-hero-trust .avatars div:first-child{ margin-left:0; }
        .fr-hero-trust-text{ font-size:13px; color:#57534e; }
        .fr-hero-trust-text strong{ color:var(--ink); }

        .fr-hero-visual{ position:relative; border-radius:32px; overflow:hidden; background: linear-gradient(160deg,#e9f3f2 0%, #f4efe0 100%); box-shadow: 0 40px 70px -35px rgba(0,0,0,.18); }
        .fr-hero-visual svg{ width:100%; height:100%; display:block; }
        .fr-float-badge{ position:absolute; background:var(--glass); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border:1px solid rgba(255,255,255,.8); border-radius:16px; padding:10px 16px; display:flex; align-items:center; gap:10px; box-shadow: 0 20px 40px -15px rgba(0,0,0,.14); font-size:12.5px; font-weight:600; color:var(--ink-soft); animation: fr-floatY 4s ease-in-out infinite; transition: transform .3s ease, box-shadow .3s ease; }
        .fr-float-badge:hover{ transform:translateY(-4px) scale(1.04); box-shadow:0 26px 46px -14px rgba(0,0,0,.2); }
        .fr-badge-1{ top:8%; left:8%; animation-delay:0s; }
        .fr-badge-2{ bottom:14%; right:8%; animation-delay:1.3s; }
        .fr-badge-3{ top:44%; right:-6px; animation-delay:.6s; }
        @keyframes fr-floatY{ 0%,100%{ transform:translateY(-8px); } 50%{ transform:translateY(8px); } }

        .fr-showcase-section{ padding:120px 5vw 140px; text-align:center; position:relative; background: var(--bg-canvas); border-top:1px solid var(--border-soft); border-bottom:1px solid var(--border-soft); }
        .fr-showcase-section h2{ font-size:clamp(28px,3.4vw,42px); font-weight:500; margin:0 auto 16px; max-width:620px; }
        .fr-showcase-section .sub{ color:#57534e; font-size:15.5px; line-height:1.7; max-width:540px; margin:0 auto 70px; }
        .fr-showcase-row{ display:flex; justify-content:center; align-items:center; max-width:1100px; margin:0 auto; }
        .fr-showcase-card{
          width:280px; height:350px; margin-left:-30px; border-radius:18px; overflow:hidden;
          box-shadow:0 26px 50px -20px rgba(0,0,0,.28);
          will-change:transform; transition: box-shadow .3s ease;
        }
        .fr-showcase-card:first-child{ margin-left:0; }
        .fr-showcase-card:hover{ box-shadow:0 30px 60px -16px rgba(13,148,136,.35); z-index:20; }
        .fr-showcase-card img{ width:100%; height:100%; object-fit:cover; display:block; }
        @media (max-width: 900px){
          .fr-showcase-row{ flex-wrap:wrap; gap:16px 0; }
          .fr-showcase-card{ margin-left:0 !important; }
        }

        .fr-services{ padding:120px 5vw; }
        .fr-section-head{ text-align:center; max-width:640px; margin:0 auto 64px; }
        .fr-section-head .fr-eyebrow{ display:block; margin-bottom:14px; }
        .fr-section-head h2{ font-size:clamp(30px,3.4vw,44px); font-weight:500; margin:0 0 16px; }
        .fr-section-head p{ color:#57534e; font-size:15.5px; line-height:1.7; }
        .fr-services-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; max-width:1180px; margin:0 auto; perspective:1400px; }
        .fr-service-card{ background:#fff; border:1px solid var(--border-soft); border-radius:24px; padding:34px 28px; position:relative; overflow:hidden; transition: border-color .3s ease, box-shadow .3s ease; transform-style: preserve-3d; }
        .fr-service-card:hover{ border-color:rgba(14,165,160,.4); box-shadow: 0 30px 60px -30px rgba(13,148,136,.28); }
        .fr-service-card .ring{ width:64px; height:64px; border-radius:18px; display:flex; align-items:center; justify-content:center; background:rgba(14,165,160,.08); border:1px solid rgba(14,165,160,.18); margin-bottom:22px; color:var(--teal-deep); }
        .fr-service-card h3{ font-family:var(--font-jakarta),sans-serif; font-size:17px; font-weight:600; margin:0 0 8px; color:var(--ink); }
        .fr-service-card p{ font-size:13.5px; color:#6b6b64; line-height:1.6; margin:0; }
        .fr-service-card .num{ position:absolute; top:26px; right:28px; font-family:'Fraunces',serif; font-size:13px; color:#d6d6cc; font-style:italic; }

        .fr-why-us{ padding:130px 5vw; display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center; background:var(--bg-canvas); position:relative; overflow:hidden; }
        .fr-why-visual{ position:relative; height:520px; }
        .fr-why-copy h2{ font-size:clamp(30px,3.4vw,42px); font-weight:500; margin:0 0 22px; }
        .fr-why-copy p.lead{ font-size:15.5px; line-height:1.75; color:#4a4a46; margin:0 0 40px; max-width:480px; }
        .fr-diff-list{ list-style:none; padding:0; margin:0 0 46px; display:flex; flex-direction:column; gap:20px; }
        .fr-diff-list li{ display:flex; gap:16px; align-items:flex-start; }
        .fr-diff-list .chk{ width:26px; height:26px; border-radius:50%; background:var(--teal); color:#fff; display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; margin-top:2px; }
        .fr-diff-list strong{ display:block; font-size:15px; margin-bottom:2px; }
        .fr-diff-list span{ font-size:13.5px; color:#6b6b64; }
        .fr-counters{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .fr-counter-item .num{ font-family:'Fraunces',serif; font-size:34px; font-weight:500; color:var(--ink); }
        .fr-counter-item .num .accent{ color:var(--teal-deep); }
        .fr-counter-item .lbl{ font-size:12px; color:#6b6b64; margin-top:4px; letter-spacing:.02em; }

        .fr-cta-banner-wrap{ padding:110px 5vw; }
        .fr-cta-banner{ position:relative; overflow:hidden; border-radius:36px; padding:90px 6vw; text-align:center; background: radial-gradient(120% 140% at 15% 15%, rgba(14,165,160,.16), transparent 55%), radial-gradient(120% 140% at 85% 85%, rgba(212,175,55,.18), transparent 55%), #fff; border:1px solid var(--border-soft); }
        .fr-cta-banner h2{ font-size:clamp(30px,4vw,50px); font-weight:500; margin:0 0 20px; max-width:720px; margin-left:auto; margin-right:auto; }
        .fr-cta-banner p{ font-size:16px; color:#4a4a46; max-width:520px; margin:0 auto 40px; line-height:1.7; }
        .fr-btn-gold{ background:linear-gradient(90deg, var(--gold), #b8933f); color:#fff; padding:15px 34px; border-radius:999px; font-size:15px; font-weight:600; border:none; box-shadow: 0 20px 40px -16px rgba(212,175,55,.5); transition: transform .3s ease; }
        .fr-btn-gold:hover{ transform:translateY(-3px); }

        .fr-faq{ padding:110px 5vw; max-width:760px; margin:0 auto; }
        .fr-faq-item{ border-bottom:1px solid var(--border-soft); }
        .fr-accordion-btn{ width:100%; background:none; border:none; padding:26px 4px; display:flex; align-items:center; justify-content:space-between; text-align:left; font-size:16.5px; font-weight:500; color:var(--ink); transition:color .25s ease; }
        .fr-accordion-btn:hover{ color:var(--teal-deep); }
        .fr-chev{ transition:transform .35s cubic-bezier(.4,0,.2,1); color:var(--teal-deep); flex-shrink:0; margin-left:20px; display:inline-block; }
        .fr-faq-item.open .fr-chev{ transform:rotate(180deg); }
        .fr-faq-panel-inner{ padding:0 4px 26px; color:#57534e; font-size:14.5px; line-height:1.7; max-width:640px; }

        .fr-footer{ background:var(--footer-dark); color:#d6d6d0; padding:80px 5vw 30px; }
        .fr-footer-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:40px; max-width:1180px; margin:0 auto 60px; }
        .fr-footer-grid h4{ font-size:12px; letter-spacing:.1em; text-transform:uppercase; color:#8f8f88; margin:0 0 20px; font-weight:600; }
        .fr-footer-brand{ font-family:'Fraunces',serif; font-size:20px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:10px; }
        .fr-footer-grid p{ font-size:13.5px; line-height:1.7; color:#9c9c95; max-width:280px; }
        .fr-footer-grid ul{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; }
        .fr-footer-grid li{ font-size:13.5px; color:#c4c4bc; }
        .fr-footer-grid a{ font-size:13.5px; color:#c4c4bc; transition:color .2s ease; }
        .fr-footer-grid a:hover{ color:var(--gold); }
        .fr-footer-bottom{ max-width:1180px; margin:0 auto; padding-top:26px; border-top:1px solid #2a2a2a; display:flex; justify-content:space-between; font-size:12.5px; color:#7a7a73; flex-wrap:wrap; gap:10px; }

        @media (max-width: 980px){
          .fr-hero{ grid-template-columns:1fr; min-height:auto; padding-top:120px; padding-bottom:50px; }
          .fr-hero-copy{ order:1; }
          .fr-hero-section{ order:2; }
          .fr-services-grid{ grid-template-columns:repeat(2,1fr); }
          .fr-why-us{ grid-template-columns:1fr; }
          .fr-why-visual{ height:380px; }
          .fr-footer-grid{ grid-template-columns:1fr 1fr; }
          .fr-nav-links{ display:none; }
        }
        @media (max-width: 600px){
          .fr-services-grid{ grid-template-columns:1fr; }
          .fr-counters{ grid-template-columns:1fr 1fr 1fr; }
          .fr-footer-grid{ grid-template-columns:1fr; }
          .fr-cta-banner{ padding:70px 6vw; }
        }
      `}</style>

      {/* NAVIGATION */}
      <Navbar scrolled={scrolled} />

      {/* HERO */}
      <section className="fr-hero" id="home" ref={heroRef}>
        <div className="fr-hero-copy">
          <div className="fr-hero-eyebrow-pill">
            <span className="dot" />
            Modern Dental Excellence
          </div>
          <h1 className="gsap-slide-left">
            {sanityHero?.title ?? "Reinvent Your Smile with "}
              <em>{sanityHero?.word ?? "Moroccan Precision"}</em>
              
          </h1>
          <p className="lead gsap-slide-right" data-reveal-delay=".15">
            {sanityHero?.subtitle ??
              "Meticulous dentistry, delivered quietly. AuraDental pairs Swiss-engineered technology with a patient, comfort-first approach — so every visit feels less like a procedure and more like a pause."}
          </p>
          <div className="fr-hero-ctas">
            <Link href={"/appointment"}>
              <button className="group inline-flex items-center gap-2 rounded-full bg-[#18181b] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
                <span>Book an Appointment</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </button>
            </Link>
          </div>
          <div className="fr-hero-trust">
            <div className="avatars">
              <div />
              <div />
              <div />
              <div />
            </div>
            <div className="fr-hero-trust-text">
              <strong>1,200+</strong> smiles restored this year
            </div>
          </div>
        </div>

        <div className="fr-hero-section h-[46vh] min-h-[300px] max-h-[560px] md:h-[58vh] md:max-h-[640px] lg:h-[66vh] lg:max-h-[720px]">
          <div className="fr-hero-visual relative h-full w-full overflow-hidden rounded-[2rem]">
            <img
              src={
                sanityHero?.img
                  ? urlFor(sanityHero.img).url()
                  : "https://cdn.prod.website-files.com/6481dbd1a8ecdc2acdd21208/673ee781c3d17897e309a308_dental-office-cabinets-your-key-to-organization-and-style.webp"
              }
alt="Dental practice"
              className="absolute inset-0 h-[130%] w-full -top-[15%] object-cover"
            />
            {/* Badges */}
            <div className="fr-float-badge fr-badge-1">
              <span className="ic">✨</span>AI Smile Preview Active
            </div>
            <div className="fr-float-badge fr-badge-2">
              <span className="ic">⭐</span>4.9/5 · 1,200+ Reviews
            </div>
            <div className="fr-float-badge absolute right-6 top-[55%] z-20">
              <span className="ic">🦷</span>Pain-Free Technology Active
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS / SHOWCASE */}
      <section className="fr-showcase-section">
        <span className="fr-eyebrow">Real Results</span>
        <h2 className="gsap-slide-left" style={{ marginTop: 10 }}>
          Smiles People Notice Without Thinking About It
        </h2>
        <p className="sub gsap-slide-right" data-reveal-delay=".1">
          Every transformation starts with a scan and an honest conversation —
          and ends with a smile worth a second look. Here are a few results,
          exactly as they are.
        </p>
        <div className="fr-showcase-row">
          {showcaseImages.map((src, i) => (
            <div
              key={src}
              ref={(el) => {
                showcaseRefs.current[i] = el;
              }}
              className="fr-showcase-card"
            >
              <img src={src} alt="AuraDental smile result" />
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="fr-services" id="services">
        <div className="fr-section-head">
          <span className="fr-eyebrow">Our Services</span>
          <h2 className="gsap-slide-left">
            Care built around a single goal — your comfort
          </h2>
          <p className="gsap-slide-right" data-reveal-delay=".1">
            From routine check-ups to complete smile transformations, every
            treatment is planned with Swiss precision and a great deal of
            gentleness.
          </p>
        </div>
        <div className="fr-services-grid">
          {mergedServices.map((s, i) => (
            <div
              key={s.name + i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="fr-service-card"
              onMouseMove={(e) => handleCardMove(e, i)}
              onMouseLeave={() => handleCardLeave(i)}
            >
              <span className="num">0{i + 1}</span>
              <div className="ring">
                <s.Icon />
              </div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="fr-why-us" id="why-us">
        <div className="fr-why-visual relative overflow-hidden rounded-[2rem]">
          <img
            src="https://kindersmiles.com/wp-content/uploads/2021/03/dentist-standing-with-arms-crossed-dental-clinic-scaled-1.jpg"
alt="Dental precision"
            className="h-full w-full object-cover rounded-[2rem] gsap-parallax"
            data-parallax="-15"
          />
        </div>
        <div className="fr-why-copy">
          <span className="fr-eyebrow">Why Choose Us</span>
          <h2 className="gsap-slide-left" style={{ marginTop: 14 }}>
            Precision is a promise,
            <br />
            not a marketing line
          </h2>
          <p className="lead gsap-slide-right" data-reveal-delay=".1">
            Every instrument, every protocol and every hour of continuing
            education exists to make your result predictable — and your
            experience pleasantly uneventful.
          </p>
          <ul className="fr-diff-list lead gsap-slide-right">
            <li>
              <span className="chk">✓</span>
              <div>
                <strong>Equipment calibrated to Swiss standards</strong>
                <span>
                  Imaging and shaping tools maintained to Swiss medical-device
                  tolerances.
                </span>
              </div>
            </li>
            <li>
              <span className="chk">✓</span>
              <div>
                <strong>Comfort-first protocols</strong>
                <span>
                  Sedation options and pacing matched to your anxiety threshold,
                  not to the clock.
                </span>
              </div>
            </li>
            <li>
              <span className="chk">✓</span>
              <div>
                <strong>Transparent treatment plans</strong>
                <span>
                  You see the 3D model and the cost before anything at all
                  begins.
                </span>
              </div>
            </li>
          </ul>
          <div className="fr-counters">
            <div className="fr-counter-item">
              <div className="num">
                <span className="accent" data-count="15" data-suffix="+">
                  0
                </span>
              </div>
              <div className="lbl">Years of Experience</div>
            </div>
            <div className="fr-counter-item">
              <div className="num">
                <span className="accent" data-count="10000" data-suffix="+">
                  0
                </span>
              </div>
              <div className="lbl">Happy Smiles</div>
            </div>
            <div className="fr-counter-item">
              <div className="num">
                <span className="accent" data-count="99.8" data-suffix="%">
                  0
                </span>
              </div>
              <div className="lbl">Precision Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="fr-cta-banner-wrap">
        <div className="fr-cta-banner">
          <span className="fr-eyebrow">Your Next Chapter</span>
          <h2 className="gsap-slide-left" style={{ marginTop: 16 }}>
            A smile you forget about,
            <br />
            and trust completely
          </h2>
          <p className="gsap-slide-right" data-reveal-delay=".1">
            Book a private consultation and leave with a clear, honest plan —
            no pressure, no hard sell, just precision.
          </p>
          <Link href={"/appointment"}>
            <button className="fr-btn-gold">Book Your Consultation</button>
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <section className="fr-faq" id="faq">
        <div className="fr-section-head" style={{ marginBottom: 40 }}>
          <span className="fr-eyebrow">Good to Know</span>
          <h2 className="gsap-slide-left">Frequently Asked Questions</h2>
        </div>
        <div>
          {faqData.map((item, i) => (
            <div
              key={item.q}
              className={`gsap-slide-left fr-faq-item${openFaq === i ? " open" : ""}`}
            >
              <button className="fr-accordion-btn" onClick={() => toggleFaq(i)}>
                <span>{item.q}</span>
                <span className="fr-chev">⌄</span>
              </button>
              <div
                style={{
                  maxHeight: openFaq === i ? "500px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease-in-out",
                }}
              >
                <div className="fr-faq-panel-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIALS */}
      <section className="px-[5vw] py-28 text-center bg-[#FAFAF8]" id="contact">
        <span className="text-[12px] gsap-slide-left tracking-[.14em] uppercase font-semibold text-[#0D9488]">
          Let&apos;s Stay in Touch
        </span>
        <h2 className="font-serif gsap-slide-left text-[clamp(28px,3.4vw,42px)] font-medium text-[#1A1A1A] mt-3 mb-4">
          Follow the Practice
        </h2>
        <p className="text-[#57534e] gsap-slide-left text-[15.5px] leading-relaxed max-w-[460px] mx-auto mb-14">
          Behind the scenes, before and afters, and small hygiene reminders —
          without the usual social-media noise.
        </p>

        <div className="flex flex-wrap justify-center gap-4 max-w-[770px] mx-auto">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="fr-social-btn group flex items-center gap-3 rounded-full border border-[#E2E8F0] bg-white px-6 py-4 shadow-[0_10px_24px_-14px_rgba(0,0,0,.12)] transition-all duration-300 hover:border-[#1A1A1A] hover:-translate-y-1 hover:shadow-[0_16px_30px_-14px_rgba(0,0,0,.2)]"
            >
              <span className="w-11 h-11 rounded-full bg-[#F4F4F0] flex items-center justify-center text-[#1A1A1A] transition-colors duration-300 group-hover:bg-[#1A1A1A] group-hover:text-white">
                <span className="w-6 h-6">{s.icon}</span>
              </span>
              <span className="text-[14px] font-medium text-[#1A1A1A] pr-1">
                {s.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
