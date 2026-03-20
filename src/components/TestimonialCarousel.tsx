import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialImages = [
  "https://i.imgur.com/lzMUw1D.png",
  "https://i.imgur.com/mPB4jNo.png",
  "https://i.imgur.com/hjy6IVS.png",
  "https://i.imgur.com/yl7bDy9.png"
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonialImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonialImages.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonialImages.length) % testimonialImages.length);

  return (
    <div className="relative max-w-2xl mx-auto group">
      <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={testimonialImages[current]}
            alt={`Depoimento ${current + 1}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-contain"
            referrerPolicy="no-referrer"
            loading={current === 0 ? "eager" : "lazy"}
            fetchPriority={current === 0 ? "high" : "auto"}
          />
        </AnimatePresence>
        {/* Preload next image - Moved outside AnimatePresence to fix mode="wait" error */}
        <img 
          src={testimonialImages[(current + 1) % testimonialImages.length]} 
          className="hidden" 
          aria-hidden="true" 
          referrerPolicy="no-referrer"
        />
      </div>

      <button
        onClick={prev}
        className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20 hover:scale-110 text-pink-600"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20 hover:scale-110 text-pink-600"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {testimonialImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${current === idx ? 'bg-pink-600 w-8' : 'bg-gray-300 w-2'}`}
          />
        ))}
      </div>
    </div>
  );
}
