import React from 'react';
import { RefreshCw } from 'lucide-react';

interface GameOverProps {
    onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
    return (
        <div className="absolute bottom-20 z-40 animate-bounce">
            <button
                onClick={onRestart}
                className="px-8 py-3 bg-white text-black font-bold rounded shadow-xl hover:bg-neutral-200 flex items-center gap-2"
            >
                <RefreshCw size={20} /> เล่นใหม่อีกครั้ง
            </button>
        </div>
    );
};
