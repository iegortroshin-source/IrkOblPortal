import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Hotel, MapPin, Bus, Ticket, Star, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/destinations';

const bookingCategories = [
  { id: 'hotel', label: 'hotel', icon: Hotel },
  { id: 'tour', label: 'tour', icon: MapPin },
  { id: 'transport', label: 'transport', icon: Bus },
  { id: 'ticket', label: 'ticket', icon: Ticket },
] as const;

const bookingItems = [
  {
    id: 'hotel-1',
    type: 'hotel' as const,
    title: 'Отель "Байкальская Ривьера"',
    image: '/images/destination-listvyanka.jpg',
    rating: 4.8,
    reviews: 234,
    price: 8500,
    description: '4-звёздочный отель с видом на Байкал',
  },
  {
    id: 'hotel-2',
    type: 'hotel' as const,
    title: 'Гостевой дом "Ольхон"',
    image: '/images/destination-olkhon.jpg',
    rating: 4.6,
    reviews: 189,
    price: 3500,
    description: 'Уютный гостевой дом на острове Ольхон',
  },
  {
    id: 'tour-1',
    type: 'tour' as const,
    title: 'Обзорная экскурсия по Иркутску',
    image: '/images/destination-irkutsk.jpg',
    rating: 4.9,
    reviews: 456,
    price: 2500,
    description: '3 часа с профессиональным гидом',
  },
  {
    id: 'tour-2',
    type: 'tour' as const,
    title: 'Фототур на ледяные гроты',
    image: '/images/hero-winter.jpg',
    rating: 5.0,
    reviews: 89,
    price: 15000,
    description: 'Целый день на мысе Хобой с фотографом',
  },
  {
    id: 'transport-1',
    type: 'transport' as const,
    title: 'Трансфер Иркутск - Ольхон',
    image: '/images/destination-olkhon.jpg',
    rating: 4.7,
    reviews: 312,
    price: 2500,
    description: 'Комфортабельный микроавтобус',
  },
  {
    id: 'ticket-1',
    type: 'ticket' as const,
    title: 'Билет в Байкальский музей',
    image: '/images/destination-listvyanka.jpg',
    rating: 4.5,
    reviews: 567,
    price: 400,
    description: 'Входной билет + экскурсия',
  },
];

export function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<typeof bookingCategories[number]['id']>('hotel');

  const { language, addToCart } = useApp();
  const t = translations[language as keyof typeof translations];

  const filteredItems = bookingItems.filter(item => item.type === activeCategory);

  return (
    <section id="booking" className="py-24 relative">
      <div className="section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display text-baikal-snow mb-4">
            {t.booking.title}
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-12 flex-wrap"
        >
          {bookingCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all ${
                activeCategory === cat.id
                  ? 'bg-baikal-ochre text-baikal-deep'
                  : 'bg-white/5 text-baikal-snow/70 hover:bg-white/10 hover:text-baikal-snow'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              <span className="font-medium">{t.booking.categories[cat.label]}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                  <Star className="w-3 h-3 text-baikal-ochre fill-baikal-ochre" />
                  <span className="text-xs text-white font-medium">{item.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-display text-baikal-snow mb-1 group-hover:text-baikal-ochre transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-baikal-snow/60 mb-3">{item.description}</p>
                <p className="text-xs text-baikal-snow/40 mb-4">{item.reviews} отзывов</p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-2xl font-display text-baikal-ochre">
                      {item.price.toLocaleString()} ₽
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart({
                      id: item.id,
                      type: item.type,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                      date: new Date(),
                      quantity: 1,
                    })}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-baikal-ochre text-baikal-deep hover:bg-baikal-ochre/90 transition-colors font-medium"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t.booking.addToCart}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
