import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CURRENCY_LIST } from '../types';
import { GeminiService } from '../lib/geminiService';
import { cn } from '../lib/utils';
import { RefreshCw, TrendingUp } from 'lucide-react';

export default function CurrencyConverter({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const [value, setValue] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRate = async () => {
    setLoading(true);
    const newRate = await GeminiService.getCurrencyRate(fromCurrency, toCurrency);
    setRate(newRate);
    setLoading(false);
  };

  useEffect(() => {
    fetchRate();
  }, [fromCurrency, toCurrency]);

  const result = rate ? (parseFloat(value) * rate).toFixed(2) : '...';

  return (
    <div className="h-full flex flex-col p-8 space-y-10">
      <div className="space-y-4">
        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-green-400">Amount</label>
        <div className="relative">
            <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(
               "w-full bg-transparent text-5xl font-mono font-bold focus:outline-none border-b pb-2 transition-colors",
               theme === 'dark' ? "border-white/10 text-white" : "border-zinc-200 text-zinc-900"
            )}
            placeholder="0"
            />
            <span className="absolute right-0 bottom-2 text-xl opacity-40 font-mono">
                {fromCurrency}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
           <label className="text-[10px] uppercase tracking-widest opacity-40">From</label>
           <select 
             value={fromCurrency}
             onChange={(e) => setFromCurrency(e.target.value)}
             className={cn(
               "w-full h-12 border rounded-xl px-3 focus:outline-none appearance-none cursor-pointer transition-colors",
               theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
             )}
           >
             {CURRENCY_LIST.map(c => <option key={c.code} value={c.code} className="bg-zinc-900 text-white">{c.code} - {c.name}</option>)}
           </select>
        </div>
        <div className="space-y-2">
           <label className="text-[10px] uppercase tracking-widest opacity-40">To</label>
           <select 
             value={toCurrency}
             onChange={(e) => setToCurrency(e.target.value)}
             className={cn(
               "w-full h-12 border rounded-xl px-3 focus:outline-none appearance-none cursor-pointer transition-colors",
               theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
             )}
           >
             {CURRENCY_LIST.map(c => <option key={c.code} value={c.code} className="bg-zinc-900 text-white">{c.code} - {c.name}</option>)}
           </select>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end pb-10">
        <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-green-400">Converted Amount</div>
            <button 
                onClick={fetchRate}
                className={cn("p-2 rounded-lg transition-colors", loading && "animate-spin", theme === 'dark' ? "hover:bg-white/5" : "hover:bg-zinc-100")}
            >
                <RefreshCw size={14} className="opacity-50" />
            </button>
        </div>
        
        <div className={cn(
          "text-5xl font-mono font-bold break-all flex items-baseline transition-colors",
          theme === 'dark' ? "text-white" : "text-zinc-900"
        )}>
          {result}
          <span className="text-xl ml-2 opacity-50">{toCurrency}</span>
        </div>

        <div className={cn(
          "mt-4 p-4 rounded-2xl border flex items-center space-x-4 transition-colors",
          theme === 'dark' ? "bg-white/5 border-white/10" : "bg-zinc-100 border-zinc-100"
        )}>
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                <TrendingUp size={16} />
            </div>
            <div>
                <div className="text-[10px] uppercase tracking-widest opacity-40">Live Rate (via AI)</div>
                <div className={cn(
                  "text-sm font-mono transition-colors",
                  theme === 'dark' ? "text-white" : "text-zinc-600"
                )}>1 {fromCurrency} ≈ {rate?.toFixed(4)} {toCurrency}</div>
            </div>
        </div>
      </div>
    </div>
  );
}
