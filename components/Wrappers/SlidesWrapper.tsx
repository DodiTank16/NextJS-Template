"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SlidesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".slide");
      panels.pop();

      panels.forEach((panel) => {
        const inner = panel.querySelector(".slide-inner") as HTMLElement;
        if (!inner) return;

        const panelHeight = inner.offsetHeight;
        const windowHeight = window.innerHeight;

        const difference = panelHeight - windowHeight;
        const fakeScrollRatio =
          difference > 0 ? difference / (difference + windowHeight) : 0;

        if (fakeScrollRatio) {
          panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () =>
              fakeScrollRatio ? `+=${inner.offsetHeight}` : "bottom top",
            pin: true,
            scrub: 1.2,
            pinSpacing: false,
          },
        });

        // Fake scroll inside long slides
        if (fakeScrollRatio) {
          tl.to(inner, {
            yPercent: -100,
            y: window.innerHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: "none",
          });
        }

        // Depth + fade + scale
        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 0.78, opacity: 0.4, duration: 0.85, ease: "power2.out" },
        ).to(panel, { opacity: 0, duration: 0.15 });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="mt-16 space-y-10">
      {children}
    </div>
  );
}
