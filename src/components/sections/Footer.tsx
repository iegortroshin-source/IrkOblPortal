import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Youtube, Send, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/destinations';

const quickLinks = [
  { label: 'Направления', href: '#destinations' },
  { label: 'Впечатления', href: '#experiences' },
  { label: 'Планировщик', href: '#planner' },
  { label: 'Инфоцентр', href: '#infocenter' },
];

const legalLinks = [
  { label: 'Политика конфиденциальности', href: '#' },
  { label: 'Условия использования', href: '#' },
  { label: 'Правила бронирования', href: '#' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { language } = useApp();
  const t = translations[language as keyof typeof translations];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative pt-24 pb-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="section-padding relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-baikal-ice to-baikal-teal flex items-center justify-center">
                <span className="text-white font-bold text-xl">Б</span>
              </div>
              <span className="font-serif text-2xl text-baikal-snow">Baikal Travel</span>
            </div>
            <p className="text-baikal-snow/60 text-sm leading-relaxed mb-6">
              Маркетплейс впечатлений у Байкала. Мы помогаем путешественникам открывать красоту Иркутской области.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-baikal-snow/60 hover:bg-baikal-ochre hover:text-baikal-deep transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-baikal-snow/60 hover:bg-baikal-ochre hover:text-baikal-deep transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-baikal-snow/60 hover:bg-baikal-ochre hover:text-baikal-deep transition-all"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-baikal-snow font-medium mb-6">Навигация</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-baikal-snow/60 hover:text-baikal-ochre transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-baikal-snow font-medium mb-6">{t.footer.contacts}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-baikal-ochre flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-baikal-snow text-sm">+7 (3952) 00-00-00</p>
                  <p className="text-baikal-snow/40 text-xs">Ежедневно 9:00-21:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-baikal-ochre flex-shrink-0 mt-0.5" />
                <p className="text-baikal-snow text-sm">info@baikaltravel.ru</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-baikal-ochre flex-shrink-0 mt-0.5" />
                <p className="text-baikal-snow text-sm">Иркутск, ул. Ленина, 1</p>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-baikal-snow font-medium mb-6">{t.footer.subscribe}</h4>
            <p className="text-baikal-snow/60 text-sm mb-4">
              Получайте актуальную информацию о погоде, ледовой обстановке и спецпредложениях.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-baikal-snow placeholder:text-baikal-snow/40 focus:border-baikal-ochre focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-baikal-ochre text-baikal-deep hover:bg-baikal-ochre/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm"
                >
                  Спасибо за подписку!
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-baikal-snow/40 text-sm">
              © 2026 Baikal Travel. Все права защищены.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-baikal-snow/40 hover:text-baikal-snow/60 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-baikal-snow/40 text-sm">Язык:</span>
              <div className="flex gap-1">
                {['ru', 'en', 'cn'].map((lang) => (
                  <button
                    key={lang}
                    className={`px-2 py-1 rounded text-xs uppercase transition-colors ${
                      language === lang
                        ? 'bg-baikal-ochre/20 text-baikal-ochre'
                        : 'text-baikal-snow/40 hover:text-baikal-snow/60'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
