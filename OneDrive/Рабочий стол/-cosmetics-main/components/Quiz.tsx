import React, { useState } from 'react';
import { SkinType, Concern, UserPreferences } from '../types';
import { Button } from './Button';
import { Check, ChevronRight } from 'lucide-react';

interface QuizProps {
  onComplete: (prefs: UserPreferences) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState<UserPreferences>({
    skinType: null,
    concerns: [],
    budget: 'Средний'
  });

  const handleSkinTypeSelect = (type: SkinType) => {
    setPrefs(prev => ({ ...prev, skinType: type }));
  };

  const handleConcernToggle = (concern: Concern) => {
    setPrefs(prev => {
      const exists = prev.concerns.includes(concern);
      return {
        ...prev,
        concerns: exists 
          ? prev.concerns.filter(c => c !== concern)
          : [...prev.concerns, concern]
      };
    });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(prefs);
  };

  const isNextDisabled = () => {
    if (step === 1) return !prefs.skinType;
    if (step === 2) return prefs.concerns.length === 0;
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-rose-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        <p className="text-center text-rose-600 font-medium mt-2">Шаг {step} из 3</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-rose-100/50">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900 text-center">Какой у вас тип кожи?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.values(SkinType).map((type) => (
                <button
                  key={type}
                  onClick={() => handleSkinTypeSelect(type)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    prefs.skinType === type 
                      ? 'border-rose-500 bg-rose-50 text-rose-700' 
                      : 'border-slate-100 hover:border-rose-200 text-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{type}</span>
                    {prefs.skinType === type && <Check className="w-5 h-5 text-rose-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900 text-center">Что вас беспокоит?</h2>
            <p className="text-center text-slate-500 -mt-4">Выберите всё подходящее</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.values(Concern).map((concern) => (
                <button
                  key={concern}
                  onClick={() => handleConcernToggle(concern)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    prefs.concerns.includes(concern)
                      ? 'border-rose-500 bg-rose-50 text-rose-700' 
                      : 'border-slate-100 hover:border-rose-200 text-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{concern}</span>
                    {prefs.concerns.includes(concern) && <Check className="w-5 h-5 text-rose-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900 text-center">Ваш бюджет?</h2>
            <div className="grid grid-cols-1 gap-4">
              {['Эконом', 'Средний', 'Люкс'].map((budget) => (
                <button
                  key={budget}
                  onClick={() => setPrefs(prev => ({ ...prev, budget: budget as any }))}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    prefs.budget === budget 
                      ? 'border-rose-500 bg-rose-50 text-rose-700' 
                      : 'border-slate-100 hover:border-rose-200 text-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium block text-lg">{budget}</span>
                      <span className="text-sm opacity-70">
                        {budget === 'Эконом' && 'Доступные средства масс-маркета'}
                        {budget === 'Средний' && 'Качественные бренды мидл-сегмента'}
                        {budget === 'Люкс' && 'Премиальная косметика известных брендов'}
                      </span>
                    </div>
                    {prefs.budget === budget && <Check className="w-6 h-6 text-rose-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleNext} 
            disabled={isNextDisabled()}
            className="w-full sm:w-auto"
          >
            {step === 3 ? 'Перейти к фото' : 'Далее'}
            {step !== 3 && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};