import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Shield, Thermometer, FileText, Bus, AlertTriangle, CheckCircle, Info, Clock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { translations, safetyAlerts } from '@/data/destinations';

const tabs = [
  { id: 'safety', label: 'safety', icon: Shield },
  { id: 'ice', label: 'ice', icon: Thermometer },
  { id: 'rules', label: 'rules', icon: FileText },
  { id: 'transport', label: 'transport', icon: Bus },
] as const;

const iceConditions = [
  { location: 'Листвянка - Ольхон', thickness: 45, status: 'safe' as const },
  { location: 'Мыс Хобой', thickness: 32, status: 'caution' as const },
  { location: 'Мыс Бурхан', thickness: 28, status: 'caution' as const },
  { location: 'Малое море', thickness: 50, status: 'safe' as const },
];

const transportSchedule = [
  { route: 'Иркутск - Листвянка', type: 'Автобус', time: '08:00, 10:00, 14:00, 16:00', price: '350 ₽' },
  { route: 'Иркутск - Ольхон', type: 'Хивус (зима)', time: '09:00, 13:00', price: '1 500 ₽' },
  { route: 'Листвянка - Ольхон', type: 'Ледовая переправа', time: '08:00 - 18:00', price: '800 ₽' },
];

export function InfoCenter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['id']>('safety');

  const { language } = useApp();
  const t = translations[language as keyof typeof translations];

  const getStatusColor = (status: typeof iceConditions[0]['status']) => {
    switch (status) {
      case 'safe': return 'bg-green-500';
      case 'caution': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: typeof iceConditions[0]['status']) => {
    switch (status) {
      case 'safe': return 'Безопасно';
      case 'caution': return 'Осторожно';
      default: return 'Неизвестно';
    }
  };

  return (
    <section id="infocenter" className="py-24 relative">
      <div className="section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display text-baikal-snow mb-4">
            {t.infocenter.title}
          </h2>
          <p className="text-lg text-baikal-snow/60 max-w-2xl mx-auto">
            {t.infocenter.subtitle}
          </p>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-8"
        >
          {safetyAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-4 p-4 rounded-xl border-l-4 ${
                alert.type === 'danger'
                  ? 'bg-red-500/10 border-red-500'
                  : alert.type === 'warning'
                  ? 'bg-yellow-500/10 border-yellow-500'
                  : 'bg-blue-500/10 border-blue-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                  alert.type === 'danger'
                    ? 'text-red-400'
                    : alert.type === 'warning'
                    ? 'text-yellow-400'
                    : 'text-blue-400'
                }`} />
                <div className="flex-1">
                  <h4 className="text-baikal-snow font-medium mb-1">{alert.title}</h4>
                  <p className="text-baikal-snow/60 text-sm">{alert.description}</p>
                  {alert.location && (
                    <p className="text-baikal-snow/40 text-xs mt-2">📍 {alert.location}</p>
                  )}
                </div>
                <span className="text-xs text-baikal-snow/40">
                  {alert.date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl overflow-hidden">
            {/* Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'text-baikal-ochre border-b-2 border-baikal-ochre'
                      : 'text-baikal-snow/60 hover:text-baikal-snow'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {t.infocenter.tabs[tab.label]}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'safety' && (
                  <motion.div
                    key="safety"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <h4 className="text-baikal-snow font-medium">Рекомендации МЧС</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-baikal-snow/70">
                          <li>• Проверяйте толщину льда перед выходом</li>
                          <li>• Не выходите на лёд одиночно</li>
                          <li>• Имейте при себе спасательный жилет</li>
                          <li>• Сообщайте близким о маршруте</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                        <div className="flex items-center gap-3 mb-3">
                          <Info className="w-5 h-5 text-blue-400" />
                          <h4 className="text-baikal-snow font-medium">Экстренные службы</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-baikal-snow/70">
                          <li>• МЧС: 112</li>
                          <li>• Полиция: 102</li>
                          <li>• Скорая помощь: 103</li>
                          <li>• Поисково-спасательная служба: 8 (3952) 20-00-20</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'ice' && (
                  <motion.div
                    key="ice"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-baikal-snow/60 text-sm">Актуальные данные на {new Date().toLocaleDateString('ru-RU')}</p>
                      <span className="flex items-center gap-2 text-xs text-baikal-snow/40">
                        <Clock className="w-3 h-3" />
                        Обновлено 2 часа назад
                      </span>
                    </div>
                    <div className="space-y-3">
                      {iceConditions.map((condition, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(condition.status)}`} />
                            <div>
                              <p className="text-baikal-snow font-medium">{condition.location}</p>
                              <p className="text-sm text-baikal-snow/50">
                                Толщина льда: {condition.thickness} см
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            condition.status === 'safe'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {getStatusText(condition.status)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 rounded-xl bg-baikal-ice/10 border border-baikal-ice/30 mt-4">
                      <p className="text-sm text-baikal-ice">
                        <Info className="w-4 h-4 inline mr-2" />
                        Минимальная безопасная толщина льда для пешеходов — 15 см, для автомобилей — 35 см
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'rules' && (
                  <motion.div
                    key="rules"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-xl bg-white/5">
                      <h4 className="text-baikal-snow font-medium mb-3">Правила посещения заповедников</h4>
                      <ul className="space-y-3 text-sm text-baikal-snow/70">
                        <li className="flex items-start gap-2">
                          <span className="text-baikal-ochre">1.</span>
                          <span>Оформите пропуск заранее на сайте или в офисе заповедника</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-baikal-ochre">2.</span>
                          <span>Соблюдайте установленные маршруты — ходить только по тропам</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-baikal-ochre">3.</span>
                          <span>Не оставляйте мусор — принцип "Leave No Trace"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-baikal-ochre">4.</span>
                          <span>Не трогайте и не кормите диких животных</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-baikal-ochre">5.</span>
                          <span>Уважайте священные места — не поднимайтесь на шаман-скалу</span>
                        </li>
                      </ul>
                    </div>
                    <button className="w-full btn-secondary">
                      Оформить пропуск онлайн
                    </button>
                  </motion.div>
                )}

                {activeTab === 'transport' && (
                  <motion.div
                    key="transport"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-baikal-snow/50 border-b border-white/10">
                            <th className="pb-3 font-medium">Маршрут</th>
                            <th className="pb-3 font-medium">Тип транспорта</th>
                            <th className="pb-3 font-medium">Расписание</th>
                            <th className="pb-3 font-medium">Цена</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {transportSchedule.map((item, index) => (
                            <tr key={index} className="border-b border-white/5 last:border-0">
                              <td className="py-4 text-baikal-snow">{item.route}</td>
                              <td className="py-4 text-baikal-snow/70">{item.type}</td>
                              <td className="py-4 text-baikal-snow/70">{item.time}</td>
                              <td className="py-4 text-baikal-ochre font-medium">{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                      <p className="text-sm text-yellow-400">
                        <AlertTriangle className="w-4 h-4 inline mr-2" />
                        Расписание может меняться в зависимости от погодных условий. Уточняйте актуальное расписание перед поездкой.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
