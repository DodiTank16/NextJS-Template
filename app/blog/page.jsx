"use client";

import Image from "next/image";
import Link from "next/link";
import DesertAdventureImg from "../../assets/images/Desert-Adventure.jpg";
import Ocean from "../../assets/images/Ocean.avif";

export default function Blogs() {
  return (
    <section className="bg-white dark:bg-indigo-900 overflow-hidden">
      {/* Title Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4 opacity-0 translate-y-6 animate-fadeUp">
          Discover New Adventures
        </h1>

        <p
          className="
            text-lg text-gray-600 dark:text-gray-400
            opacity-0 translate-y-6
            animate-fadeUp delay-200
          "
        >
          Explore, discover, and find inspiration through these exciting
          journeys.
        </p>
      </div>

      {/* Content */}
      <div className="px-8 py-10 mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full sm:px-12 md:px-16 lg:py-20 sm:py-16">
        <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`relative opacity-0 translate-y-8 animate-fadeUp delay-${(i + 2) * 200
                }`}
            >
              <Link
                className="block overflow-hidden group rounded-xl shadow-lg relative"
                href="#"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={1080}
                  height={720}
                  className="
                    object-cover w-full h-56 sm:h-64
                    transition-transform duration-700 ease-out
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0 bg-black/0
                    transition-all duration-700
                    group-hover:bg-black/20
                  "
                />
              </Link>

              <div className="relative mt-5 transition-all duration-500 group-hover:-translate-y-1">
                <p className="uppercase font-semibold text-xs mb-2.5 text-purple-600">
                  {card.date}
                </p>

                <h2
                  className="
                    text-2xl font-bold leading-5 text-black dark:text-white mb-3
                    transition-colors duration-300
                    hover:text-purple-700 dark:hover:text-purple-400
                  "
                >
                  {card.title}
                </h2>

                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  {card.description}
                </p>

                <span className="font-medium underline text-purple-600 dark:text-purple-400 cursor-pointer">
                  Read More
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Data */
const cards = [
  {
    title: "Journey to the Mountains",
    date: "September 10th 2023",
    image: DesertAdventureImg,
    description:
      "Escape the hustle and explore the serene beauty of the mountains.",
  },
  {
    title: "Explore the Deep Oceans",
    date: "September 15th 2023",
    image: Ocean,
    description: "Dive into the mystery of the underwater world.",
  },
  {
    title: "Desert Safari",
    date: "October 5th 2023",
    image: DesertAdventureImg,
    description: "Experience the thrill of dunes and desert adventures.",
  },
];
