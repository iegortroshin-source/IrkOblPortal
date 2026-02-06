import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/destinations';

export function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, language } = useApp();
  const t = translations[language as keyof typeof translations];

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md glass z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-display text-baikal-snow">{t.cart.title}</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-baikal-snow/70" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {cart.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Trash2 className="w-8 h-8 text-baikal-snow/30" />
                  </div>
                  <p className="text-baikal-snow/50">{t.cart.empty}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 rounded-xl bg-white/5"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-baikal-snow font-medium text-sm">{item.title}</h3>
                        <p className="text-baikal-snow/50 text-xs mt-1">
                          {item.date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-baikal-ochre font-semibold">
                            {item.price.toLocaleString()} ₽
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-baikal-snow/70 text-sm">×{item.quantity}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-baikal-snow/70">{t.cart.total}</span>
                  <span className="text-2xl font-display text-baikal-ochre">
                    {cart.total.toLocaleString()} ₽
                  </span>
                </div>
                <button className="w-full btn-primary py-4">
                  {t.cart.checkout}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
