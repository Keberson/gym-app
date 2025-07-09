import { Slug } from "react-native-body-highlighter";
import { IMuscleIntensity, IMuscleLoad } from "#types/exercise";

const MUSCLE_BASE_THRESHOLDS: Record<Slug, number> = {
    quadriceps: 24,
    hamstring: 20,
    gluteal: 24,
    chest: 20,
    "upper-back": 20,
    "lower-back": 16,
    deltoids: 16,
    trapezius: 14,
    triceps: 14,
    biceps: 12,
    abs: 14,
    obliques: 12,
    forearm: 9,
    calves: 14,
    adductors: 12,
    tibialis: 8,
    neck: 6,
    ankles: 5,
    feet: 4,
    hands: 4,
    hair: 0,
    head: 0,
    knees: 0,
};

export const calculateIntensity = (exercises: IMuscleLoad[]): IMuscleIntensity[] => {
    const totalLoad = exercises.reduce((sum, { load }) => sum + load, 0);
    const avgLoadPerMuscle = totalLoad / Object.keys(MUSCLE_BASE_THRESHOLDS).length;

    const loadMap = exercises.reduce((acc, { slug, load }) => {
        acc.set(slug, (acc.get(slug) || 0) + load);
        return acc;
    }, new Map<Slug, number>());

    return Array.from(loadMap.entries()).map(([slug, load]) => {
        const baseMaxLoad = MUSCLE_BASE_THRESHOLDS[slug] || 1;
        const dynamicMaxLoad = Math.max(baseMaxLoad, avgLoadPerMuscle * 1.5);
        const normalizedLoad = load / dynamicMaxLoad;
        const loadRatio = load / (avgLoadPerMuscle || 1);
        const combinedScore = normalizedLoad * 0.7 + loadRatio * 0.3;
        let intensity: 0 | 1 | 2 | 3;

        if (combinedScore >= 0.8) intensity = 3;
        else if (combinedScore >= 0.5) intensity = 2;
        else if (combinedScore >= 0.3) intensity = 1;
        else intensity = 0;

        return { slug, intensity };
    });
};
