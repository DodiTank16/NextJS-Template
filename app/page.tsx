"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "eb/b3/bd/ebb3bd6c322463cee8b7b17659792830",
  "9b/0e/e1/9b0ee1146eba537b5b1e207928350e0f",
  "b6/91/52/b691526e863a332d1708eb1d9da0d403",
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ==============================TITLE TEXT ANIMATION============================== */
      gsap.from(titleRef.current?.children || [], {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      });
      /* ==============================STAGGERED SCROLL REVEAL============================== */
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 120,
        scale: 0.95,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      /* ==============================PARALLAX LIFT ON SCROLL============================== */
      cardsRef.current.forEach((card) => {
        gsap.to(card, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ==============================MAGNETIC HOVER============================== */
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardsRef.current[index];
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      x: x * 0.25,
      y: y * 0.25,
      rotateX: -y * 0.05,
      rotateY: x * 0.05,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    gsap.to(cardsRef.current[index], {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div ref={containerRef} className="bg-indigo-900 min-h-screen">
      <div className="px-8 py-24 mx-auto text-center md:px-12 lg:px-24 lg:pt-40">
        <p
          ref={titleRef}
          className="max-w-5xl mx-auto text-4xl font-bold uppercase overflow-hidden"
        >
          {["Welcome,", "scroll", "down", "to", "see", "some", "magic!"].map(
            (word, i) => (
              <span key={i} className="inline-block mr-3 will-change-transform bg-linear-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text lg:text-5xl">
                {word}
              </span>
            )
          )}
        </p>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-1 gap-y-28 mt-24 mx-auto max-w-2xl">
          {images.map((id, index) => (
            <Link href="#" key={id}>
              <div
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="relative rounded-3xl cursor-pointer transform-gpu will-change-transform"
              >
                <Image
                  src={`https://i.pinimg.com/564x/${id}.jpg`}
                  alt="Gallery"
                  width={564}
                  height={846}
                  loading="eager"
                  className="w-full rounded-3xl shadow-xl transition-shadow duration-500 hover:shadow-2xl"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
