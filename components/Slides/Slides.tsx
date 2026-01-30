"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Slides() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const panels = gsap.utils.toArray<HTMLElement>(
      wrapperRef.current.querySelectorAll(".section"),
    );

    panels.pop();

    panels.forEach((panel) => {
      const innerpanel = panel.querySelector(".section-inner") as HTMLElement;
      if (!innerpanel) return;

      const panelHeight = innerpanel.offsetHeight;
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
            fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : "bottom top",
          pinSpacing: false,
          pin: true,
          scrub: true,
        },
      });

      if (fakeScrollRatio) {
        tl.to(innerpanel, {
          yPercent: -100,
          y: window.innerHeight,
          duration: 1 / (1 - fakeScrollRatio) - 1,
          ease: "none",
        });
      }

      tl.fromTo(
        panel,
        { scale: 1, opacity: 1 },
        { scale: 0.7, opacity: 0.5, duration: 0.9 },
      ).to(panel, { opacity: 0, duration: 0.1 });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} className="slides-wrapper">
      <section className="section section-1">
        <div className="section-content">
          <div className="section-inner">
            <h1>Section 1</h1>
            <Image
              className="image"
              src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Portrait Image 3"
              width={500}
              height={750}
            />
          </div>
        </div>
      </section>

      <section className="section section-2">
        <div className="section-content">
          <div className="section-inner">
            <h1>Section 2</h1>

            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i} className="w-100">
                This section is long with text content and needs to be
                scrollable within before the next slide comes in.
              </p>
            ))}

            <p>This is the end...</p>
          </div>
        </div>
      </section>

      <section className="section section-3">
        <div className="section-content">
          <div className="section-inner">
            <h1>Section 3</h1>
            <Image
              className="image"
              src="https://plus.unsplash.com/premium_photo-1682125164600-e7493508e496?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Portrait Image 4"
              width={500}
              height={750}
            />
          </div>
        </div>
      </section>

      <section className="section section-4">
        <div className="section-content">
          <div className="section-inner">
            <h1>Section 4</h1>
            <Image
              className="image"
              src="https://images.unsplash.com/photo-1548811579-017cf2a4268b?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Portrait Image 2"
              width={500}
              height={750}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
