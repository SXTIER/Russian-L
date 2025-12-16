
import { useRussianRoulette } from './hooks/useRussianRoulette';
import { GameMenu } from './components/GameMenu';
import { PlayerAvatar } from './components/PlayerAvatar';
import { GunVisual } from './components/GunVisual';
import { GameControls } from './components/GameControls';
import { GameOver } from './components/GameOver';
import type { GamePosition } from './types';

const RussianRoulette = () => {
  const {
    appState,
    setAppState,
    playerCount,
    setPlayerCount,
    players,
    turnIndex,
    gunRotation,
    showBlood,
    message,
    isProcessing,
    isSpinning,
    initGame,
    handleSpin,
    handleFire
  } = useRussianRoulette();

  const getPlayerPosition = (index: number, total: number): GamePosition => {
    const radius = 35;
    const angleStep = 360 / total;
    const angleDeg = 90 - (index * angleStep);
    const angleRad = (angleDeg * Math.PI) / 180;
    const top = 50 + radius * Math.sin(angleRad);
    const left = 50 + radius * Math.cos(angleRad);
    return { top: `${top}%`, left: `${left}%` };
  };

  if (appState === 'loading') {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black">
        <div className="relative w-24 h-24 animate-spin">
          <div className="absolute inset-0 border-8 border-neutral-800 rounded-full"></div>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div key={i}
              className="absolute w-4 h-4 bg-neutral-600 rounded-full top-1/2 left-1/2"
              style={{ transform: `rotate(${deg}deg) translate(28px) translate(-50%, -50%)` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="kanit-medium relative w-full h-screen overflow-hidden bg-neutral-950 text-neutral-200 select-none">

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, #3f2e22 0%, #1a1008 100%)`,
          backgroundSize: 'cover'
        }}>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 150px black' }}></div>

      {/* Screen Effects */}
      {showBlood && (
        <div className="absolute inset-0 z-50 pointer-events-none animate-pulse bg-red-900/40 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-transparent to-transparent opacity-80 mix-blend-multiply"></div>
          <div className="w-full h-full bg-[radial-gradient(circle,transparent_20%,#880000_100%)]"></div>
        </div>
      )}

      {/* Game Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

        <div className="absolute top-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-red-900 drop-shadow-lg opacity-80 uppercase">Russian Roulette</h1>
          <p className="text-xs text-neutral-500 mt-2">*Simulation Only - Not Real Violence*</p>
        </div>

        {appState === 'menu' && (
          <GameMenu
            playerCount={playerCount}
            setPlayerCount={setPlayerCount}
            onStart={initGame}
          />
        )}

        {(appState === 'playing' || appState === 'gameover') && (
          <>
            <div className="absolute top-24 z-20 px-6 py-2 bg-black/60 rounded-full border border-red-900/30 backdrop-blur text-lg text-red-100 min-w-[300px] text-center">
              {message}
            </div>

            {/* Table / Board */}
            <div className="relative w-[90vmin] h-[90vmin] md:w-[600px] md:h-[600px] rounded-full border-[12px] border-[#2a1d15] shadow-[0_0_50px_black] flex items-center justify-center overflow-visible">

              <div className="absolute inset-0 rounded-full bg-[#3e2b22] opacity-100"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #3e2b22 0px, #35231a 20px, #2a1b14 21px)`,
                  boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8)'
                }}>
              </div>

              <GunVisual rotation={gunRotation} isSpinning={isSpinning} />

              {/* Players */}
              {players.map((player, index) => (
                <PlayerAvatar
                  key={player.id}
                  player={player}
                  position={getPlayerPosition(index, players.length)}
                  isActive={index === turnIndex}
                />
              ))}

            </div>

            {/* Controls */}
            {appState === 'playing' && players[turnIndex] && !players[turnIndex].isBot && !players[turnIndex].isDead && (
              <GameControls
                onSpin={() => handleSpin(false)}
                onFire={handleFire}
                isProcessing={isProcessing}
              />
            )}

            {appState === 'gameover' && (
              <GameOver onRestart={() => setAppState('menu')} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RussianRoulette;