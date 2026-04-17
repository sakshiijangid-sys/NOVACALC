import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as math from 'mathjs';
import { UNIT_CATEGORIES, UnitCategory } from '../types';
import { cn } from '../lib/utils';
import { ArrowRightLeft, Layers, Weight, Thermometer, Database, Zap, Clock, Ruler } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  length: <Ruler size={16} />,
  area: <Layers size={16} />,
  mass: <Weight size={16} />,
  temperature: <Thermometer size={16} />,
  data: <Database size={16} />,
  speed: <Zap size={16} />,
  time: <Clock size={16} />,
};

export default function UnitConverter({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>(UNIT_CATEGORIES[0]);
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(UNIT_CATEGORIES[0].units[0]);
  const [toUnit, setToUnit] = useState(UNIT_CATEGORIES[0].units[1]);
  const [result, setResult] = useState('');

  const cleanUnit = (u: string) => {
    const match = u.match(/\((.*)\)/);
    return match ? match[1] : u;
  };

  useEffect(() => {
     // Reset units when category changes
     setFromUnit(selectedCategory.units[0]);
     setToUnit(selectedCategory.units[1]);
  }, [selectedCategory]);

  useEffect(() => {
    try {
      const v = parseFloat(value);
      if (isNaN(v)) {
        setResult('0');
        return;
      }
      
      const from = cleanUnit(fromUnit);
      const to = cleanUnit(toUnit);
      
      const converted = math.unit(v, from).toNumber(to);
      setResult(converted.toLocaleString(undefined, { maximumFractionDigits: 8 }));
    } catch (e) {
      setResult('Error');
    }
  }, [value, fromUnit, toUnit, selectedCategory]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Category Tabs */}
      <div className={cn(
        "flex overflow-x-auto space-x-2 px-6 py-4 scrollbar-hide border-b transition-colors",
        theme === 'dark' ? "border-white/5" : "border-zinc-100"
      )}>
        {UNIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
              selectedCategory.id === cat.id
                ? "bg-blue-600/20 text-blue-400 border-blue-500/30"
                : (theme === 'dark' ? "bg-white/5 text-white/40 border-transparent hover:bg-white/10" : "bg-zinc-100 text-zinc-400 border-transparent hover:bg-zinc-200")
            )}
          >
            {CATEGORY_ICONS[cat.id]}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col p-8 space-y-8 overflow-y-auto">
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-400">Input Value</label>
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
        </div>

        <div className="flex flex-col space-y-6">
          <div className="space-y-4 text-center">
            <label className="text-xs font-semibold opacity-40 float-left">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className={cn(
                "w-full h-14 border rounded-2xl px-4 focus:outline-none appearance-none transition-colors",
                theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
              )}
            >
              {selectedCategory.units.map(u => <option key={u} value={u} className="bg-zinc-900 text-white">{u}</option>)}
            </select>
          </div>

          <div className="flex justify-center -my-3 z-10">
              <button 
                onClick={() => {
                  const temp = fromUnit;
                  setFromUnit(toUnit);
                  setToUnit(temp);
                }}
                className="p-3 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-500/40 transform hover:rotate-180 transition-transform duration-300"
              >
                  <ArrowRightLeft size={18} />
              </button>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-semibold opacity-40">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className={cn(
                "w-full h-14 border rounded-2xl px-4 focus:outline-none appearance-none transition-colors",
                theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
              )}
            >
              {selectedCategory.units.map(u => <option key={u} value={u} className="bg-zinc-900 text-white">{u}</option>)}
            </select>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-end min-h-[120px]">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-400 mb-2">Equivalent Result</div>
          <motion.div 
            key={result}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "text-4xl font-mono font-bold break-all leading-tight transition-colors",
              theme === 'dark' ? "text-white" : "text-zinc-900"
            )}
          >
            {result}
            <span className="text-sm ml-2 opacity-50 block mt-1 tracking-wider uppercase">{toUnit}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
