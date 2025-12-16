export type AppState = 'loading' | 'menu' | 'playing' | 'gameover';

export interface Gun {
    chamber: number[]; // 1 = bullet, 0 = empty
    hammerIndex: number;
}

export interface Player {
    id: number;
    name: string;
    isBot: boolean;
    isDead: boolean;
    gun: Gun;
}

export interface GamePosition {
    top: string;
    left: string;
}
