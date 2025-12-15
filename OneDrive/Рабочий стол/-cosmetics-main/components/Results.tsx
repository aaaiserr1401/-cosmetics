import React from 'react';
import { AnalysisResult } from '../types';
import { Button } from './Button';
import { Star, ShoppingCart, RefreshCw, Droplet, Sun, ScanLine } from 'lucide-react';

interface ResultsProps {
  result: AnalysisResult;
  onRetake: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onRetake }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in pb-20">
      
      {/* Header Analysis */}
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-rose-100/50 mb-8 border border-rose-50">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
             <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Анализ вашей кожи</h2>
             <p className="text-slate-600 leading-relaxed mb-6">{result.analysisText}</p>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div className="bg-rose-50 rounded-xl p-4 flex items-center gap-3">
                 <div className="bg-white p-2 rounded-lg text-rose-600">
                    <Droplet className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-xs uppercase tracking-wider text-rose-800 font-semibold">Тон кожи</p>
                   <p className="font-medium text-slate-900">{result.skinTone}</p>
                 </div>
               </div>
               <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-3">
                 <div className="bg-white p-2 rounded-lg text-orange-600">
                    <Sun className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-xs uppercase tracking-wider text-orange-800 font-semibold">Подтон</p>
                   <p className="font-medium text-slate-900">{result.undertone}</p>
                 </div>
               </div>
               <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                 <div className="bg-white p-2 rounded-lg text-blue-600">
                    <ScanLine className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-xs uppercase tracking-wider text-blue-800 font-semibold">Особенности</p>
                   <p className="font-medium text-slate-900 text-sm truncate" title={result.detectedFeatures.join(', ')}>
                     {result.detectedFeatures[0]} {result.detectedFeatures.length > 1 && `+${result.detectedFeatures.length - 1}`}
                   </p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Подобрано для вас</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.recommendations.map((product, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-slate-100 flex flex-col">
            <div className="h-48 bg-slate-100 relative overflow-hidden group">
               {/* Placeholder for product image - using picsum with random ID to ensure different images */}
               <img 
                 src={`https://picsum.photos/400/300?random=${idx + 10}`} 
                 alt={product.name}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-slate-900">
                 {product.category}
               </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <p className="text-xs font-bold text-rose-500 uppercase tracking-wide mb-1">{product.brand}</p>
                   <h4 className="font-serif font-bold text-lg text-slate-900 leading-tight">{product.name}</h4>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                ))}
                <span className="text-sm text-slate-400 ml-1">({product.rating})</span>
              </div>

              <p className="text-sm text-slate-600 mb-6 flex-grow">{product.reason}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xl font-bold text-slate-900">{product.price}</span>
                <Button className="!py-2 !px-4 !text-sm">
                  В корзину
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="secondary" onClick={onRetake} className="mx-auto">
          <RefreshCw className="w-4 h-4 mr-2" />
          Начать новый анализ
        </Button>
      </div>
    </div>
  );
};