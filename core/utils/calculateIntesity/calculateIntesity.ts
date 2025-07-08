import { Slug } from "react-native-body-highlighter";

import { IMuscleIntensity, IMuscleLoad } from "#types/exercise";

const MUSCLE_THRESHOLDS: Record<Slug, [number, number, number]> = {
    quadriceps: [12, 18, 24],
    hamstring: [10, 15, 20],
    gluteal: [12, 18, 24],
    chest: [10, 15, 20],
    "upper-back": [10, 15, 20],
    "lower-back": [8, 12, 16],
    deltoids: [8, 12, 16],
    trapezius: [6, 10, 14],
    triceps: [6, 10, 14],
    biceps: [5, 8, 12],
    abs: [6, 10, 14],
    obliques: [5, 8, 12],
    forearm: [4, 6, 9],
    calves: [6, 10, 14],
    adductors: [5, 8, 12],
    tibialis: [3, 5, 8],
    neck: [2, 4, 6],
    ankles: [1, 3, 5],
    feet: [1, 2, 4],
    hands: [1, 2, 4],
    hair: [0, 0, 0],
    head: [0, 0, 0],
    knees: [0, 0, 0],
};

export const calculateIntesity = (exercises: IMuscleLoad[]): IMuscleIntensity[] => {
    const loadMap = exercises.reduce((acc, { slug, load }) => {
        acc.set(slug, (acc.get(slug) || 0) + load);
        return acc;
    }, new Map<Slug, number>());

    return Array.from(loadMap.entries()).map(([slug, load]) => {
        const thresholds = MUSCLE_THRESHOLDS[slug];
        const [min1, min2, min3] = thresholds;

        let intensity: 0 | 1 | 2 | 3;
        if (load >= min3) intensity = 3;
        else if (load >= min2) intensity = 2;
        else if (load >= min1) intensity = 1;
        else intensity = 0;

        return { slug, intensity };
    });
};
