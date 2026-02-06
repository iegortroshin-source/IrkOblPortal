import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { translations, destinations } from '@/data/destinations';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { season, language } = useApp();
  const t = translations[language as keyof typeof translations];

  const heroImage = season === 'summer' ? '/images/hero-summer.jpg' : '/images/hero-winter.jpg';

  const scrollToDestinations = () => {
    const element = document.getElementById('destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          key={season}
          src={heroImage}
          alt="Baikal"
          className="w-full h-full object-cover scale-110 transition-opacity duration-700"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-baikal-deep/60 via-baikal-deep/30 to-baikal-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-baikal-deep/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light"
          >
            <MapPin className="w-4 h-4 text-baikal-ochre" />
            <span className="text-sm text-baikal-snow/80">Иркутская область, Россия</span>
          </motion.div>

          {/* Title */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-baikal-snow tracking-tight">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-baikal-snow/80 font-light max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="pt-4"
          >
            <button
              onClick={scrollToDestinations}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              {t.hero.cta}
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-0 right-0"
      >
        <div className="section-padding">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {destinations.map((dest, index) => (
              <motion.button
                key={dest.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                onClick={() => {
                  const element = document.getElementById('destinations');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-shrink-0 group relative w-40 h-24 rounded-xl overflow-hidden"
              >
                <img
                  src={dest.image}
                  alt={language === 'ru' ? dest.name : dest.nameEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-3 left-3 text-sm font-medium text-white">
                  {language === 'ru' ? dest.name : dest.nameEn}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
