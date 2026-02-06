import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Heart, Wallet, ChevronRight, ChevronLeft, Clock, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/destinations';
import type { ExperienceCategory, TripPlan } from '@/types';

const tripTypes = [
  { id: 'family', icon: Users, label: 'Семья' },
  { id: 'couple', icon: Heart, label: 'Пара' },
  { id: 'friends', icon: Users, label: 'Друзья' },
  { id: 'solo', icon: Users, label: 'Один' },
] as const;

const budgetTypes = [
  { id: 'economy', label: 'Эконом', description: 'До 30 000 ₽' },
  { id: 'standard', label: 'Стандарт', description: '30-60 000 ₽' },
  { id: 'premium', label: 'Премиум', description: '60 000+ ₽' },
] as const;

const intensityTypes = [
  { id: 'relaxed', label: 'Расслабленная', description: '1-2 активности в день' },
  { id: 'moderate', label: 'Средняя', description: '2-3 активности в день' },
  { id: 'intensive', label: 'Насыщенная', description: '3+ активности в день' },
] as const;

const categories: ExperienceCategory[] = ['gastronomy', 'ethnography', 'active', 'family', 'wellness', 'photo'];

export function TripPlanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const { season, language } = useApp();
  const t = translations[language as keyof typeof translations];

  const [plan, setPlan] = useState<Partial<TripPlan>>({
    travelers: 2,
    tripType: 'family',
    budget: 'standard',
    intensity: 'moderate',
    interests: [],
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setShowResult(true);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleInterest = (interest: ExperienceCategory) => {
    setPlan(prev => ({
      ...prev,
      interests: prev.interests?.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...(prev.interests || []), interest],
    }));
  };

  const progress = (step / 3) * 100;

  return (
    <section id="planner" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-baikal-deep via-baikal-deep/95 to-baikal-deep" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-baikal-ice rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-baikal-ochre rounded-full blur-3xl" />
      </div>

      <div className="section-padding relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display text-baikal-snow mb-4">
            {t.planner.title}
          </h2>
          <p className="text-lg text-baikal-snow/60 max-w-2xl mx-auto">
            {t.planner.subtitle}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-3xl mx-auto"
        >
          <div className="glass rounded-3xl p-6 md:p-10">
            {/* Progress */}
            {!showResult && (
              <div className="mb-8">
                <div className="flex justify-between text-sm text-baikal-snow/60 mb-2">
                  <span>{t.planner.step1}</span>
                  <span>{t.planner.step2}</span>
                  <span>{t.planner.step3}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-baikal-ice to-baikal-ochre"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 mx-auto mb-6"
                  >
                    <Sparkles className="w-16 h-16 text-baikal-ochre" />
                  </motion.div>
                  <p className="text-xl text-baikal-snow mb-2">Создаём ваш идеальный маршрут...</p>
                  <p className="text-baikal-snow/50">Анализируем сезонную логистику</p>
                </motion.div>
              ) : showResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                      <Sparkles className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-display text-baikal-snow mb-2">Ваш маршрут готов!</h3>
                    <p className="text-baikal-snow/60">3 дня приключений у Байкала</p>
                  </div>

                  {/* Day Cards */}
                  {[1, 2, 3].map((day) => (
                    <div key={day} className="bg-white/5 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-8 rounded-full bg-baikal-ochre text-baikal-deep font-bold flex items-center justify-center">
                          {day}
                        </span>
                        <span className="text-baikal-snow font-medium">День {day}</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                          <Clock className="w-4 h-4 text-baikal-ice mt-0.5" />
                          <div>
                            <p className="text-sm text-baikal-snow/50">10:00</p>
                            <p className="text-baikal-snow">Экскурсия по Иркутску</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                          <Clock className="w-4 h-4 text-baikal-ice mt-0.5" />
                          <div>
                            <p className="text-sm text-baikal-snow/50">14:00</p>
                            <p className="text-baikal-snow">Обед в ресторане с видом на Байкал</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setShowResult(false);
                      setStep(1);
                    }}
                    className="w-full btn-secondary"
                  >
                    Создать новый маршрут
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-display text-baikal-snow mb-6">Параметры поездки</h3>

                      {/* Dates */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-baikal-snow/60 mb-2">Прибытие</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-baikal-snow/40" />
                            <input
                              type="date"
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-baikal-snow focus:border-baikal-ochre focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-baikal-snow/60 mb-2">Отъезд</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-baikal-snow/40" />
                            <input
                              type="date"
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-baikal-snow focus:border-baikal-ochre focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Travelers */}
                      <div>
                        <label className="block text-sm text-baikal-snow/60 mb-2">Количество человек</label>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setPlan(p => ({ ...p, travelers: Math.max(1, (p.travelers || 1) - 1) }))}
                            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-baikal-snow"
                          >
                            -
                          </button>
                          <span className="text-xl text-baikal-snow w-8 text-center">{plan.travelers}</span>
                          <button
                            onClick={() => setPlan(p => ({ ...p, travelers: (p.travelers || 1) + 1 }))}
                            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-baikal-snow"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Trip Type */}
                      <div>
                        <label className="block text-sm text-baikal-snow/60 mb-3">Тип поездки</label>
                        <div className="grid grid-cols-2 gap-3">
                          {tripTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setPlan(p => ({ ...p, tripType: type.id }))}
                              className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                                plan.tripType === type.id
                                  ? 'border-baikal-ochre bg-baikal-ochre/10'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <type.icon className={`w-5 h-5 ${plan.tripType === type.id ? 'text-baikal-ochre' : 'text-baikal-snow/60'}`} />
                              <span className={plan.tripType === type.id ? 'text-baikal-snow' : 'text-baikal-snow/60'}>{type.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-sm text-baikal-snow/60 mb-3">Бюджет</label>
                        <div className="space-y-2">
                          {budgetTypes.map((budget) => (
                            <button
                              key={budget.id}
                              onClick={() => setPlan(p => ({ ...p, budget: budget.id as typeof plan.budget }))}
                              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                                plan.budget === budget.id
                                  ? 'border-baikal-ochre bg-baikal-ochre/10'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Wallet className={`w-5 h-5 ${plan.budget === budget.id ? 'text-baikal-ochre' : 'text-baikal-snow/60'}`} />
                                <span className={plan.budget === budget.id ? 'text-baikal-snow' : 'text-baikal-snow/60'}>{budget.label}</span>
                              </div>
                              <span className="text-sm text-baikal-snow/40">{budget.description}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-display text-baikal-snow mb-6">Ваши интересы</h3>

                      {/* Categories */}
                      <div>
                        <label className="block text-sm text-baikal-snow/60 mb-3">Что вам интересно?</label>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => toggleInterest(cat)}
                              className={`px-4 py-2 rounded-full text-sm transition-all ${
                                plan.interests?.includes(cat)
                                  ? 'bg-baikal-ochre text-baikal-deep'
                                  : 'bg-white/5 text-baikal-snow/70 hover:bg-white/10'
                              }`}
                            >
                              {t.experiences.categories[cat]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Intensity */}
                      <div>
                        <label className="block text-sm text-baikal-snow/60 mb-3">Интенсивность</label>
                        <div className="space-y-2">
                          {intensityTypes.map((intensity) => (
                            <button
                              key={intensity.id}
                              onClick={() => setPlan(p => ({ ...p, intensity: intensity.id as typeof plan.intensity }))}
                              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                                plan.intensity === intensity.id
                                  ? 'border-baikal-ochre bg-baikal-ochre/10'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <span className={plan.intensity === intensity.id ? 'text-baikal-snow' : 'text-baikal-snow/60'}>
                                {intensity.label}
                              </span>
                              <span className="text-sm text-baikal-snow/40">{intensity.description}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-display text-baikal-snow mb-6">Проверьте данные</h3>

                      <div className="space-y-4 bg-white/5 rounded-xl p-6">
                        <div className="flex justify-between">
                          <span className="text-baikal-snow/60">Даты</span>
                          <span className="text-baikal-snow">15-18 февраля 2026</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-baikal-snow/60">Путешественники</span>
                          <span className="text-baikal-snow">{plan.travelers} чел.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-baikal-snow/60">Тип поездки</span>
                          <span className="text-baikal-snow">{tripTypes.find(t => t.id === plan.tripType)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-baikal-snow/60">Бюджет</span>
                          <span className="text-baikal-snow">{budgetTypes.find(b => b.id === plan.budget)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-baikal-snow/60">Интересы</span>
                          <span className="text-baikal-snow">{plan.interests?.length || 0} выбрано</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-baikal-snow/60">Интенсивность</span>
                          <span className="text-baikal-snow">{intensityTypes.find(i => i.id === plan.intensity)?.label}</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-baikal-ochre/10 border border-baikal-ochre/30">
                        <p className="text-sm text-baikal-ochre">
                          <Sparkles className="w-4 h-4 inline mr-2" />
                          Наш алгоритм учтёт сезонную логистику: {season === 'winter' ? 'ледовые переправы и хивусы' : 'паромные очереди и погоду'}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {!showResult && !isGenerating && (
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Назад
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {step === 3 ? t.planner.generate : 'Далее'}
                  {step !== 3 && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
