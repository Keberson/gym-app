import { Slug } from "react-native-body-highlighter";

import { IMuscleIntensity, IMuscleLoad } from "#types/exercise";

export const calculateIntesity = (exercises: IMuscleLoad[]): IMuscleIntensity[] => {
    const loadMap = exercises.reduce((acc, { slug, load }) => {
        acc.set(slug, (acc.get(slug) || 0) + load);
        return acc;
    }, new Map<Slug, number>());

    const dominantLoads = Array.from(loadMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    if (dominantLoads.length === 0) return [];

    const maxLoad = dominantLoads[0][1];
    const minDominantLoad = dominantLoads[dominantLoads.length - 1][1];

    return Array.from(loadMap.entries()).map(([slug, load]) => {
        if (load < minDominantLoad) {
            return { slug, intensity: load >= maxLoad * 0.3 ? 1 : 0 };
        }

        const ratio = load / maxLoad;
        return {
            slug,
            intensity: ratio > 0.7 ? 3 : ratio > 0.4 ? 2 : 1,
        };
    });
};
