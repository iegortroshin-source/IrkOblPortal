import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, ArrowRight, Sun, Snowflake } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { translations, destinations } from '@/data/destinations';
import { IrkutskModal } from '@/components/ui-custom/IrkutskModal';

export function Destinations() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isIrkutskModalOpen, setIsIrkutskModalOpen] = useState(false);
  const { language } = useApp();
  const t = translations[language as keyof typeof translations];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  const handleDestinationClick = (destId: string) => {
    if (destId === 'irkutsk') {
      setIsIrkutskModalOpen(true);
    }
    // Для других направлений можно добавить аналогичные модальные окна или переходы
  };

  return (
    <section id="destinations" className="py-24 relative">
      {/* Irkutsk Modal */}
      <IrkutskModal isOpen={isIrkutskModalOpen} onClose={() => setIsIrkutskModalOpen(false)} />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="section-padding relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display text-baikal-snow mb-4">
            {t.destinations.title}
          </h2>
          <p className="text-lg text-baikal-snow/60 max-w-2xl mx-auto">
            {t.destinations.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              variants={itemVariants}
              onClick={() => handleDestinationClick(dest.id)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={dest.image}
                alt={language === 'ru' ? dest.name : dest.nameEn}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-baikal-deep via-baikal-deep/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Season Tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                {dest.season.map((s) => (
                  <span
                    key={s}
                    className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      s === 'all'
                        ? 'bg-baikal-ochre/80 text-baikal-deep'
                        : s === 'summer'
                        ? 'bg-green-500/80 text-white'
                        : 'bg-baikal-ice/80 text-white'
                    }`}
                  >
                    {s === 'all' && 'Круглый год'}
                    {s === 'summer' && <Sun className="w-3 h-3" />}
                    {s === 'winter' && <Snowflake className="w-3 h-3" />}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-baikal-ice text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Иркутская область</span>
                </div>

                <h3 className="text-2xl font-display text-baikal-snow mb-2 group-hover:text-baikal-ochre transition-colors">
                  {language === 'ru' ? dest.name : dest.nameEn}
                </h3>

                <p className="text-sm text-baikal-snow/70 line-clamp-2 mb-4">
                  {language === 'ru' ? dest.description : dest.descriptionEn}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(language === 'ru' ? dest.highlights : dest.highlightsEn)
                    .slice(0, 2)
                    .map((highlight, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md bg-white/10 text-xs text-baikal-snow/80"
                      >
                        {highlight}
                      </span>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-baikal-ochre font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span>{dest.id === 'irkutsk' ? 'Открыть 20+ мест' : 'Подробнее'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-baikal-ochre/50 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
