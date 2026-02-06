import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Globe, Sun, Snowflake } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/destinations';

const navItems = [
  { id: 'destinations', label: 'destinations' },
  { id: 'experiences', label: 'experiences' },
  { id: 'planner', label: 'planner' },
  { id: 'infocenter', label: 'infocenter' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { season, toggleSeason, language, setLanguage, cart, setIsCartOpen } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[language as keyof typeof translations];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-baikal-ice to-baikal-teal flex items-center justify-center">
                <span className="text-white font-bold text-lg">Б</span>
              </div>
              <span className="font-serif text-xl text-baikal-snow hidden sm:block">
                Baikal Travel
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-baikal-snow/80 hover:text-baikal-snow transition-colors link-underline py-1"
                >
                  {t.nav[item.label as keyof typeof t.nav]}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Season Toggle */}
              <button
                onClick={toggleSeason}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-light transition-all hover:bg-white/10"
                title={season === 'summer' ? t.season.summer : t.season.winter}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: season === 'summer' ? 0 : 180 }}
                  transition={{ duration: 0.4 }}
                >
                  {season === 'summer' ? (
                    <Sun className="w-4 h-4 text-baikal-ochre" />
                  ) : (
                    <Snowflake className="w-4 h-4 text-baikal-ice" />
                  )}
                </motion.div>
                <span className="text-sm text-baikal-snow/80 hidden sm:inline">
                  {season === 'summer' ? t.season.summer : t.season.winter}
                </span>
              </button>

              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <Globe className="w-4 h-4 text-baikal-snow/70" />
                  <span className="text-sm text-baikal-snow/80 uppercase">{language}</span>
                </button>
                <div className="absolute top-full right-0 mt-2 py-2 px-1 rounded-lg glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {(['ru', 'en', 'cn'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`block w-full px-4 py-2 text-sm text-left rounded-md transition-colors ${
                        language === lang
                          ? 'bg-baikal-ochre/20 text-baikal-ochre'
                          : 'text-baikal-snow/80 hover:bg-white/10'
                      }`}
                    >
                      {lang === 'ru' && 'Русский'}
                      {lang === 'en' && 'English'}
                      {lang === 'cn' && '中文'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-baikal-snow/80" />
                {cart.items.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-baikal-ochre text-baikal-deep text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cart.items.reduce((sum, i) => sum + i.quantity, 0)}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-baikal-snow" />
                ) : (
                  <Menu className="w-6 h-6 text-baikal-snow" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-baikal-deep/95 backdrop-blur-xl" />
            <nav className="relative h-full flex flex-col items-center justify-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-2xl font-display text-baikal-snow hover:text-baikal-ochre transition-colors"
                >
                  {t.nav[item.label as keyof typeof t.nav]}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
