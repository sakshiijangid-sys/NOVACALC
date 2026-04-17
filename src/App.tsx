import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator as CalcIcon, 
  Ruler, 
  Coins, 
  History, 
  Settings,
  X,
  Menu,
  Moon,
  Sun,
  Trash2,
  ChevronLeft
} from 'lucide-react';
import { cn } from './lib/utils';
import { CalculatorMode, CalculationResult } from './types';
import ScientificCalculator from './components/ScientificCalculator';
import UnitConverter from './components/UnitConverter';
import CurrencyConverter from './components/CurrencyConverter';
import HistoryPanel from './components/HistoryPanel';

export default function App() {
  const [mode, setMode] = useState<CalculatorMode>('scientific');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [history, setHistory] = useState<CalculationResult[]>([]);

  const addToHistory = (calc: CalculationResult) => {
    setHistory(prev => [calc, ...prev].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className={cn(
      "relative min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500 overflow-hidden",
      theme === 'dark' ? "bg-black text-white" : "bg-zinc-100 text-zinc-900"
    )}>
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={cn(
          "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-700",
          theme === 'dark' ? "bg-blue-600/10" : "bg-blue-400/20"
        )} />
        <div className={cn(
          "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-700",
          theme === 'dark' ? "bg-purple-600/10" : "bg-indigo-400/10"
        )} />
      </div>

      <main className={cn(
        "relative z-10 w-full max-w-lg aspect-[9/16] max-h-[90vh] rounded-[40px] flex flex-col overflow-hidden transition-all duration-500",
        theme === 'dark' 
          ? "glass-card" 
          : "bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-blue-500/5 text-zinc-900"
      )}>
        {/* Header */}
        <header className={cn(
          "px-6 py-6 flex items-center justify-between border-b transition-colors",
          theme === 'dark' ? "border-white/10" : "border-zinc-200"
        )}>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className={cn(
               "p-2 rounded-xl transition-all",
               theme === 'dark' ? "glass-button" : "bg-zinc-200/50 hover:bg-zinc-300/50"
            )}
            title="Menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex flex-col items-center">
            <h1 className="text-xs font-medium tracking-[0.2em] uppercase opacity-50 px-2">NovaCalc</h1>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              {mode === 'scientific' ? 'Scientific' : mode}
            </span>
          </div>

          <button 
             onClick={() => setMode('history')}
             className={cn(
               "p-2 rounded-xl transition-colors",
               theme === 'dark' 
                ? (mode === 'history' ? "bg-white/20" : "glass-button")
                : (mode === 'history' ? "bg-zinc-300" : "bg-zinc-200/50 hover:bg-zinc-300/50")
             )}
             title="History"
          >
            <History size={20} />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {mode === 'scientific' && (
              <motion.div
                key="scientific"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <ScientificCalculator onAddHistory={addToHistory} theme={theme} />
              </motion.div>
            )}

            {mode === 'converter' && (
              <motion.div
                key="converter"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <UnitConverter theme={theme} />
              </motion.div>
            )}

            {mode === 'currency' && (
              <motion.div
                key="currency"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <CurrencyConverter theme={theme} />
              </motion.div>
            )}

            {mode === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="h-full"
              >
                <HistoryPanel 
                  history={history} 
                  onClear={clearHistory} 
                  onClose={() => setMode('scientific')} 
                  theme={theme}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 20 }}
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-3/4 border-r z-50 p-6 flex flex-col transition-colors duration-500",
                  theme === 'dark' ? "bg-zinc-900 border-white/10" : "bg-white border-zinc-200"
                )}
              >
                <div className="flex items-center justify-between mb-10">
                  <span className={cn(
                    "font-bold text-xl tracking-tight",
                    theme === 'dark' ? "text-white/90" : "text-zinc-900"
                  )}>Options</span>
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <X size={24} className="opacity-50 hover:opacity-100" />
                  </button>
                </div>

                <nav className="flex-1 space-y-4">
                  <SidebarItem 
                    icon={<CalcIcon size={20} />} 
                    label="Scientific Calculator" 
                    isActive={mode === 'scientific'} 
                    theme={theme}
                    onClick={() => { setMode('scientific'); setIsSidebarOpen(false); }} 
                  />
                  <SidebarItem 
                    icon={<Ruler size={20} />} 
                    label="Unit Converter" 
                    isActive={mode === 'converter'} 
                    theme={theme}
                    onClick={() => { setMode('converter'); setIsSidebarOpen(false); }} 
                  />
                  <SidebarItem 
                    icon={<Coins size={20} />} 
                    label="Currency Exchange" 
                    isActive={mode === 'currency'} 
                    theme={theme}
                    onClick={() => { setMode('currency'); setIsSidebarOpen(false); }} 
                  />
                </nav>

                {/* Theme Slider */}
                <div className={cn(
                  "mt-auto pt-6 border-t flex flex-col space-y-4",
                  theme === 'dark' ? "border-white/10" : "border-zinc-100"
                )}>
                  <div className={cn(
                    "text-[10px] uppercase tracking-widest font-bold px-2",
                    theme === 'dark' ? "text-white/30" : "text-zinc-400"
                  )}>Theme</div>
                  
                  <div 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={cn(
                      "relative h-12 rounded-2xl p-1 flex cursor-pointer transition-colors duration-500",
                      theme === 'dark' ? "bg-zinc-800" : "bg-zinc-100"
                    )}
                  >
                    <motion.div 
                      layout
                      className={cn(
                        "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl z-0",
                        theme === 'dark' ? "bg-blue-600 shadow-lg shadow-blue-500/20" : "bg-white shadow-md shadow-black/5"
                      )}
                      initial={false}
                      animate={{ x: theme === 'dark' ? 0 : '100%' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    
                    <div className="relative z-10 flex-1 flex items-center justify-center space-x-2">
                       <Moon size={16} className={cn("transition-colors", theme === 'dark' ? "text-white" : "text-zinc-400")} />
                       <span className={cn("text-xs font-bold transition-colors", theme === 'dark' ? "text-white" : "text-zinc-400")}>Dark</span>
                    </div>
                    <div className="relative z-10 flex-1 flex items-center justify-center space-x-2">
                       <Sun size={16} className={cn("transition-colors", theme === 'light' ? "text-blue-600" : "text-zinc-600")} />
                       <span className={cn("text-xs font-bold transition-colors", theme === 'light' ? "text-zinc-900" : "text-zinc-600")}>Light</span>
                    </div>
                  </div>
                  
                  <div className="text-center opacity-20">
                    <span className="text-[10px] uppercase tracking-widest">NovaCalc v1.0</span>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, isActive, onClick, theme }: { icon: React.ReactNode, label: string, isActive?: boolean, onClick: () => void, theme?: 'dark' | 'light' }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-4 p-4 rounded-2xl transition-all border border-transparent",
        isActive 
          ? (theme === 'dark' ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : "bg-blue-50 text-blue-600 border-blue-100 shadow-sm")
          : (theme === 'dark' ? "hover:bg-white/5 text-white/70" : "hover:bg-zinc-50 text-zinc-600")
      )}
    >
      <div className={cn(
        "p-2 rounded-lg",
        isActive 
          ? (theme === 'dark' ? "bg-blue-600/40" : "bg-blue-600 text-white") 
          : (theme === 'dark' ? "bg-white/5" : "bg-zinc-100")
      )}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
}
