/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  PhoneOff, 
  Palette, 
  Banknote, 
  Heart, 
  Star, 
  Smartphone, 
  Clock, 
  ShieldCheck, 
  MessageCircle,
  Scissors,
  Image as ImageIcon,
  Video,
  Gift,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BonusCarousel } from './components/BonusCarousel';
import { TestimonialCarousel } from './components/TestimonialCarousel';

function redirectWithParams(destination: string) {
  const currentParams = window.location.search;

  if (!currentParams) {
    window.location.href = destination;
    return;
  }

  if (destination.includes("?")) {
    window.location.href = destination + "&" + currentParams.substring(1);
  } else {
    window.location.href = destination + currentParams;
  }
}

// --- Components ---

const Button = ({ children, className = "", primary = true, pulse = false, onClick }: { children: React.ReactNode, className?: string, primary?: boolean, pulse?: boolean, onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={pulse ? { scale: [1, 1.06, 1] } : undefined}
    transition={pulse ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : undefined}
    onClick={onClick}
    className={`w-full py-3 md:py-4 px-6 md:px-8 rounded-full font-heading font-extrabold text-base md:text-lg shadow-lg transition-all uppercase tracking-wider ${
      primary 
        ? "bg-green-500 text-white hover:bg-green-600" 
        : "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50"
    } ${className}`}
  >
    {children}
  </motion.button>
);

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto ${className}`}>
    {children}
  </section>
);

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-heading font-semibold text-gray-800 hover:text-pink-600 transition-colors"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Popup = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(144); // 2:24 in seconds
  const [showBonuses, setShowBonuses] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-[360px] bg-zinc-50 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white mx-auto"
          >
            {/* Header Bar */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 py-2 px-4 flex items-center justify-center gap-2 text-white font-heading font-extrabold text-[10px] md:text-xs uppercase tracking-wider italic shadow-inner">
              <Clock size={12} className="animate-pulse" />
              OFERTA EXPIRA EM: {formatTime(timeLeft)}
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-12 right-5 text-zinc-400 hover:text-zinc-900 transition-colors bg-white/50 hover:bg-white p-1 rounded-full z-10"
            >
              <X size={18} />
            </button>

            <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="p-5 md:p-6 text-center">
                <div className="mb-4">
                  <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-amber-500 italic leading-none mb-1 uppercase tracking-tight">
                    ESPERE!
                  </h2>
                  <h3 className="text-lg md:text-xl font-heading font-extrabold text-zinc-900 italic mb-2 uppercase tracking-tight">
                    NÃO COMETA ESSE ERRO!
                  </h3>
                  <div className="h-1 w-10 bg-amber-500 mx-auto rounded-full"></div>
                </div>
                
                <p className="text-zinc-500 text-[10px] md:text-xs font-medium mb-5 leading-relaxed px-2">
                  Você está prestes a deixar bônus valiosos para trás por uma diferença mínima.
                </p>

                {/* Offer Box */}
                <div className="bg-white rounded-[1.25rem] p-5 shadow-lg shadow-zinc-200/50 border border-zinc-100 mb-5 relative overflow-hidden group">
                  <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                    <ShieldCheck size={140} className="text-zinc-900" />
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-[9px] font-heading font-extrabold text-zinc-400 uppercase tracking-[0.3em] mb-2">PLANO COMPLETO</p>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-lg font-heading font-bold text-green-600 mt-1">R$</span>
                      <p className="text-4xl md:text-5xl font-heading font-extrabold text-green-600 tracking-tighter">15,90</p>
                    </div>
                    <p className="text-[9px] font-heading font-bold text-zinc-400 uppercase mb-4 tracking-widest">(PAGAMENTO ÚNICO)</p>

                    <div className="bg-amber-100 text-amber-700 text-[9px] md:text-[10px] font-heading font-extrabold py-2 px-5 rounded-full uppercase tracking-tight inline-block border border-amber-200">
                      ⚡ LEVE O PLANO COMPLETO POR APENAS + R$5,90!
                    </div>
                  </div>
                </div>

                {/* Bonus Accordion */}
                <div className="mb-5">
                  <button 
                    onClick={() => setShowBonuses(!showBonuses)}
                    className="w-full flex items-center justify-between bg-white border border-zinc-200 p-3 rounded-xl text-zinc-800 font-heading font-extrabold text-[10px] md:text-xs uppercase tracking-widest hover:border-amber-400 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-500 text-white p-1 rounded-md">
                        <Star size={14} fill="currentColor" />
                      </div>
                      VER 7 BÔNUS GRÁTIS INCLUSOS
                    </div>
                    {showBonuses ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  <AnimatePresence>
                    {showBonuses && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-3 text-left px-1">
                          {[
                            "Acessórios das casinhas",
                            "Kit Boneca Sereia + Acessórios",
                            "Kit Boneca Professora + Acessórios",
                            "Kit Maquiagem e Guarda Roupa",
                            "Vídeo Aula completa",
                            "Suporte WhatsApp",
                            "Garantia estendida"
                          ].map((bonus, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs md:text-sm text-zinc-700 font-medium group bg-white p-2 rounded-xl border border-zinc-100 shadow-sm">
                              <div className="flex-shrink-0 w-16 bg-amber-100 text-amber-700 border border-amber-200 text-[9px] py-1 px-2 rounded-lg text-center font-heading font-extrabold transition-colors">
                                BÔNUS {i + 1}
                              </div>
                              <span className="tracking-tight leading-tight">{bonus}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02, translateY: -1 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    onClick={() => redirectWithParams("https://www.ggcheckout.com/checkout/v5/jkBWe4OS59Dyx4ClkeoG")}
                    className="w-full bg-gradient-to-b from-green-500 to-green-600 text-white font-heading font-extrabold py-4 rounded-xl shadow-lg shadow-green-200 uppercase tracking-wider text-xs md:text-sm border-b-4 border-green-700 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                    GARANTIR O PLANO COMPLETO
                  </motion.button>

                  <button 
                    onClick={() => redirectWithParams("https://www.ggcheckout.com/checkout/v5/qZkZ4iGHvWusfr3cHOL6")}
                    className="text-[9px] md:text-[10px] font-heading font-bold text-zinc-400 uppercase tracking-[0.2em] hover:text-zinc-800 transition-colors flex items-center justify-center gap-2 mx-auto"
                  >
                    <span>GARANTIR APENAS O BÁSICO</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [wistiaVideo, setWistiaVideo] = useState<any>(null);

  const [wistiaLoaded, setWistiaLoaded] = useState(false);

  const loadWistia = useCallback(() => {
    if (wistiaLoaded) return;
    setWistiaLoaded(true);
    
    // Inject script dynamically
    const script = document.createElement("script");
    script.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script.async = true;
    document.body.appendChild(script);

    (window as any)._wq = (window as any)._wq || [];
    (window as any)._wq.push({
      id: '4sgaryyt0t',
      options: {
        autoPlay: true,
        muted: true,
      },
      onReady: (video: any) => {
        setWistiaVideo(video);
        video.bind('mutechange', (isMutedNow: boolean) => {
          setIsMuted(isMutedNow);
        });
        video.bind('play', () => {
          // ensure it stays muted if it was muted
          if (video.isMuted()) setIsMuted(true);
        });
      }
    });
  }, [wistiaLoaded]);

  useEffect(() => {
    // Load Wistia immediately so video is priority
    loadWistia();
  }, [loadWistia]);

  const materialImages = [
    "https://i.imgur.com/zUzHdmP.jpg",
    "https://i.imgur.com/MmGrhXc.jpg",
    "https://i.imgur.com/wmDRCi6.jpg",
    "https://i.imgur.com/IxQaqtU.jpg",
    "https://i.imgur.com/7G1sMuA.jpg",
    "https://i.imgur.com/MPLwEON.jpg",
    "https://i.imgur.com/p6LpyzL.jpg",
    "https://i.imgur.com/q8C5OQD.jpg",
    "https://i.imgur.com/3i8W1Ly.jpg",
    "https://i.imgur.com/WdgUvIY.jpg",
  ];

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % materialImages.length);
  }, [materialImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + materialImages.length) % materialImages.length);
  }, [materialImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 2000);

    return () => clearInterval(timer);
  }, [nextImage, currentImage]); // Re-run effect when currentImage changes to reset the 2s timer

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-pink-200">
      
      {/* Top Banner */}
      <div className="bg-red-600 text-white py-2 text-center text-xs md:text-sm font-heading font-bold tracking-widest uppercase">
        ESSA PROMOÇÃO ACABA HOJE {new Date().toLocaleDateString('pt-BR')}
      </div>

      {/* Hero Section */}
      <Section className="text-center pt-6 md:pt-8 pb-10 md:pb-12">
        <h1 
          className="animate-fade-in-up text-[28px] md:text-5xl font-heading font-extrabold leading-snug md:leading-normal mb-4 md:mb-6 max-w-4xl mx-auto text-balance tracking-tight"
        >
          <span className="text-pink-600">Kit de casinhas de boneca em papel</span><br className="hidden md:block" /> que <span className="underline decoration-pink-400">tira sua filha do celular</span>
        </h1>

        <div 
          className="animate-fade-in-scale delay-200 inline-block bg-orange-500 text-white text-[10px] md:text-xs font-heading font-bold px-4 py-1 rounded-full mb-6 md:mb-8 shadow-sm"
        >
          +6 BÔNUS INCLUSOS
        </div>

        <div 
          className="animate-fade-in-up delay-300 relative max-w-[220px] md:max-w-[280px] mx-auto mb-8 md:mb-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-gray-100 aspect-[9/16]"
        >
          {!wistiaLoaded ? (
            <div 
              className="relative w-full h-full cursor-pointer group"
              onClick={loadWistia}
            >
              <img 
                src="https://fast.wistia.com/embed/medias/4sgaryyt0t/swatch" 
                alt="Video Thumbnail" 
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <button 
                  className="pointer-events-auto bg-pink-600/90 hover:bg-pink-600 text-white font-heading font-bold py-3 px-5 md:px-6 rounded-full shadow-[0_0_20px_rgba(219,39,119,0.6)] flex items-center gap-2 md:gap-3 animate-pulse transition-transform hover:scale-105"
                  title="Ativar som"
                >
                  <Volume2 size={24} />
                  <span className="text-sm md:text-base uppercase tracking-wider">Ativar Som</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="wistia_embed wistia_async_4sgaryyt0t autoPlay=true muted=true" style={{ width: '100%', height: '100%' }}></div>
              
              {/* Custom Mute/Unmute Overlays */}
              {wistiaVideo && isMuted && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      wistiaVideo.unmute();
                      setIsMuted(false);
                    }}
                    className="pointer-events-auto bg-pink-600/90 hover:bg-pink-600 text-white font-heading font-bold py-3 px-5 md:px-6 rounded-full shadow-[0_0_20px_rgba(219,39,119,0.6)] flex items-center gap-2 md:gap-3 animate-pulse transition-transform hover:scale-105"
                    title="Ativar som"
                  >
                    <Volume2 size={24} />
                    <span className="text-sm md:text-base uppercase tracking-wider">Ativar Som</span>
                  </button>
                </div>
              )}

              {wistiaVideo && !isMuted && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    wistiaVideo.mute();
                    setIsMuted(true);
                  }}
                  className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10 shadow-lg backdrop-blur-sm"
                  title="Desligar som"
                >
                  <VolumeX size={18} />
                </button>
              )}
            </>
          )}
        </div>

        <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
          <span className="font-heading font-bold text-pink-600">Moldes de casinhas + bonecas interativas</span> prontas para imprimir: ela monta, cria e esquece que o celular existe por um <span className="font-heading font-extrabold text-green-500 text-xl md:text-2xl">preço acessível</span>.
        </p>

        <div className="max-w-md mx-auto">
          <a href="#pricing">
            <Button>QUERO RECEBER AGORA</Button>
          </a>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
            <Check size={16} className="text-green-500" /> Entrega imediata
          </p>
        </div>
      </Section>

      {/* Material Preview */}
      <div className="bg-gray-50 py-12 md:py-16">
        <Section className="text-center">
          <h2 className="text-xl md:text-3xl font-heading font-extrabold mb-8 md:mb-12 uppercase tracking-tight">
            Pagou, baixou, imprimiu. Sua filha já pode começar a montar HOJE MESMO
          </h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-12 md:mb-16">
            <div className="relative group p-4 md:p-8">
              <div className="absolute top-6 md:top-10 right-6 md:right-10 bg-black/50 text-white text-[10px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full z-10">
                {currentImage + 1} / {materialImages.length}
              </div>
              
              <div className="relative aspect-square md:aspect-[16/10] overflow-hidden rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100 shadow-inner">
                {materialImages.map((src, idx) => (
                  <img 
                    key={idx}
                    src={src} 
                    alt={`Material Preview ${idx + 1}`} 
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${currentImage === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>

              <button 
                onClick={prevImage}
                className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20 hover:scale-110"
              >
                <ChevronLeft size={24} className="text-pink-600" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20 hover:scale-110"
              >
                <ChevronRight size={24} className="text-pink-600" />
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {materialImages.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`h-2.5 rounded-full transition-all ${currentImage === idx ? 'bg-pink-600 w-8' : 'bg-gray-300 w-2.5'}`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-6 md:py-10 md:px-12 text-center border-t border-pink-100">
              <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold leading-tight mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Casinhas coloridas, bonecas e acessórios.
                </span>
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600">
                Tudo para ela criar histórias por horas! ✨
              </p>
            </div>
          </div>


        </Section>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-b from-white to-pink-50/50 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl"></div>
        </div>

        <Section className="text-center relative z-10">
          <div className="max-w-4xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-4 uppercase tracking-tight text-gray-900">
              ESSES BRINQUEDOS SÃO IDEAIS PARA VOCÊ
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 uppercase tracking-widest">
              QUE DESEJA:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                icon: <PhoneOff className="text-pink-500" size={32} />,
                title: "Tirar o celular da mão dela sem virar a vilã da história",
                desc: "As casinhas e bonecas ativam o mesmo prazer que o celular, só que de forma saudável. Ela monta, cria e se diverte. Você respira."
              },
              {
                icon: <Palette className="text-orange-500" size={32} />,
                title: "Desenvolver a criatividade brincando",
                desc: "Cada casinha vira um mundo novo. Ela inventa histórias, cria personagens e desenvolve imaginação. Sem roteiro, sem limite."
              },
              {
                icon: <Banknote className="text-emerald-500" size={32} />,
                title: "Atividade educativa de verdade, sem gastar quase nada",
                desc: "Por um preço acessível você imprime quantas vezes quiser, em casa, com papel. Sem brinquedo caro, sem pilha, sem repor nada."
              },
              {
                icon: <Heart className="text-red-500" size={32} />,
                title: "Ver sua filha feliz, focada e orgulhosa do que criou",
                desc: "Quando ela monta com as próprias mãos, sente que conseguiu. Esse sentimento aumenta a confiança, o foco e faz ela querer montar mais."
              }
            ].map((benefit, i) => (
              <div 
                key={i}
                className="group relative bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-pink-100/50 text-left flex flex-col items-start gap-4 md:gap-6 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-pink-200 hover:-translate-y-2"
              >
                {/* Subtle corner gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-50 to-purple-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110"></div>
                
                <div className="p-4 md:p-5 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                
                <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 leading-tight group-hover:text-pink-600 transition-colors duration-300">
                  {benefit.title}
                </h4>
                
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 max-w-md mx-auto">
            <a href="#pricing">
              <Button pulse={true}>QUERO RECEBER AGORA</Button>
            </a>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
              <Check size={16} className="text-green-500" /> Entrega imediata
            </p>
          </div>
        </Section>
      </div>

      {/* Bonuses Section */}
      <div className="bg-yellow-50 py-12 md:py-16">
        <Section className="text-center">
          <div className="inline-block bg-orange-500 text-white text-[10px] md:text-xs font-heading font-bold px-4 py-1 rounded-full mb-4">BÔNUS HOJE</div>
          <h2 className="text-2xl md:text-5xl font-heading font-extrabold mb-4 text-pink-600 uppercase tracking-tight">E NÃO PARA POR AÍ...</h2>
          <p className="text-lg md:text-xl font-medium text-gray-600 mb-8 md:mb-16">Você também vai receber:</p>

          <BonusCarousel />
        </Section>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16 md:py-24">
        <Section className="text-center">
          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-8 uppercase tracking-tight text-gray-900">
              O que quem já comprou fala sobre:
            </h2>
            
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 md:gap-4 bg-pink-50 border border-pink-100 px-5 py-3 rounded-2xl shadow-sm mx-auto">
              <div className="flex -space-x-3 shrink-0">
                {[
                  "https://i.imgur.com/6EjBgOY.png",
                  "https://i.imgur.com/P31dW6q.png",
                  "https://i.imgur.com/zXRIVXq.png"
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Mãe"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
              <p className="text-sm md:text-base font-bold text-pink-600 leading-tight">
                Mais de 4.587 mães e professoras já garantiram o acesso.
              </p>
            </div>
          </div>

          <TestimonialCarousel />
        </Section>
      </div>

      {/* Pricing Section */}
      <Section className="text-center" id="pricing">
        <h2 className="text-2xl md:text-4xl font-heading font-extrabold mb-8 md:mb-16 uppercase tracking-tight">ESCOLHA SEU PLANO <span className="inline-block animate-bounce">⬇️</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Basic Plan */}
          <div className="bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col">
            <h3 className="text-xl md:text-2xl font-heading font-bold mb-6 md:mb-8 uppercase tracking-widest text-gray-400">PLANO BÁSICO</h3>
            <div className="mb-6 md:mb-8 flex-1">
              <img 
                src="https://i.imgur.com/FE9hX3D.jpg" 
                alt="Plano Básico" 
                className="rounded-xl shadow-md mx-auto mb-6 md:mb-8 w-full max-w-[140px] md:max-w-[180px] h-auto object-contain"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <ul className="text-left space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-start gap-2 md:gap-3 font-medium text-gray-700 text-sm md:text-base">
                  <Check size={18} className="text-green-500 shrink-0" />
                  <span>Kit 5 Casinhas exclusivas realistas</span>
                </li>
              </ul>
            </div>
            <div className="mb-6 md:mb-8">
              <p className="text-3xl md:text-4xl font-heading font-extrabold text-black mb-1">R$10,00</p>
            </div>
            <Button 
              primary={false} 
              className="text-sm py-3 md:py-4"
              onClick={() => setIsPopupOpen(true)}
            >
              QUERO O PLANO BÁSICO
            </Button>
          </div>

          {/* Complete Plan */}
          <div className="relative bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border-4 border-pink-500 flex flex-col transform md:scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[10px] md:text-xs font-heading font-bold px-4 md:px-6 py-1.5 md:py-2 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
              MAIS VENDIDO
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-extrabold mb-6 md:mb-8 uppercase tracking-widest text-pink-600">PLANO COMPLETO COM TODOS OS BÔNUS</h3>
            <div className="mb-6 md:mb-8 flex-1">
              <img 
                src="https://i.imgur.com/56f3LzX.jpg" 
                alt="Plano Completo" 
                className="rounded-xl shadow-md mx-auto mb-6 md:mb-8 w-full max-w-[200px] md:max-w-[240px] h-auto object-contain"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <ul className="text-left space-y-3 mb-6 md:mb-8">
                <li className="flex items-start gap-2 md:gap-3 font-medium text-gray-700 text-xs md:text-sm">
                  <Check size={16} className="text-green-500 shrink-0" />
                  <span>Kit 5 Casinhas de Boneca em Papel em PDF para imprimir ultrarealista</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3 font-medium text-gray-700 text-xs md:text-sm">
                  <Check size={16} className="text-green-500 shrink-0" />
                  <span>Acesso Vitálicio</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3 font-medium text-gray-700 text-xs md:text-sm">
                  <Check size={16} className="text-green-500 shrink-0" />
                  <span>Garantia de 10 dias</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3 font-medium text-gray-700 text-xs md:text-sm">
                  <Check size={16} className="text-green-500 shrink-0" />
                  <span>Atualizações Semanais no conteúdo</span>
                </li>

                <div className="pt-3 md:pt-4 pb-1 md:pb-2 text-amber-600 font-heading font-extrabold text-[9px] md:text-xs uppercase tracking-widest flex items-center gap-2">
                  <span className="h-px bg-amber-200 flex-1"></span>
                  7 BÔNUS INCLUSOS 🎁
                  <span className="h-px bg-amber-200 flex-1"></span>
                </div>

                <div className="bg-amber-50/50 p-1 md:p-2 rounded-2xl md:rounded-3xl border-2 border-dashed border-amber-200 space-y-1.5 md:space-y-2">
                  {[
                    { label: "BÔNUS 1", text: "Acessórios das casinhas", value: "R$ 19,90" },
                    { label: "BÔNUS 2", text: "Kit Boneca Sereia + Acessórios", value: "R$ 14,90" },
                    { label: "BÔNUS 3", text: "Kit Boneca Professora + Acessórios", value: "R$ 14,90" },
                    { label: "BÔNUS 4", text: "Kit Maquiagem e Guarda Roupa", value: "R$ 19,90" },
                    { label: "BÔNUS 5", text: "Vídeo Aula completa com passo a passo", value: "R$ 47,00" },
                    { label: "BÔNUS 6", text: "Suporte 24h por WhatsApp", value: "R$ 29,90" },
                    { label: "BÔNUS 7", text: "Garantia estendida de 10 dias", value: "R$ 9,90" }
                  ].map((item, i) => (
                    <li key={i} className="group relative flex flex-col gap-1 bg-white p-3 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-400 transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-heading font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {item.label}
                        </span>
                        <span className="text-[9px] font-medium text-gray-400 line-through">
                          {item.value}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-amber-500 rounded-full p-0.5">
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="font-medium text-gray-800 text-xs leading-tight">{item.text}</span>
                      </div>
                      <div className="text-[10px] font-heading font-extrabold text-amber-600 mt-1 flex items-center gap-1">
                        <Gift size={10} /> INCLUSO GRÁTIS
                      </div>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
            <div className="mb-6 md:mb-8">
              <p className="text-red-600 line-through text-base md:text-lg font-heading font-bold">De R$97,90</p>
              <p className="text-[10px] md:text-sm font-heading font-bold text-green-500 uppercase mb-1 md:mb-2">Por apenas:</p>
              <p className="text-4xl md:text-5xl font-heading font-extrabold text-green-500 mb-1 md:mb-2">R$27,90</p>
              <div className="bg-green-100 text-green-700 text-[10px] md:text-xs font-heading font-extrabold py-1 px-3 rounded-full inline-block">
                Você economiza R$70,00
              </div>
            </div>
            <Button pulse={true} className="shadow-lg shadow-green-200 py-3 md:py-4" onClick={() => redirectWithParams("https://www.ggcheckout.com/checkout/v5/txOIFXqyODBujlDkEJwL")}>GARANTIR O PLANO COMPLETO</Button>
            <p className="mt-4 text-xs font-medium text-orange-600 flex items-center justify-center gap-1">
              🔥 Oferta promocional por tempo limitado.
            </p>
          </div>
        </div>
      </Section>

      {/* Guarantee Section */}
      <div className="bg-white py-16 md:py-24 border-t border-gray-100">
        <Section className="text-center">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-pink-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative bg-white p-6 rounded-full shadow-xl border border-pink-50">
                  <ShieldCheck className="text-pink-500 w-16 h-16 md:w-24 md:h-24" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white text-xs md:text-sm font-heading font-black px-3 py-1 rounded-full shadow-lg transform rotate-12">
                  7 DIAS
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 text-gray-900 uppercase tracking-tight">
                GARANTIA INCONDICIONAL DE 7 DIAS
              </h2>
              
              <p className="text-xl md:text-2xl font-heading font-bold text-pink-600 mb-8 uppercase tracking-widest">
                Sua satisfação ou seu dinheiro de volta.
              </p>

              <div className="bg-gray-50 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-gray-100 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-2 rounded-full border border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Compromisso Real
                </div>
                <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Eu confio tanto na qualidade desse material e no quanto sua filha vai amar, que ofereço uma garantia total de 7 dias. Se por qualquer motivo você achar que não é para você, basta me enviar um e-mail e eu devolvo 100% do seu investimento. Sem perguntas, sem burocracia e continuamos amigas.
                </p>
              </div>

              <div className="mt-12 flex items-center justify-center gap-4 text-gray-400">
                <div className="h-px w-12 bg-gray-200"></div>
                <p className="text-xs font-bold uppercase tracking-widest">Risco Zero para Você</p>
                <div className="h-px w-12 bg-gray-200"></div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-12 md:py-16">
        <Section>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold mb-8 md:mb-12 text-center uppercase tracking-tight">PERGUNTAS FREQUENTES</h2>
          <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-lg">
            {[
              { q: "É seguro?", a: "Sim! Utilizamos as plataformas de pagamento mais seguras do Brasil. Seus dados estão protegidos e a entrega é garantida." },
              { q: "Preciso comprar algo extra?", a: "Apenas papel (recomendamos gramatura maior como 180g para ficar mais firme), tesoura e cola. O material digital já vem completo." },
              { q: "Minha filha consegue montar sozinha?", a: "Sim. O material foi pensado para estimular a autonomia." },
              { q: "Posso imprimir mais de uma vez?", a: "Sim! O arquivo é seu para sempre. Pode imprimir quantas vezes quiser para brincar ou se alguma peça estragar." },
              { q: "É indicado para qual idade?", a: "Indicado para crianças de 4 a 12 anos. A montagem estimula a coordenação motora e o brincar estimula a imaginação." },
              { q: "Recebo como?", a: "O acesso é imediato após a confirmação do pagamento. Você receberá um e-mail com o link para baixar todos os arquivos em PDF" }
            ].map((faq, i) => (
              <div key={i}>
                <FAQItem question={faq.q} answer={faq.a} />
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500 font-heading font-extrabold text-lg mb-4 uppercase tracking-widest">PIRATARIA É CRIME.</p>
          <p className="text-gray-400 text-sm mb-8">Proibido a comercialização desse produto fora dessa página. Denuncie.</p>
          <div className="h-px bg-gray-800 w-full mb-8"></div>
          <p className="text-gray-500 text-xs mb-4">© {new Date().getFullYear()} Todos os direitos reservados a Tuto Biblioteca digital.</p>
          <p className="text-gray-500 text-xs">Compra 100% segura. Garantia de 7 ou 30 dias conforme plano escolhido.</p>
        </div>
      </footer>

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
