import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Clock, MapPin, Filter } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { translations, experiences, destinations } from '@/data/destinations';
import type { ExperienceCategory } from '@/types';

const categories: ExperienceCategory[] = [
  'gastronomy',
  'ethnography',
  'active',
  'family',
  'wellness',
  'photo',
];

export function Experiences() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<ExperienceCategory | 'all'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { season, language, addToCart } = useApp();
  const t = translations[language as keyof typeof translations];

  const filteredExperiences = experiences.filter((exp) => {
    const categoryMatch = activeCategory === 'all' || exp.category === activeCategory;
    const seasonMatch = exp.season.includes('all') || exp.season.includes(season);
    return categoryMatch && seasonMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getDestinationName = (destId: string) => {
    const dest = destinations.find(d => d.id === destId);
    return dest ? (language === 'ru' ? dest.name : dest.nameEn) : destId;
  };

  return (
    <section id="experiences" className="py-24 relative">
      <div className="section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display text-baikal-snow mb-4">
            {t.experiences.title}
          </h2>
          <p className="text-lg text-baikal-snow/60 max-w-2xl mx-auto">
            {t.experiences.subtitle}
          </p>
        </motion.div>

        {/* Filters - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:flex justify-center gap-3 mb-12 flex-wrap"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-baikal-ochre text-baikal-deep'
                : 'bg-white/5 text-baikal-snow/70 hover:bg-white/10 hover:text-baikal-snow border border-white/10'
            }`}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-baikal-ochre text-baikal-deep'
                  : 'bg-white/5 text-baikal-snow/70 hover:bg-white/10 hover:text-baikal-snow border border-white/10'
              }`}
            >
              {t.experiences.categories[cat]}
            </button>
          ))}
        </motion.div>

        {/* Filters - Mobile */}
        <div className="md:hidden mb-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass-light text-baikal-snow"
          >
            <Filter className="w-4 h-4" />
            <span>Фильтры</span>
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeCategory === 'all'
                        ? 'bg-baikal-ochre text-baikal-deep'
                        : 'bg-white/5 text-baikal-snow/70'
                    }`}
                  >
                    Все
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        activeCategory === cat
                          ? 'bg-baikal-ochre text-baikal-deep'
                          : 'bg-white/5 text-baikal-snow/70'
                      }`}
                    >
                      {t.experiences.categories[cat]}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp) => (
              <motion.div
                key={exp.id}
                layout
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={exp.image}
                    alt={language === 'ru' ? exp.title : exp.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                    <Star className="w-3 h-3 text-baikal-ochre fill-baikal-ochre" />
                    <span className="text-xs text-white font-medium">{exp.rating}</span>
                  </div>
                  {/* Season badge */}
                  <div className="absolute top-3 left-3 flex gap-1">
                    {exp.season.map((s) => (
                      <span
                        key={s}
                        className={`px-2 py-0.5 rounded-full text-xs backdrop-blur-sm ${
                          s === 'all'
                            ? 'bg-baikal-ochre/90 text-baikal-deep'
                            : 'bg-black/60 text-white'
                        }`}
                      >
                        {s === 'all' ? 'Круглый год' : s === 'summer' ? 'Лето' : 'Зима'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-baikal-snow/50 mb-2">
                    <span className="px-2 py-0.5 rounded bg-baikal-ice/20 text-baikal-ice">
                      {t.experiences.categories[exp.category]}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {getDestinationName(exp.destination)}
                    </span>
                  </div>

                  <h3 className="text-lg font-display text-baikal-snow mb-2 group-hover:text-baikal-ochre transition-colors">
                    {language === 'ru' ? exp.title : exp.titleEn}
                  </h3>

                  <p className="text-sm text-baikal-snow/60 line-clamp-2 mb-4">
                    {language === 'ru' ? exp.description : exp.descriptionEn}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-baikal-snow/50 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exp.duration}
                    </span>
                    <span>{exp.reviews} отзывов</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-2xl font-display text-baikal-ochre">
                        {exp.price.toLocaleString()} ₽
                      </span>
                      <span className="text-sm text-baikal-snow/50"> / чел</span>
                    </div>
                    <button
                      onClick={() => addToCart({
                        id: exp.id,
                        type: 'tour',
                        title: language === 'ru' ? exp.title : exp.titleEn,
                        image: exp.image,
                        price: exp.price,
                        date: new Date(),
                        quantity: 1,
                      })}
                      className="px-4 py-2 rounded-lg bg-baikal-ochre/10 text-baikal-ochre hover:bg-baikal-ochre hover:text-baikal-deep transition-all text-sm font-medium"
                    >
                      {t.booking.addToCart}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredExperiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-baikal-snow/50">Нет доступных впечатлений для выбранных фильтров</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
