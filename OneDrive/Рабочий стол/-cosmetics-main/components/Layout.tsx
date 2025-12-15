import React from 'react';
import { Sparkles, ShoppingBag, User } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-rose-50/50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-slate-800">GlowAI</span>
          </div>
          
          <nav className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-rose-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-500 hover:text-rose-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-rose-100 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 GlowAI Beauty Tech. Работает на базе Gemini.</p>
        </div>
      </footer>
    </div>
  );
};