"use client";

import { motion } from "framer-motion";

const slides = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2200&q=85",
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=2200&q=85"
];

export function HeroCarousel() {
  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <motion.div
          key={slide}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide})` }}
          initial={{ opacity: index === 0 ? 1 : 0, scale: 1.04 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [1.04, 1, 1.03, 1.04] }}
          transition={{ duration: 18, repeat: Infinity, delay: index * 6, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
