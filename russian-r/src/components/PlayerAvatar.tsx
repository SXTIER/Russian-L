import React from 'react';
import { Skull, User, Bot } from 'lucide-react';
import type { Player, GamePosition } from '../types';

interface PlayerAvatarProps {
    player: Player;
    position: GamePosition;
    isActive: boolean;
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ player, position, isActive }) => {
    return (
        <div
            className={`kanit-medium absolute w-24 h-24 flex flex-col items-center justify-center transition-all duration-500 z-30
        ${player.isDead ? 'opacity-50 grayscale scale-90' : 'opacity-100'}
        ${isActive ? 'scale-110' : ''}
      `}
            style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
        >
            {/* Avatar Circle */}
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center bg-stone-900 shadow-lg relative overflow-hidden transition-colors duration-300
          ${player.isDead ? 'border-neutral-700' : isActive ? 'border-red-600 shadow-[0_0_20px_rgba(200,0,0,0.6)]' : 'border-stone-600'}`}>

                {player.isDead && (
                    <div className="absolute inset-0 bg-red-900/60 z-10 flex items-center justify-center">
                        <Skull size={24} className="text-white opacity-80" />
                    </div>
                )}

                {player.isBot ? (
                    <Bot size={28} className={player.isDead ? 'text-neutral-500' : 'text-stone-400'} />
                ) : (
                    <User size={28} className={player.isDead ? 'text-neutral-500' : 'text-stone-400'} />
                )}
            </div>

            {/* Name Tag */}
            <div className={`mt-2 px-2 py-0.5 rounded text-xs font-bold shadow whitespace-nowrap
          ${isActive ? 'bg-red-900 text-white' : 'bg-black/70 text-neutral-400'}`}>
                {player.name}
            </div>

            {/* Personal Gun Icon Indicator */}
            <div className="absolute -top-2 -right-2 bg-stone-800 rounded-full p-1 border border-stone-600" title="ปืนส่วนตัว">
                <div className="w-2 h-2 rounded-full bg-stone-400"></div>
            </div>
        </div>
    );
};
