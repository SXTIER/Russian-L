import React from 'react';
import { RotateCw, Crosshair } from 'lucide-react';

interface GameControlsProps {
    onSpin: () => void;
    onFire: () => void;
    isProcessing: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({ onSpin, onFire, isProcessing }) => {
    return (
        <div className="absolute bottom-10 z-30 flex gap-6">
            <button
                onClick={onSpin}
                disabled={isProcessing}
                className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 transition-all
              ${isProcessing
                        ? 'bg-neutral-800 border-neutral-700 text-neutral-600 opacity-50 cursor-not-allowed'
                        : 'bg-stone-800 border-stone-600 text-stone-300 hover:bg-stone-700 hover:scale-105 active:scale-95 shadow-lg'}`}
            >
                <RotateCw size={24} className="mb-1" />
                <span className="text-[10px] font-bold uppercase">หมุนโม่</span>
            </button>

            <button
                onClick={onFire}
                disabled={isProcessing}
                className={`flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 transition-all
              ${isProcessing
                        ? 'bg-neutral-800 border-neutral-700 text-neutral-600 opacity-50 cursor-not-allowed'
                        : 'bg-red-900 border-red-700 text-red-100 hover:bg-red-800 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(153,27,27,0.6)]'}`}
            >
                <Crosshair size={32} className="mb-1" />
                <span className="text-xs font-bold uppercase">ลั่นไก</span>
            </button>
        </div>
    );
};
