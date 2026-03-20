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
    let timer: NodeJS.Timeout;
    const startCarousel = () => {
      timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonialImages.length);
      }, 2000);
    };

    if (document.readyState === 'complete') {
      startCarousel();
    } else {
      window.addEventListener('load', startCarousel);
    }

    return () => {
      clearInterval(timer);
      window.removeEventListener('load', startCarousel);
    };
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonialImages.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonialImages.length) % testimonialImages.length);

  return (
    <div className="relative max-w-2xl mx-auto group">
      <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl">
        {testimonialImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Depoimento ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            referrerPolicy="no-referrer"
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : "auto"}
            decoding={idx === 0 ? "sync" : "async"}
          />
        ))}
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
