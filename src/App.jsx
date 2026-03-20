import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Compteur animé au scroll
const CountUp = ({ target, start = 0, suffix = '' }) => {
  const [count, setCount] = useState(start);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = start;
    const step = Math.max(1, Math.ceil((target - start) / 20));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { 
        setCount(target); 
        clearInterval(interval); 
      }
      else setCount(current);
    }, 250);
    return () => clearInterval(interval);
  }, [started, target, start]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0 }
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const team = [
    { name: 'Christophe', role: 'Gérant & Agent Immobilier', zone: 'France & Luxembourg', initial: 'C', photo: '/agents/christophe.jpg' },
    { name: 'Emeline', role: 'Coordinatrice & Agente Responsable', zone: 'Ottange & ensemble du groupe', initial: 'E', photo: '/agents/emeline.jpg' },
    { name: 'Anne-Catherine', role: 'Agente Immobilière Co-Responsable', zone: 'Avantis Immo Luxembourg', initial: 'A', photo: '/agents/anne-catherine.jpg' },
    { name: 'Vanessa', role: 'Conseillère Immobilier', zone: 'Mercy-le-Bas & alentours', initial: 'V', photo: '/agents/vanessa.jpg' },
    { name: 'Julia', role: 'Conseillère Immobilier', zone: 'Longwy & alentours', initial: 'J', photo: '/agents/julia.jpg' },
    { name: 'Mélanie', role: 'Conseillère Immobilier', zone: 'Axe Thionville – Metz', initial: 'M', photo: '/agents/melanie.jpg' },
  ];

  const expertise = [
    { title: 'Estimation Précise', desc: 'Un prix bien fixé dès le départ est l\'assurance de vendre vite et bien. Nos experts connaissent le marché local et ses évolutions passées et à venir sur l\'ensemble du secteur frontalier.' },
    { title: 'Transaction Sécurisée', desc: 'De la prise de mandat au compromis jusqu\'à l\'acte final chez le notaire. Nous sécurisons chaque étape avec des garanties financières et un accompagnement juridique complet.' },
    { title: 'Visibilité Maximale', desc: 'Vos biens diffusés sur une cinquantaine de sites en France et au Luxembourg, supports papier inclus, avec visites virtuelles et plans détaillés pour toucher une clientèle internationale.' },
  ];

  const stats = [
    { value: '2012', label: 'Année de création du groupe' },
    { value: '6', label: 'Experts dédiés' },
    { value: null, countUp: 50, start: 44, label: 'Sites de diffusion' },
    { value: '2026', label: 'Lancement gestion locative & syndic' },
  ];

  const process = [
    'Estimation fine de votre bien',
    'Élaboration du mandat en bonne et due forme',
    'Mise en vente sur supports professionnels',
    'Visites avec acquéreurs & locataires qualifiés',
    'Négociation dans l\'intérêt de chaque partie',
    'Démarches administratives (compromis, bail, état des lieux)',
    'Solutions de financement & devis travaux',
    'Accompagnement jusqu\'à la signature chez le notaire',
  ];

  return (
    <div className="scbi-gradient min-h-screen text-white selection:bg-[#EA723D] selection:text-white scroll-smooth overflow-x-hidden">
      
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 py-4 md:py-6 px-6 md:px-12 ${scrolled ? 'nav-scrolled py-3 shadow-2xl backdrop-blur-3xl border-b border-white/5' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-center h-16 md:h-20">
             <img src="/logo.png" alt="Borbiconi" className={`transition-all duration-700 object-contain drop-shadow-2xl ${scrolled ? 'h-[53px]' : 'h-[58px] md:h-[81px]'}`} />
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════ HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-44 pb-12 px-6 overflow-hidden">
        
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-[#0A0D10]/40 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
        
        {/* Overlay initial sombre → fondu */}
        <motion.div
          className="absolute inset-0 bg-black z-20 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Ligne orange horizontale — s'étire en premier */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            className="w-24 h-[1px] bg-[#EA723D] mb-10 origin-center shadow-[0_0_20px_2px_rgba(234,114,61,0.6)]"
          />

          {/* Titre principal — monte lentement depuis le bas */}
          <motion.h1
            initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
            className="text-lg md:text-2xl serif font-normal tracking-wide text-white mb-5 normal-case drop-shadow-2xl max-w-4xl mx-auto leading-tight"
          >
            Ouvrez la porte à une expérience <span className="text-[#EA723D] italic">personnalisée et humaine</span>.
          </motion.h1>

          {/* Sous-titre — fade simple légèrement décalé */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.2 }}
            className="text-[10px] md:text-base font-light tracking-[0.25em] text-white/70 italic normal-case max-w-2xl mx-auto drop-shadow-lg uppercase mb-16 md:mb-14"
          >
            Nos experts sont à votre écoute.
          </motion.p>

          {/* Cartes agences — entrent en opposition depuis gauche et droite */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 w-full">
            
            <motion.a 
                href="https://scbi.fr" 
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, x: -80, scale: 0.88 },
                  visible: { 
                    opacity: 1, x: 0, scale: 1,
                    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 2.6 }
                  },
                  hover: { 
                    scale: 1.02, 
                    borderColor: 'rgba(234, 114, 61, 1)', 
                    transition: { duration: 0.3 } 
                  }
                }}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative flex flex-col items-center justify-center bg-black/60 backdrop-blur-[60px] p-6 md:p-10 rounded-[2.5rem] border border-white/5 group shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] aspect-square w-[180px] md:w-[260px] cursor-pointer"
              >
                <div className="absolute -inset-1 bg-[#EA723D] rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative z-10 flex flex-col items-center w-full">
                  <h3 className="text-base md:text-lg font-medium tracking-[0.2em] text-white mb-6 md:mb-10 leading-tight uppercase">Agence <br/> France</h3>
                  <div className="text-[10px] md:text-[11px] font-black tracking-[0.4em] text-[#EA723D] opacity-60 group-hover:opacity-100 transition-all duration-300 border-t border-white/10 pt-4 md:pt-8 w-full uppercase">
                     SCBI.FR <span className="ml-1 group-hover:translate-x-3 transition-transform inline-block">→</span>
                  </div>
                </div>
            </motion.a>

            <motion.a 
                href="https://avantis-immo.lu" 
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, x: 80, scale: 0.88 },
                  visible: { 
                    opacity: 1, x: 0, scale: 1,
                    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 2.8 }
                  },
                  hover: { 
                    scale: 1.02, 
                    borderColor: 'rgba(234, 114, 61, 1)', 
                    transition: { duration: 0.3 } 
                  }
                }}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative flex flex-col items-center justify-center bg-black/60 backdrop-blur-[60px] p-6 md:p-10 rounded-[2.5rem] border border-white/5 group shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] aspect-square w-[180px] md:w-[260px] cursor-pointer"
              >
                <div className="absolute -inset-1 bg-white rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative z-10 flex flex-col items-center w-full">
                  <h3 className="text-base md:text-lg font-medium tracking-[0.2em] text-white mb-6 md:mb-10 leading-tight uppercase">Agence <br/> Luxembourg</h3>
                  <div className="text-[10px] md:text-[11px] font-black tracking-[0.4em] text-[#EA723D] opacity-60 group-hover:opacity-100 transition-all duration-300 border-t border-white/10 pt-4 md:pt-8 w-full uppercase">
                     AVANTIS.LU <span className="ml-1 group-hover:translate-x-3 transition-transform inline-block">→</span>
                  </div>
                </div>
            </motion.a>

          </div>
        </div>

        <motion.div 
          animate={{ opacity: [0.1, 0.4, 0.1], y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════ CHIFFRES CLÉS */}
      <section className="py-24 md:py-32 bg-[#1a1a1f] px-6 relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-3xl md:text-4xl font-bold text-[#EA723D] tracking-tight">
                {s.countUp
                  ? <CountUp target={s.countUp} start={s.start} suffix="+" />
                  : s.value
                }
              </span>
              <span className="text-[10px] md:text-xs font-medium text-white/60 tracking-[0.2em] uppercase normal-case leading-relaxed">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ ZONE D'ACTION */}
      <section className="py-24 md:py-40 bg-[#f5f0eb] px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.5em] text-[#EA723D] uppercase mb-6">Notre territoire</p>
            <h2 className="text-2xl md:text-4xl serif font-normal normal-case text-[#1a1a1f] mb-8 leading-snug">
              De la <span className="text-[#EA723D] italic">Lorraine</span> à la <span className="italic">Meuse</span>, jusqu'au <span className="italic">Grand-Duché</span>
            </h2>
            <p className="text-sm md:text-base normal-case text-[#1a1a1f]/60 font-light leading-relaxed max-w-2xl mx-auto">
              Depuis 2012, nous couvrons la Grande Région grâce à deux agences complémentaires. Nos 6 experts opèrent sur un axe de plus de 50 km — de la Meuse jusqu'à Luxembourg-Ville — pour accompagner une clientèle locale et internationale, en France comme au Grand-Duché.
            </p>
          </motion.div>
        </div>

        {/* BANDEAU TRIPTIQUE — style ancien site */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mt-16 md:mt-20 w-full max-w-6xl mx-auto h-[200px] md:h-[260px] overflow-hidden rounded-2xl shadow-xl flex"
        >
          {/* Panel 1 — Ottange */}
          <div
            className="flex-1 bg-cover bg-center"
            style={{ backgroundImage: 'url(/ottange-agence.jpg)' }}
          ></div>

          {/* Diviseur diagonal */}
          <div className="relative z-10 w-12 -ml-6 -mr-6 flex-shrink-0"
               style={{ background: 'linear-gradient(to right, transparent 0%, #f5f0eb 50%, transparent 100%)', transform: 'skewX(-8deg)' }}>
          </div>

          {/* Panel 2 — Luxembourg */}
          <div
            className="flex-1 bg-cover bg-center"
            style={{ backgroundImage: 'url(/luxembourg-ville.jpg)' }}
          ></div>

          {/* Diviseur diagonal */}
          <div className="relative z-10 w-12 -ml-6 -mr-6 flex-shrink-0"
               style={{ background: 'linear-gradient(to right, transparent 0%, #f5f0eb 50%, transparent 100%)', transform: 'skewX(-8deg)' }}>
          </div>

          {/* Panel 3 — Meuse */}
          <div
            className="flex-1 bg-cover bg-center"
            style={{ backgroundImage: 'url(/meuse-vallee.jpg)' }}
          ></div>

          {/* Overlay central avec le texte */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="bg-white/80 backdrop-blur-sm px-8 py-4 text-center shadow-sm">
              <p className="text-[11px] md:text-sm font-black tracking-[0.5em] text-[#1a1a1f] uppercase">Ottange &bull; Luxembourg &bull; Meuse</p>
            </div>
          </div>
        </motion.div>

        {/* Mini tuiles de zones */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[
            { zone: 'Ottange & Thionville', detail: 'Secteur France Centre' },
            { zone: 'Longwy & Nord', detail: 'Secteur France Nord' },
            { zone: 'Luxembourg-Ville', detail: 'Grand-Duché' },
            { zone: 'Vallée de la Meuse', detail: 'Mercy-le-Bas & alentours' },
          ].map((z, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-4 border border-[#1a1a1f]/8 rounded-xl bg-white text-left shadow-sm"
            >
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#1a1a1f] mb-1">{z.zone}</p>
              <p className="text-[9px] tracking-[0.15em] uppercase text-[#EA723D]/70">{z.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ EXPERTISE */}
      <section className="py-24 md:py-40 bg-[#1e1e24] px-6 relative z-10 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <p className="text-[10px] tracking-[0.5em] text-[#EA723D] uppercase mb-6">Pourquoi nous choisir</p>
            <h2 className="text-2xl md:text-3xl serif font-normal normal-case text-white leading-snug">
              Le marché immobilier est <span className="text-[#EA723D] italic">complexe</span>.<br/>Nous le maîtrisons pour vous.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {expertise.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.0, delay: idx * 0.8 }}
                className="p-10 text-left bg-white/[0.04] backdrop-blur-3xl rounded-r-3xl border-l-2 border-[#EA723D] border-y border-r border-white/10 group hover:bg-[#EA723D]/10 transition-all duration-500 shadow-2xl"
              >
                <h4 className="text-[11px] font-black tracking-[0.5em] mb-6 text-white/50 group-hover:text-[#EA723D] transition-colors uppercase">{item.title}</h4>
                <p className="normal-case text-white/60 leading-relaxed font-light text-sm md:text-base group-hover:text-white/80 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Citation clé */}
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 text-center border-t border-white/5 pt-16"
          >
            <p className="text-base md:text-xl serif italic font-light normal-case text-white/70 max-w-3xl mx-auto leading-relaxed">
              "Parce que votre projet de vie le mérite. Nous sommes présents, au cœur de votre zone de vente, avec une vitrine, des bureaux, et une connaissance du marché que nulle plateforme nationale ne peut égaler."
            </p>
            <span className="inline-block mt-6 text-[10px] tracking-[0.4em] text-[#EA723D] uppercase">— Borbiconi Immobilier</span>
          </motion.blockquote>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ PROCESSUS */}
      <section className="py-24 md:py-32 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(170deg, #f5ede4 0%, #ede6dc 60%, #f0ebe3 100%)' }}>

        <div className="max-w-3xl mx-auto px-6 relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.5em] text-[#EA723D] uppercase mb-6">Notre engagement</p>
            <h2 className="text-2xl md:text-4xl serif font-normal normal-case text-[#1a1a1f] leading-snug">
              Un suivi <span className="text-[#EA723D] italic">professionnel et personnalisé</span>,<br/>de A à Z
            </h2>
            <div className="w-12 h-[2px] bg-[#EA723D]/40 mx-auto mt-8"></div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {[
              { text: process[0], img: '/steps/step1.png' },
              { text: process[1], img: '/steps/step2.png' },
              { text: process[2], img: '/steps/step3.png' },
              { text: process[3], img: '/steps/step4.png' },
              { text: process[4], img: '/steps/step5.png' },
              { text: process[5], img: '/steps/step6.png' },
              { text: process[6], img: '/steps/step7.png' },
              { text: process[7], img: '/steps/step8.png' },
            ].map((item, idx) => {
              const flip = idx % 2 !== 0;
              return (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                  className="group flex items-center gap-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 hover:shadow-lg hover:border-[#EA723D]/20 transition-all duration-400"
                  style={{ flexDirection: flip ? 'row-reverse' : 'row' }}
                >
                  {/* Bloc texte */}
                  <div className={`flex-1 p-6 md:p-8 flex items-center gap-5 border-[#EA723D] ${flip ? 'border-r-[3px]' : 'border-l-[3px]'}`}>
                    <span className="flex-shrink-0 text-4xl md:text-5xl font-black text-[#EA723D] opacity-20 serif leading-none">{String(idx+1).padStart(2,'0')}</span>
                    <div>
                      <span className="text-[9px] font-black tracking-[0.35em] text-[#EA723D] uppercase block mb-1">Étape {idx + 1}</span>
                      <p className="normal-case text-[#1a1a1f]/80 font-medium leading-relaxed text-sm md:text-[15px] group-hover:text-[#1a1a1f] transition-colors">{item.text}</p>
                    </div>
                  </div>
                  {/* Bloc image */}
                  <div className="w-32 md:w-44 h-28 md:h-36 flex-shrink-0 overflow-hidden" style={{ background: '#f0e8de' }}>
                    <img src={item.img} alt={`Étape ${idx+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Badge final */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-[#EA723D] text-white px-8 py-4 rounded-full shadow-lg shadow-[#EA723D]/30">
              <span className="text-lg">🎉</span>
              <span className="text-[11px] font-black tracking-[0.4em] uppercase">Vente ou location finalisée !</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ VIDÉO */}
      <section className="py-24 md:py-32 bg-[#1a1a1f] px-6 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-[10px] tracking-[0.5em] text-[#EA723D] uppercase mb-6">Présentation du groupe</p>
            <h2 className="text-2xl md:text-3xl serif font-normal normal-case text-white leading-snug">
              Christophe vous présente <span className="text-[#EA723D] italic">Borbiconi Immobilier</span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            style={{ paddingTop: '56.25%' }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/IUc6RUHimMo?rel=0&modestbranding=1&color=white"
              title="Présentation Borbiconi Immobilier & Avantis Immo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ ÉQUIPE */}
      <section className="py-24 md:py-40 bg-[#f9f6f2] px-6 relative z-10 border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <p className="text-[10px] tracking-[0.5em] text-[#EA723D] uppercase mb-6">L'équipe</p>
            <h2 className="text-2xl md:text-3xl serif font-normal normal-case text-[#1a1a1f] leading-snug">
              6 experts à votre service
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-6 md:p-8 border border-black/8 rounded-2xl bg-white hover:border-[#EA723D]/40 hover:shadow-md transition-all duration-500 text-left shadow-sm"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#EA723D]/30 group-hover:border-[#EA723D] transition-all duration-500 mb-5 flex-shrink-0 shadow-md">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                    />
                  ) : null}
                  <span
                    className="w-full h-full bg-[#EA723D]/10 text-[#EA723D] text-sm font-bold items-center justify-center"
                    style={{ display: 'none' }}
                  >{member.initial}</span>
                </div>
                <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#1a1a1f] mb-2">{member.name}</h3>
                <p className="text-[10px] tracking-[0.1em] text-[#EA723D] uppercase mb-3 leading-relaxed normal-case">{member.role}</p>
                <p className="text-[10px] text-[#1a1a1f]/40 normal-case leading-relaxed">{member.zone}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ FOOTER */}
      <footer className="py-24 border-t border-white/5 bg-[#020202] relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          <img src="/logo.png" alt="Logo" className="h-10 opacity-80 mb-10 transition-opacity hover:opacity-100" />
          <div className="h-[1px] w-24 bg-white/5 mb-10"></div>

          {/* Adresses */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-24 mb-12 text-left">
            <div>
              <p className="text-[10px] font-black tracking-[0.4em] text-[#EA723D] uppercase mb-3">Agence France</p>
              <p className="normal-case text-[12px] text-white/80 leading-relaxed">Borbiconi Immobilier<br/>38 rue Principale<br/>57840 OTTANGE</p>
              <a href="https://scbi.fr" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-[10px] font-black tracking-[0.3em] text-white/60 hover:text-[#EA723D] transition-colors uppercase">scbi.fr →</a>
            </div>
            <div className="h-[1px] md:h-auto md:w-[1px] bg-white/10"></div>
            <div>
              <p className="text-[10px] font-black tracking-[0.4em] text-[#EA723D] uppercase mb-3">Agence Luxembourg</p>
              <p className="normal-case text-[12px] text-white/80 leading-relaxed">Avantis Immo<br/>10 rue des Forains<br/>L-1533 LUXEMBOURG</p>
              <a href="https://avantis-immo.lu" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-[10px] font-black tracking-[0.3em] text-white/60 hover:text-[#EA723D] transition-colors uppercase">avantis-immo.lu →</a>
            </div>
          </div>

          <div className="h-[1px] w-24 bg-white/5 mb-8"></div>
          <p className="text-[10px] md:text-[11px] font-black text-white/60 tracking-[1em] uppercase px-6">
            L'excellence immobilière Lorraine - Luxembourg
          </p>
          <p className="text-[9px] text-white/30 mt-4 normal-case tracking-wider">
            Titulaire des cartes professionnelles française et luxembourgeoise · Groupe Borbiconi depuis 2012
          </p>
          <p className="text-[9px] text-white/20 mt-2 normal-case tracking-wider">
            © {new Date().getFullYear()} Borbiconi Immobilier — Avantis Immo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
