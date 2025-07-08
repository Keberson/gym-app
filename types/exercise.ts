import { Slug } from "react-native-body-highlighter";

export interface IExercise {
    id: string;
    numApproaches: string;
    weight: string;
    exerciseId: string;
}

export interface IMuscleLoad {
    slug: Slug;
    load: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export interface IMuscleIntensity {
    slug: Slug;
    intensity: 0 | 1 | 2 | 3;
}

export interface IKnowledgeExercise {
    id: string;
    name: string;
    description: string;
    bodyParts: IMuscleLoad[];
}
