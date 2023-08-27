import { GameState } from "./GameState";


enum Difficulty {
    Easy,
    Medium,
    Hard,
    Evil
};

// annoyingly hand copied from https://sudokutodo.com/generator

const gameData4x4 = [
[ // Easy
    [0,1,2,4,0,0,0,0,0,2,0,3,4,3,0,0],
    [0,0,1,0,0,2,0,3,3,0,0,0,0,4,3,0]
],
[ // Medium
    [2,0,3,0,0,0,2,0,0,0,0,2,1,2,0,3],
    [0,2,1,4,4,0,0,0,0,3,0,0,0,0,3,0]
],
[ // Hard
    [0,0,0,0,0,0,0,1,3,0,4,2,0,0,0,3],
    [2,1,0,0,0,4,1,2,0,0,0,0,0,0,2,0]
],
[ // Evil
    [0,0,0,0,4,0,2,0,0,0,0,4,0,4,0,2],
    [0,0,2,0,0,0,0,0,1,0,4,3,0,0,0,0]
]
];

export function templatesForDifficulty(level: Difficulty, degree: number): Array<GameState> | undefined {
    if (degree === 2) {
        if (level >= 0 && level < gameData4x4.length) {
            return gameData4x4[level];
        }
    }
    return undefined;
}
