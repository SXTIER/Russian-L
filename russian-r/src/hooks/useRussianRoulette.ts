import { useState, useEffect, useCallback } from 'react';
import type { AppState, Player } from '../types';

export const useRussianRoulette = () => {
    const [appState, setAppState] = useState<AppState>('loading');
    const [playerCount, setPlayerCount] = useState(1);
    const [players, setPlayers] = useState<Player[]>([]);
    const [turnIndex, setTurnIndex] = useState(0);

    const [gunRotation, setGunRotation] = useState(0);
    const [showBlood, setShowBlood] = useState(false);
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    // Helpers
    const shuffleArray = (array: number[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const calculateRotation = (index: number, total: number) => {
        const angleStep = 360 / total;
        return 90 - (index * angleStep);
    };

    const nextTurn = useCallback(() => {
        setTurnIndex((prev) => (prev + 1) % players.length);
        setIsProcessing(false);
        setIsSpinning(false);
    }, [players.length]);

    const triggerDeath = useCallback(() => {
        setShowBlood(true);
        setMessage('เปรี้ยง!!! กระสุนระเบิดหัว!');

        setPlayers(prevPlayers => {
            const updated = [...prevPlayers];
            updated[turnIndex].isDead = true;
            return updated;
        });

        setTimeout(() => {
            setShowBlood(false);
            nextTurn();
        }, 1500);
    }, [turnIndex, nextTurn]);

    const handleFire = useCallback(() => {
        setIsProcessing(true);
        setMessage('ลั่นไก...');

        setTimeout(() => {
            setPlayers(prevPlayers => {
                const currentPlayer = prevPlayers[turnIndex];

                const isBullet = currentPlayer.gun.chamber[currentPlayer.gun.hammerIndex] === 1;

                if (isBullet) {

                    return prevPlayers;

                } else {
                    const updated = [...prevPlayers];
                    const p = updated[turnIndex];
                    p.gun.hammerIndex = (p.gun.hammerIndex + 1) % 6;
                    return updated;
                }
            });

            const currentPlayer = players[turnIndex];
            const isBullet = currentPlayer.gun.chamber[currentPlayer.gun.hammerIndex] === 1;

            if (isBullet) {
                triggerDeath();
            } else {
                setMessage('รอดตาย! เสียงแก๊กเบาๆ...');
                setPlayers(prev => {
                    const updated = [...prev];
                    const p = updated[turnIndex];
                    if (!isBullet) {
                        p.gun.hammerIndex = (p.gun.hammerIndex + 1) % 6;
                    }
                    return updated;
                });

                setTimeout(() => {
                    nextTurn();
                }, 1000);
            }
        }, 500);
    }, [players, turnIndex, nextTurn, triggerDeath]);


    const handleSpin = useCallback((isBot = false) => {
        if (isProcessing && !isBot) return;
        if (!isBot) setIsProcessing(true);

        setIsSpinning(true);
        setMessage(isBot ? 'บอทกำลังหมุนโม่...' : 'คุณกำลังหมุนโม่...');

        setTimeout(() => {
            setPlayers(prevPlayers => {
                const updated = [...prevPlayers];
                const p = updated[turnIndex];
                p.gun.hammerIndex = Math.floor(Math.random() * 6);
                return updated;
            });

            setIsSpinning(false);

            if (isBot) {
                handleFire();
            } else {
                setIsProcessing(false);
                setMessage('หมุนเสร็จแล้ว... กดลั่นไกเพื่อวัดดวง');
            }

        }, 1000);
    }, [isProcessing, turnIndex, handleFire]);


    // Effects
    useEffect(() => {
        if (appState === 'loading') {
            const timer = setTimeout(() => {
                setAppState('menu');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [appState]);

    useEffect(() => {
        if (appState === 'playing' && !isProcessing && players.length > 0) {
            const currentPlayer = players[turnIndex];

            const survivors = players.filter(p => !p.isDead);
            if (survivors.length === 1) {
                setMessage(`ผู้ชนะคือ ${survivors[0].name}!`);
                setAppState('gameover');
                return;
            }

            if (currentPlayer.isDead) {
                nextTurn();
                return;
            }

            const targetRotation = calculateRotation(turnIndex, players.length);
            setGunRotation(targetRotation);

            if (currentPlayer.isBot && !currentPlayer.isDead) {
                setIsProcessing(true);
                setMessage(`${currentPlayer.name} กำลังคิด...`);

                setTimeout(() => {
                    const shouldSpin = Math.random() < 0.25;

                    if (shouldSpin) {
                        setMessage(`${currentPlayer.name} ตัดสินใจหมุนโม่!`);
                        handleSpin(true);
                    } else {
                        setMessage(`${currentPlayer.name} ตัดสินใจยิงวัดดวง!`);
                        setTimeout(() => {
                            handleFire();
                        }, 1000);
                    }
                }, 1500);
            } else {
                setMessage(`ตาของ ${currentPlayer.name} (ปืนของคุณ)`);
            }
        }
    }, [turnIndex, appState, isProcessing, players, nextTurn, handleFire, handleSpin]);

    const initGame = () => {
        const newPlayers: Player[] = [];

        const createPlayer = (id: number, name: string, isBot: boolean): Player => ({
            id,
            name,
            isBot,
            isDead: false,
            gun: {
                chamber: shuffleArray([0, 0, 0, 0, 0, 1]),
                hammerIndex: 0
            }
        });

        newPlayers.push(createPlayer(0, 'คุณ', false));

        if (playerCount === 1) {
            newPlayers.push(createPlayer(1, 'Bot A', true));
            newPlayers.push(createPlayer(2, 'Bot B', true));
        } else {
            for (let i = 1; i < playerCount; i++) {
                newPlayers.push(createPlayer(i, `ผู้เล่น ${i + 1}`, false));
            }
        }

        setPlayers(newPlayers);
        setAppState('playing');
        setTurnIndex(0);
        setMessage('เริ่มเกม! ทุกคนมีปืนคนละกระบอก...');
        setIsProcessing(false);
    };

    return {
        appState, setAppState,
        playerCount, setPlayerCount,
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
    };
};
