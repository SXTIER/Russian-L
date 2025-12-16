import React from 'react';

interface GameMenuProps {
    playerCount: number;
    setPlayerCount: (count: number) => void;
    onStart: () => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({ playerCount, setPlayerCount, onStart }) => {
    return (
        <div className="bg-neutral-900/90 border border-neutral-800 p-8 rounded-lg shadow-2xl backdrop-blur-sm max-w-md w-full text-center">
            <h2 className="text-xl mb-6 text-neutral-300">เลือกจำนวนผู้เล่น</h2>

            <div className="flex justify-center gap-4 mb-8">
                {[1, 2, 3, 4].map((num) => (
                    <button
                        key={num}
                        onClick={() => setPlayerCount(num)}
                        className={`w-12 h-12 rounded flex items-center justify-center text-lg font-bold transition-all
              ${playerCount === num
                                ? 'bg-red-900 text-white border-2 border-red-700 shadow-[0_0_15px_rgba(153,27,27,0.5)]'
                                : 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700'}`}
                    >
                        {num}
                    </button>
                ))}
            </div>

            {playerCount === 1 && (
                <p className="text-sm text-yellow-700 mb-6 italic">
                    (โหมดเล่นคนเดียว: เพิ่ม Bot 2 ตัว)
                </p>
            )}

            <button
                onClick={onStart}
                className="w-full py-4 bg-gradient-to-r from-stone-800 to-stone-700 hover:from-red-900 hover:to-red-800 
                   text-white font-bold tracking-wider rounded border border-stone-600 transition-all duration-300 shadow-lg"
            >
                เริ่มเกม
            </button>
        </div>
    );
};
