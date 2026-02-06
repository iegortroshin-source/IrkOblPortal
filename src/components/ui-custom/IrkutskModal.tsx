import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import { useState } from 'react';
import { irkutskAttractions, categoryLabels, type Attraction } from '@/data/irkutskAttractions';

interface IrkutskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryColors: Record<Attraction['category'], string> = {
  architecture: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  museum: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  nature: 'bg-green-500/20 text-green-400 border-green-500/30',
  religion: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  culture: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

export function IrkutskModal({ isOpen, onClose }: IrkutskModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<Attraction['category'] | 'all'>('all');

  const filteredAttractions = selectedCategory === 'all' 
    ? irkutskAttractions 
    : irkutskAttractions.filter(a => a.category === selectedCategory);

  const categories: (Attraction['category'] | 'all')[] = ['all', 'architecture', 'museum', 'culture', 'religion', 'nature'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <div className="w-full h-full glass rounded-3xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-baikal-ice to-baikal-teal flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display text-baikal-snow">Иркутск</h2>
                    <p className="text-sm text-baikal-snow/60">Ворота Байкала</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-baikal-snow/70" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                {/* Sidebar - Categories */}
                <div className="w-full md:w-64 p-4 border-b md:border-b-0 md:border-r border-white/10 overflow-x-auto md:overflow-y-auto">
                  <p className="text-xs text-baikal-snow/40 uppercase tracking-wider mb-4 hidden md:block">Категории</p>
                  <div className="flex md:flex-col gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all whitespace-nowrap ${
                          selectedCategory === cat
                            ? 'bg-baikal-ochre/20 text-baikal-ochre border border-baikal-ochre/30'
                            : 'text-baikal-snow/60 hover:bg-white/5 hover:text-baikal-snow'
                        }`}
                      >
                        {cat === 'all' ? (
                          <>
                            <span className="text-lg">🏛️</span>
                            <span className="text-sm font-medium">Все достопримечательности</span>
                          </>
                        ) : (
                          <>
                            <span className="text-lg">
                              {cat === 'architecture' && '🏛️'}
                              {cat === 'museum' && '🏺'}
                              {cat === 'nature' && '🌲'}
                              {cat === 'religion' && '⛪'}
                              {cat === 'culture' && '🎭'}
                            </span>
                            <span className="text-sm font-medium">{categoryLabels[cat]}</span>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attractions Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-baikal-snow/60 text-sm">
                      {filteredAttractions.length} {filteredAttractions.length === 1 ? 'место' : filteredAttractions.length < 5 ? 'места' : 'мест'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredAttractions.map((attraction, index) => (
                        <motion.div
                          key={attraction.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${categoryColors[attraction.category]}`}>
                              {attraction.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-baikal-snow font-medium mb-2 group-hover:text-baikal-ochre transition-colors">
                                {attraction.name}
                              </h3>
                              <p className="text-sm text-baikal-snow/60 leading-relaxed">
                                {attraction.description}
                              </p>
                              <div className="mt-3 flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-lg text-xs border ${categoryColors[attraction.category]}`}>
                                  {categoryLabels[attraction.category]}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
