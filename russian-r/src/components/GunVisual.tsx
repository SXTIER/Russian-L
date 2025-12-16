import React from 'react';

interface GunVisualProps {
    rotation: number;
    isSpinning: boolean;
}

export const GunVisual: React.FC<GunVisualProps> = ({ rotation, isSpinning }) => {
    return (
        <div
            className="absolute w-64 h-64 flex items-center justify-center transition-transform duration-700 ease-in-out z-20"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <div className="absolute left-10 w-20 h-8 bg-neutral-800 rounded shadow-lg transform rotate-0" />
            <div className="absolute left-24 w-16 h-16 bg-stone-700 rounded-full border-4 border-stone-600 shadow-inner flex items-center justify-center">
                {/* Spin Animation */}
                <div className={`w-12 h-12 border-4 border-dashed border-stone-900 rounded-full opacity-50 ${isSpinning ? 'animate-spin' : ''}`}></div>
            </div>
            <div className="absolute left-32 w-32 h-6 bg-neutral-700 rounded-r shadow-lg flex items-center justify-end pr-2">
                <div className="w-2 h-4 bg-black rounded-full opacity-80"></div>
            </div>
        </div>
    );
};
