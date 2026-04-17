import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { MathService } from '../lib/mathService';
import { cn } from '../lib/utils';
import { CalculationResult } from '../types';
import { Delete, Eraser } from 'lucide-react';

interface Props {
  onAddHistory: (result: CalculationResult) => void;
  theme?: 'dark' | 'light';
}

const BUTTONS = [
  { label: <Eraser size={20} />, type: 'clear', color: 'text-red-400', key: 'C' },
  { label: '(', type: 'op', color: 'theme-op' },
  { label: ')', type: 'op', color: 'theme-op' },
  { label: '÷', type: 'op', value: '/', color: 'theme-op' },
  
  { label: '7', type: 'num' },
  { label: '8', type: 'num' },
  { label: '9', type: 'num' },
  { label: '×', type: 'op', value: '*', color: 'theme-op' },
  
  { label: '4', type: 'num' },
  { label: '5', type: 'num' },
  { label: '6', type: 'num' },
  { label: '-', type: 'op', color: 'theme-op' },
  
  { label: '1', type: 'num' },
  { label: '2', type: 'num' },
  { label: '3', type: 'num' },
  { label: '+', type: 'op', color: 'theme-op' },
  
  { label: '0', type: 'num' },
  { label: '.', type: 'num' },
  { label: <Delete size={20} />, type: 'backspace', key: 'back' },
  { label: '=', type: 'equals', color: 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' },
];

const SCI_BUTTONS = [
  { label: 'sin', type: 'func' },
  { label: 'cos', type: 'func' },
  { label: 'tan', type: 'func' },
  { label: 'π', type: 'num', value: 'pi' },
  { label: 'log', type: 'func' },
  { label: 'ln', type: 'func' },
  { label: '√', type: 'func', value: 'sqrt' },
  { label: '^', type: 'op' },
];

export default function ScientificCalculator({ onAddHistory, theme = 'dark' }: Props) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [isScientific, setIsScientific] = useState(false);

  const handleInput = useCallback((val: string) => {
    setExpression(prev => prev + val);
  }, []);

  const handleBackspace = useCallback(() => {
    setExpression(prev => prev.slice(0, -1));
  }, []);

  const handleClear = useCallback(() => {
    setExpression('');
    setResult('');
  }, []);

  const handleEvaluate = useCallback(() => {
    if (!expression) return;
    const res = MathService.evaluate(expression);
    setResult(res);
    onAddHistory({
      id: Math.random().toString(36).substr(2, 9),
      expression,
      result: res,
      timestamp: Date.now()
    });
  }, [expression, onAddHistory]);

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      {/* Display */}
      <div className="flex-1 flex flex-col justify-end items-end space-y-2 py-4">
        <motion.div 
          layout
          className={cn(
            "text-right font-mono text-lg overflow-x-auto whitespace-nowrap w-full scrollbar-hide",
            theme === 'dark' ? "text-gray-400" : "text-zinc-400"
          )}
        >
          {expression || '0'}
        </motion.div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "text-right text-5xl font-mono font-bold tracking-tighter transition-colors",
            theme === 'dark' ? "text-white" : "text-zinc-900"
          )}
        >
          {result ? `= ${result}` : ''}
        </motion.div>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-start">
        <button 
          onClick={() => setIsScientific(!isScientific)}
          className={cn(
            "text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border transition-all",
            isScientific 
              ? "bg-blue-600 border-blue-500 text-white" 
              : (theme === 'dark' ? "bg-white/5 border-white/10 text-white/40" : "bg-zinc-100 border-zinc-200 text-zinc-400")
          )}
        >
          Scientific
        </button>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-3">
        {isScientific && SCI_BUTTONS.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleInput(btn.value || btn.label + '(')}
            className={cn(
              "h-12 rounded-2xl flex items-center justify-center font-mono text-sm opacity-80 transition-colors",
              theme === 'dark' ? "glass-button" : "bg-zinc-100 border border-zinc-100 hover:bg-zinc-200"
            )}
          >
            {btn.label}
          </button>
        ))}

        {BUTTONS.map((btn, idx) => (
          <button
            key={btn.key || (typeof btn.label === 'string' ? btn.label : idx)}
            onClick={() => {
              if (btn.type === 'backspace') handleBackspace();
              else if (btn.type === 'clear') handleClear();
              else if (btn.type === 'equals') handleEvaluate();
              else handleInput(btn.value || (typeof btn.label === 'string' ? btn.label : ''));
            }}
            className={cn(
              "h-16 rounded-2xl flex items-center justify-center text-xl font-medium transition-all active:scale-95",
              btn.type === 'num' 
                ? (theme === 'dark' ? "glass-button font-mono" : "bg-zinc-50 border border-zinc-100 font-mono shadow-sm") 
                : (theme === 'dark' ? "bg-white/10 hover:bg-white/20" : "bg-zinc-100 hover:bg-zinc-200"),
              btn.color === 'theme-op' 
                ? (theme === 'dark' ? "text-white" : "text-blue-600") 
                : btn.color,
              btn.type === 'equals' && "col-span-1"
            )}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
