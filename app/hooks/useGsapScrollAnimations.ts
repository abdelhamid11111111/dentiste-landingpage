import { useLayoutEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapScrollAnimations(
  containerRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Targets slide-up, slide-left, and slide-right elements
      const slideElements = gsap.utils.toArray<HTMLElement>(
        ".gsap-slide-up, .gsap-slide-left, .gsap-slide-right",
      );

      slideElements.forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay ?? "0");
        const startY = parseFloat(el.dataset.slideDistance ?? "80");

        gsap.fromTo(
          el,
          { y: startY, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      // Parallax effect targets
      gsap.utils.toArray<HTMLElement>(".gsap-parallax").forEach((el) => {
        const section = el.closest("section") ?? el.parentElement ?? el;
        const range = parseFloat(el.dataset.parallax ?? "15");

        gsap.to(el, {
          yPercent: range,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}