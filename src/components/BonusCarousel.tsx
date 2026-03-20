import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Video, MessageCircle, ShieldCheck } from 'lucide-react';

const bonuses = [
  { id: "01", title: "Kit Boneca Sereia", desc: "Monte uma boneca com a temática Sereia para criar novos cenários.", icon: <Star className="text-blue-400" />, image: "https://i.imgur.com/2Rysnay.jpg" },
  { id: "02", title: "Kit Boneca Professora", desc: "Monte uma nova boneca para estimular novas brincadeiras com as casinhas.", icon: <Star className="text-yellow-400" />, image: "https://i.imgur.com/YUbVHkc.jpg" },
  { id: "03", title: "Kit Maquiagem e Guarda-Roupa", desc: "Mais acessórios para personalizar as suas bonecas e aumentar o tempo de diversão.", icon: <Star className="text-pink-400" />, image: "https://i.imgur.com/Dm5cjTx.jpg" },
  { id: "04", title: "Vídeo Aula Completa", desc: "Coloque sua filha para acompanhar um vídeo com o passo a passo simples para montar todas as casinhas.", icon: <Video className="text-red-400" />, image: "https://i.imgur.com/XMVR3cH.jpg" },
  { id: "05", title: "Suporte 24h via WhatsApp", desc: "Se precisar de ajuda ou tirar alguma dúvida, não importa a hora, nos envie mensagem.", icon: <MessageCircle className="text-emerald-400" />, image: "https://i.imgur.com/J9zVbXl.jpg" },
  { id: "06", title: "Garantia Estendida", desc: "Por lei devemos entregar 7 dias de garantia, mas estendemos para 10 dias. Teste sem risco.", icon: <ShieldCheck className="text-orange-400" />, image: "https://i.imgur.com/Ne59Jby.jpg" }
];

export const BonusCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bonuses.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % bonuses.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + bonuses.length) % bonuses.length);

  return (
    <div 
      className="relative max-w-sm md:max-w-md mx-auto"
    >
      <div className="overflow-hidden px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border-2 border-orange-100 text-center flex flex-col items-center gap-4 relative"
          >
            {/* Highlighted Enumeration */}
            <div className="absolute -top-4 -left-2 md:-left-4 px-4 py-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-heading font-extrabold text-sm md:text-base shadow-lg border-2 border-white z-10 transform -rotate-6 whitespace-nowrap">
              BÔNUS {bonuses[currentIndex].id}
            </div>
            
            <div className="w-40 h-40 md:w-48 md:h-48 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 mt-2 shadow-inner">
               <img 
                src={bonuses[currentIndex].image} 
                alt={bonuses[currentIndex].title} 
                className="w-full h-full object-contain p-2"
                referrerPolicy="no-referrer"
                loading={currentIndex === 0 ? "eager" : "lazy"}
                fetchpriority={currentIndex === 0 ? "high" : "auto"}
              />
              {/* Preload next image */}
              <img 
                src={bonuses[(currentIndex + 1) % bonuses.length].image} 
                className="hidden" 
                aria-hidden="true" 
                referrerPolicy="no-referrer"
              />
            </div>
            <h4 className="text-xl md:text-2xl font-heading font-extrabold text-gray-800 leading-tight mt-2">{bonuses[currentIndex].title}</h4>
            <p className="text-sm md:text-base text-gray-600 px-2">{bonuses[currentIndex].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-200 flex items-center justify-center text-orange-500 hover:bg-orange-50 hover:scale-110 transition-all z-10"
      >
        <ChevronLeft size={28} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-200 flex items-center justify-center text-orange-500 hover:bg-orange-50 hover:scale-110 transition-all z-10"
      >
        <ChevronRight size={28} />
      </button>
      
      <div className="flex justify-center gap-2 mt-2">
        {bonuses.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2.5 rounded-full transition-all ${i === currentIndex ? 'bg-orange-500 w-8' : 'bg-orange-200 w-2.5'}`}
          />
        ))}
      </div>

      {/* Premium Mini Card */}
      <div className="mt-8 mx-auto w-full max-w-xs md:max-w-sm bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-orange-100 p-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-pink-50 opacity-50"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center justify-center text-center gap-3 border border-white">
          <p className="text-gray-600 font-heading font-bold text-sm md:text-base flex items-center justify-center gap-2 flex-wrap">
            Total em Bônus: 
            <span className="line-through text-red-500 font-heading font-extrabold decoration-2">R$ 197,00</span>
          </p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
          <p className="font-heading font-extrabold text-lg md:text-xl tracking-wider uppercase text-green-600 drop-shadow-sm">
            HOJE: TUDO POR CUSTO ZERO
          </p>
        </div>
      </div>
    </div>
  );
};
