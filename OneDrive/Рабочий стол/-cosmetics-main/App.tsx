import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Quiz } from './components/Quiz';
import { PhotoUpload } from './components/PhotoUpload';
import { Results } from './components/Results';
import { Button } from './components/Button';
import { AppStep, UserPreferences, AnalysisResult } from './types';
import { analyzeSkinAndRecommend } from './services/geminiService';
import { Sparkles, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('LANDING');
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuizComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setCurrentStep('UPLOAD');
    window.scrollTo(0, 0);
  };

  const handleImageSelected = async (file: File) => {
    if (!preferences) return;

    setCurrentStep('ANALYZING');
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeSkinAndRecommend(file, preferences);
      setAnalysisResult(result);
      setCurrentStep('RESULTS');
    } catch (err) {
      console.error(err);
      setError("Возникла проблема при анализе фото. Пожалуйста, попробуйте снова или проверьте интернет-соединение.");
      setCurrentStep('UPLOAD');
    } finally {
      setIsAnalyzing(false);
      window.scrollTo(0, 0);
    }
  };

  const resetApp = () => {
    setPreferences(null);
    setAnalysisResult(null);
    setCurrentStep('LANDING');
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      {currentStep === 'LANDING' && (
        <div className="relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 pt-20 pb-32 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              <span>ИИ-технологии в дерматологии</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight animate-fade-in-up delay-100">
              Идеальный уход, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Подобранный наукой.</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Загрузите селфи, и наш ИИ проанализирует профиль вашей кожи, чтобы подобрать средства, которые действительно работают.
            </p>
            
            <div className="animate-fade-in-up delay-300">
              <Button onClick={() => setCurrentStep('QUIZ')} className="text-lg px-10 py-4 shadow-xl shadow-rose-200">
                Начать консультацию
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-rose-200/20 rounded-full blur-3xl -z-10 -translate-y-1/2 pointer-events-none"></div>
        </div>
      )}

      {currentStep === 'QUIZ' && (
        <Quiz onComplete={handleQuizComplete} />
      )}

      {currentStep === 'UPLOAD' && (
        <>
          <PhotoUpload onImageSelected={handleImageSelected} />
          {error && (
            <div className="max-w-md mx-auto mt-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center">
              {error}
            </div>
          )}
        </>
      )}

      {currentStep === 'ANALYZING' && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-rose-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-rose-600 rounded-full border-t-transparent animate-spin"></div>
            <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-rose-500 animate-pulse" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Анализируем ваш профиль...</h2>
          <p className="text-slate-500 max-w-md">Наш ИИ сканирует текстуру кожи, подтон и подбирает ингредиенты под ваши потребности.</p>
        </div>
      )}

      {currentStep === 'RESULTS' && analysisResult && (
        <Results result={analysisResult} onRetake={resetApp} />
      )}
    </Layout>
  );
};

export default App;