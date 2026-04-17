import React from 'react';
import { motion } from 'motion/react';
import { CalculationResult } from '../types';
import { Trash2, X, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  history: CalculationResult[];
  onClear: () => void;
  onClose: () => void;
}

export default function HistoryPanel({ history, onClear, onClose, theme = 'dark' }: Props & { theme?: 'dark' | 'light' }) {
  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className={cn(
          "text-xl font-bold tracking-tight transition-colors",
          theme === 'dark' ? "text-white" : "text-zinc-900"
        )}>Calculation History</h2>
        <div className="flex space-x-2">
            <button 
                onClick={onClear}
                className={cn(
                  "p-2 rounded-xl text-red-500/80 hover:text-red-500 transition-all",
                  theme === 'dark' ? "glass-button" : "bg-zinc-100 hover:bg-zinc-200"
                )}
                title="Clear History"
            >
                <Trash2 size={18} />
            </button>
            <button 
                onClick={onClose}
                className={cn(
                  "p-2 rounded-xl opacity-50 hover:opacity-100 transition-all",
                  theme === 'dark' ? "glass-button" : "bg-zinc-100 hover:bg-zinc-200"
                )}
            >
                <X size={18} />
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4 pt-20">
            <div className={cn(
              "p-6 rounded-full border-2 border-dashed transition-colors",
              theme === 'dark' ? "border-white/40" : "border-zinc-300"
            )}>
                <Trash2 size={40} />
            </div>
            <p className="text-sm font-medium uppercase tracking-widest text-inherit">No history yet</p>
          </div>
        ) : (
          history.map((item) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={item.id}
              className={cn(
                "p-4 rounded-2xl border space-y-2 group transition-all active:scale-[0.98]",
                theme === 'dark' 
                  ? "bg-white/5 border-white/5 hover:border-white/20" 
                  : "bg-zinc-50 border-zinc-100 hover:border-zinc-200 shadow-sm"
              )}
            >
              <div className="flex items-center justify-between text-xs font-mono opacity-40">
                 <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                 <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div className={cn(
                "text-sm font-mono opacity-60 break-all transition-colors",
                theme === 'dark' ? "text-white" : "text-zinc-600"
              )}>{item.expression}</div>
              <div className="text-2xl font-mono font-bold text-blue-400 break-all">= {item.result}</div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
