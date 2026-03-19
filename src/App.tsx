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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Button = ({ children, className = "", primary = true, onClick }: { children: React.ReactNode, className?: string, primary?: boolean, onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`w-full py-3 md:py-4 px-6 md:px-8 rounded-full font-bold text-base md:text-lg shadow-lg transition-all uppercase tracking-wider ${
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
        className="w-full flex justify-between items-center text-left font-semibold text-gray-800 hover:text-pink-600 transition-colors"
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
            <div className="bg-gradient-to-r from-red-600 to-red-500 py-2 px-4 flex items-center justify-center gap-2 text-white font-black text-[10px] md:text-xs uppercase tracking-wider italic shadow-inner">
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
                  <h2 className="text-2xl md:text-3xl font-black text-amber-500 italic leading-none mb-1 uppercase tracking-tighter">
                    ESPERE!
                  </h2>
                  <h3 className="text-lg md:text-xl font-black text-zinc-900 italic mb-2 uppercase tracking-tighter">
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
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2">PLANO COMPLETO</p>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-lg font-bold text-green-600 mt-1">R$</span>
                      <p className="text-4xl md:text-5xl font-black text-green-600 tracking-tighter">15,90</p>
                    </div>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase mb-4 tracking-widest">(PAGAMENTO ÚNICO)</p>

                    <div className="bg-amber-100 text-amber-700 text-[9px] md:text-[10px] font-black py-2 px-5 rounded-full uppercase tracking-tight inline-block border border-amber-200">
                      ⚡ LEVE O PLANO COMPLETO POR APENAS + R$5,90!
                    </div>
                  </div>
                </div>

                {/* Bonus Accordion */}
                <div className="mb-5">
                  <button 
                    onClick={() => setShowBonuses(!showBonuses)}
                    className="w-full flex items-center justify-between bg-white border border-zinc-200 p-3 rounded-xl text-zinc-800 font-black text-[10px] md:text-xs uppercase tracking-widest hover:border-amber-400 transition-all shadow-sm"
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
                            <div key={i} className="flex items-center gap-3 text-xs md:text-sm text-zinc-700 font-bold group bg-white p-2 rounded-xl border border-zinc-100 shadow-sm">
                              <div className="flex-shrink-0 w-16 bg-amber-100 text-amber-700 border border-amber-200 text-[9px] py-1 px-2 rounded-lg text-center font-black transition-colors">
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
                    onClick={() => window.location.href = "https://www.ggcheckout.com/checkout/v5/jkBWe4OS59Dyx4ClkeoG"}
                    className="w-full bg-gradient-to-b from-green-500 to-green-600 text-white font-black py-4 rounded-xl shadow-lg shadow-green-200 uppercase tracking-wider text-xs md:text-sm border-b-4 border-green-700 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                    GARANTIR O PLANO COMPLETO
                  </motion.button>

                  <button 
                    onClick={() => window.location.href = "https://www.ggcheckout.com/checkout/v5/qZkZ4iGHvWusfr3cHOL6"}
                    className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] hover:text-zinc-800 transition-colors flex items-center justify-center gap-2 mx-auto"
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
  const materialImages = [
    "https://i.imgur.com/MmGrhXc.jpg",
    "https://i.imgur.com/zUzHdmP.jpg",
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
      <div className="bg-red-600 text-white py-2 text-center text-xs md:text-sm font-bold tracking-widest uppercase">
        ESSA PROMOÇÃO ACABA HOJE 18/03/2026
      </div>

      {/* Hero Section */}
      <Section className="text-center pt-6 md:pt-8 pb-10 md:pb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-5xl font-black leading-tight mb-4 md:mb-6"
        >
          <span className="text-pink-600">Kit Casinhas de Boneca realista em papel</span> uma opção <span className="underline decoration-pink-400">barata e fácil</span> para tirar as crianças das telas sem brigas
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block bg-orange-500 text-white text-[10px] md:text-xs font-bold px-4 py-1 rounded-full mb-6 md:mb-8 shadow-sm"
        >
          +6 BÔNUS INCLUSOS
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-2xl mx-auto mb-8 md:mb-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white"
        >
          <img 
            src="https://i.imgur.com/FEPbkd0.jpg" 
            alt="Kit Casinhas de Boneca" 
            className="w-full h-auto object-contain"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
        </motion.div>

        <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
          Receba o molde de <span className="font-bold text-pink-600">5 casinhas de boneca em papel + bonecas interativas</span> prontas para imprimir e montar. Uma atividade criativa, barata e educativa por apenas <span className="font-black text-green-500 text-xl md:text-2xl">R$10,00</span>.
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
          <h2 className="text-xl md:text-3xl font-black mb-8 md:mb-12 uppercase tracking-tighter">
            ESSE É O EXATO MATERIAL QUE VOCÊ VAI RECEBER
          </h2>
          
          <div className="relative max-w-3xl mx-auto mb-6 md:mb-8 group">
            <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/50 text-white text-[10px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full z-10">
              {currentImage + 1} / {materialImages.length}
            </div>
            
            <div className="relative aspect-square md:aspect-[16/10] overflow-hidden rounded-xl md:rounded-2xl bg-gray-50">
              <AnimatePresence>
                <motion.img 
                  key={currentImage}
                  src={materialImages[currentImage]} 
                  alt={`Material Preview ${currentImage + 1}`} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </AnimatePresence>
            </div>

            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-20"
            >
              <ChevronLeft size={24} className="text-pink-600" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-20"
            >
              <ChevronRight size={24} className="text-pink-600" />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {materialImages.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${currentImage === idx ? 'bg-pink-600 w-4' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>

          <p className="text-lg md:text-xl font-bold text-pink-600 max-w-2xl mx-auto mb-8 md:mb-12 px-2">
            Casinhas completas, coloridas e interativas com bonecas, acessórios e cenários para criar infinitas histórias.
          </p>

          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] text-white shadow-xl">
            <h3 className="text-xl md:text-3xl font-bold mb-6 md:mb-8">
              Ainda hoje você pode reduzir o tempo de tela da sua filha usando apenas papel, tesoura e imaginação.
            </h3>
            <div className="max-w-xs mx-auto">
              <a href="#pricing">
                <Button>QUERO RECEBER AGORA</Button>
              </a>
            </div>
          </div>
        </Section>
      </div>

      {/* Benefits Section */}
      <Section className="text-center">
        <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-4 uppercase">IDEAL PARA VOCÊ</h2>
        <p className="text-lg md:text-xl font-bold text-gray-600 mb-8 md:mb-16 uppercase tracking-widest">QUE DESEJA:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[
            {
              icon: <PhoneOff className="text-pink-500" size={28} />,
              title: "Reduzir o tempo de celular sem brigas.",
              desc: "As casinhas ativam o mesmo estímulo de recompensa que o celular, mas de forma saudável. Ao montar sozinha, o cérebro libera satisfação, diminuindo naturalmente a busca pelas telas."
            },
            {
              icon: <Palette className="text-orange-500" size={28} />,
              title: "Estimular criatividade e imaginação.",
              desc: "Cada casinha vira um cenário aberto. Sem roteiro pronto, ela cria histórias, personagens e situações fortalecendo a imaginação, linguagem e pensamento criativo."
            },
            {
              icon: <Banknote className="text-emerald-500" size={28} />,
              title: "Gastar pouco com uma atividade educativa.",
              desc: "Você imprime em casa, usa materiais simples e pode reutilizar sempre que quiser. Sem brinquedos caros, sem reposição constante e sem depender de tecnologia."
            },
            {
              icon: <Heart className="text-red-500" size={28} />,
              title: "Ver sua filha envolvida e feliz.",
              desc: "Quando a criança constrói algo com as próprias mãos, ela sente autonomia. Esse sentimento de 'eu consegui' aumenta o foco, confiança e prolonga o tempo de envolvimento na brincadeira."
            }
          ].map((benefit, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg border border-gray-100 text-left flex flex-col items-start gap-3 md:gap-4"
            >
              <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl">{benefit.icon}</div>
              <h4 className="text-lg md:text-xl font-bold text-pink-600 leading-tight">{benefit.title}</h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What You'll Receive */}
      <div className="bg-pink-50 py-12 md:py-16">
        <Section className="text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-4 text-pink-600 uppercase">TUDO O QUE VOCÊ VAI RECEBER:</h2>
          <p className="text-base md:text-lg text-gray-700 mb-8 md:mb-12 px-2">
            Receba o molde de <span className="font-bold">5 casinhas de boneca em papel + bonecas interativas</span> prontas para imprimir e montar.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl">
            <div className="w-full md:w-1/2">
              <img 
                src="https://i.imgur.com/Sio8CBx.jpg" 
                alt="Kit Completo" 
                className="rounded-xl md:rounded-2xl shadow-lg w-full h-auto"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2 text-left">
              <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-gray-800">Kit de 5 Casinhas de Boneca realista em Papel</h3>
              <ul className="space-y-2 md:space-y-3">
                {[
                  "Kit 5 modelos diferentes de casinhas realistas",
                  "Kit de 3 Bonecas interativas",
                  "Acessórios para a casa e para as bonecas",
                  "Arquivo em PDF pronto para imprimir",
                  "Pode imprimir quantas vezes quiser",
                  "Passo a passo de montagem",
                  "Imagens ilustrativas de montagem",
                  "Vídeo aula com passo a passo para montar",
                  "Bordas sinalizadas com \"corte aqui\" e \"cole aqui\""
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 md:gap-3 text-gray-700 font-medium text-sm md:text-base">
                    <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 md:mt-6 font-bold text-gray-400 italic text-sm">E muito mais…</p>
            </div>
          </div>
        </Section>
      </div>

      {/* Bonuses Section */}
      <div className="bg-yellow-50 py-12 md:py-16">
        <Section className="text-center">
          <div className="inline-block bg-orange-500 text-white text-[10px] md:text-xs font-bold px-4 py-1 rounded-full mb-4">BÔNUS HOJE</div>
          <h2 className="text-2xl md:text-5xl font-black mb-4 text-pink-600 uppercase tracking-tighter">E NÃO PARA POR AÍ...</h2>
          <p className="text-lg md:text-xl font-bold text-gray-600 mb-8 md:mb-16">Você também vai receber:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { id: "01", title: "Kit Boneca Sereia", desc: "Monte uma boneca com a temática Sereia para criar novos cenários.", icon: <Star className="text-blue-400" />, image: "https://i.imgur.com/2Rysnay.jpg" },
              { id: "02", title: "Kit Boneca Professora", desc: "Monte uma nova boneca para estimular novas brincadeiras com as casinhas.", icon: <Star className="text-yellow-400" />, image: "https://i.imgur.com/YUbVHkc.jpg" },
              { id: "03", title: "Kit Maquiagem e Guarda-Roupa", desc: "Mais acessórios para personalizar as suas bonecas e aumentar o tempo de diversão.", icon: <Star className="text-pink-400" />, image: "https://i.imgur.com/Dm5cjTx.jpg" },
              { id: "04", title: "Vídeo Aula Completa", desc: "Coloque sua filha para acompanhar um vídeo com o passo a passo simples para montar todas as casinhas.", icon: <Video className="text-red-400" />, image: "https://i.imgur.com/XMVR3cH.jpg" },
              { id: "05", title: "Suporte 24h via WhatsApp", desc: "Se precisar de ajuda ou tirar alguma dúvida, não importa a hora, nos envie mensagem.", icon: <MessageCircle className="text-emerald-400" />, image: "https://i.imgur.com/J9zVbXl.jpg" },
              { id: "06", title: "Garantia Estendida", desc: "Por lei devemos entregar 7 dias de garantia. Teste sem risco.", icon: <ShieldCheck className="text-orange-400" />, image: "https://i.imgur.com/ronGLMi.jpg" }
            ].map((bonus, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-md border border-yellow-100 text-center flex flex-col items-center gap-3 md:gap-4"
              >
                <span className="text-[10px] md:text-xs font-black text-orange-500 uppercase tracking-widest">#BÔNUS {bonus.id} HOJE</span>
                <div className="w-full aspect-square bg-white rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden">
                   <img 
                    src={bonus.image} 
                    alt={bonus.title} 
                    className="w-full h-full object-contain p-1 md:p-2"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-base md:text-lg font-black text-gray-800 leading-tight">{bonus.title}</h4>
                <p className="text-xs md:text-sm text-gray-600">{bonus.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Pricing Section */}
      <Section className="text-center" id="pricing">
        <h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-16 uppercase">ESCOLHA SEU PLANO <span className="inline-block animate-bounce">⬇️</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Basic Plan */}
          <div className="bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col">
            <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 uppercase tracking-widest text-gray-400">PLANO BÁSICO</h3>
            <div className="mb-6 md:mb-8 flex-1">
              <img 
                src="https://i.imgur.com/FE9hX3D.jpg" 
                alt="Plano Básico" 
                className="rounded-xl shadow-md mx-auto mb-6 md:mb-8 w-full max-w-[200px] md:max-w-[240px] h-auto object-contain"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <ul className="text-left space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-start gap-2 md:gap-3 font-bold text-gray-700 text-sm md:text-base">
                  <Check size={18} className="text-green-500 shrink-0" />
                  <span>Kit 5 Casinhas de Boneca em Papel em PDF para imprimir</span>
                </li>
              </ul>
            </div>
            <div className="mb-6 md:mb-8">
              <p className="text-3xl md:text-4xl font-black text-black mb-1">R$10,00</p>
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
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[10px] md:text-xs font-black px-4 md:px-6 py-1.5 md:py-2 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
              MAIS VENDIDO
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 uppercase tracking-widest text-pink-600">PLANO COMPLETO COM TODOS OS BÔNUS</h3>
            <div className="mb-6 md:mb-8 flex-1">
              <img 
                src="https://i.imgur.com/56f3LzX.jpg" 
                alt="Plano Completo" 
                className="rounded-xl shadow-md mx-auto mb-6 md:mb-8 w-full max-w-[200px] md:max-w-[240px] h-auto object-contain"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <ul className="text-left space-y-3 mb-6 md:mb-8">
                <li className="flex items-start gap-2 md:gap-3 font-bold text-gray-700 text-xs md:text-sm">
                  <Check size={16} className="text-pink-500 shrink-0" />
                  <span>Kit 5 Casinhas exclusivas ultra realistas</span>
                </li>

                <div className="pt-3 md:pt-4 pb-1 md:pb-2 text-amber-600 font-black text-[9px] md:text-xs uppercase tracking-widest flex items-center gap-2">
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
                    { label: "BÔNUS 7", text: "Garantia estendida de 7 dias", value: "R$ 9,90" }
                  ].map((item, i) => (
                    <li key={i} className="group relative flex flex-col gap-1 bg-white p-3 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-400 transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {item.label}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 line-through">
                          {item.value}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-amber-500 rounded-full p-0.5">
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="font-bold text-gray-800 text-xs leading-tight">{item.text}</span>
                      </div>
                      <div className="text-[10px] font-black text-amber-600 mt-1 flex items-center gap-1">
                        <Gift size={10} /> INCLUSO GRÁTIS
                      </div>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
            <div className="mb-6 md:mb-8">
              <p className="text-red-600 line-through text-base md:text-lg font-bold">De R$97,90</p>
              <p className="text-[10px] md:text-sm font-bold text-green-500 uppercase mb-1 md:mb-2">Por apenas:</p>
              <p className="text-4xl md:text-5xl font-black text-green-500 mb-1 md:mb-2">R$27,90</p>
              <div className="bg-green-100 text-green-700 text-[10px] md:text-xs font-black py-1 px-3 rounded-full inline-block">
                Você economiza R$70,00
              </div>
            </div>
            <Button className="shadow-lg shadow-green-200 py-3 md:py-4" onClick={() => window.location.href = "https://www.ggcheckout.com/checkout/v5/txOIFXqyODBujlDkEJwL"}>GARANTIR O PLANO COMPLETO</Button>
            <p className="mt-4 text-xs font-bold text-orange-600 flex items-center justify-center gap-1">
              🔥 Oferta promocional por tempo limitado.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-12 md:py-16">
        <Section>
          <h2 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 text-center uppercase tracking-tighter">PERGUNTAS FREQUENTES</h2>
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
          <p className="text-red-500 font-black text-lg mb-4 uppercase tracking-widest">PIRATARIA É CRIME.</p>
          <p className="text-gray-400 text-sm mb-8">Proibido a comercialização desse produto fora dessa página. Denuncie.</p>
          <div className="h-px bg-gray-800 w-full mb-8"></div>
          <p className="text-gray-500 text-xs mb-4">Todos os direitos reservados a Tuto Biblioteca digital.</p>
          <p className="text-gray-500 text-xs">Compra 100% segura. Garantia de 7 ou 30 dias conforme plano escolhido.</p>
        </div>
      </footer>

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
