import { Slug } from "react-native-body-highlighter";

export type Muscles =
    | "Пресс"
    | "Приводящие мышцы"
    | "Лодыжки"
    | "Бицепсы"
    | "Икры"
    | "Грудь"
    | "Дельтовидные мышцы"
    | "Стопы"
    | "Предплечья"
    | "Ягодицы"
    | "Бицепс бедра"
    | "Кисти"
    | "Волосы"
    | "Голова"
    | "Колени"
    | "Поясница"
    | "Шея"
    | "Косые мышцы живота"
    | "Квадрицепсы"
    | "Передняя большеберцовая мышца"
    | "Трапеции"
    | "Трицепсы"
    | "Верх спины";

export const muscules: Slug[] = [
    "abs",
    "adductors",
    "ankles",
    "biceps",
    "calves",
    "chest",
    "deltoids",
    "deltoids",
    "feet",
    "forearm",
    "gluteal",
    "hamstring",
    "hands",
    "hair",
    "head",
    "knees",
    "lower-back",
    "neck",
    "obliques",
    "quadriceps",
    "tibialis",
    "trapezius",
    "triceps",
    "upper-back",
];

export const musculesTranslated: Muscles[] = [
    "Пресс",
    "Приводящие мышцы",
    "Лодыжки",
    "Бицепсы",
    "Икры",
    "Грудь",
    "Дельтовидные мышцы",
    "Стопы",
    "Предплечья",
    "Ягодицы",
    "Бицепс бедра",
    "Кисти",
    "Волосы",
    "Голова",
    "Колени",
    "Поясница",
    "Шея",
    "Косые мышцы живота",
    "Квадрицепсы",
    "Передняя большеберцовая мышца",
    "Трапеции",
    "Трицепсы",
    "Верх спины",
];

export const slugsToMuscles: Record<Slug, Muscles> = {
    abs: "Пресс",
    adductors: "Приводящие мышцы",
    ankles: "Лодыжки",
    biceps: "Бицепсы",
    calves: "Икры",
    chest: "Грудь",
    deltoids: "Дельтовидные мышцы",
    feet: "Стопы",
    forearm: "Предплечья",
    gluteal: "Ягодицы",
    hamstring: "Бицепс бедра",
    hands: "Кисти",
    hair: "Волосы",
    head: "Голова",
    knees: "Колени",
    "lower-back": "Поясница",
    neck: "Шея",
    obliques: "Косые мышцы живота",
    quadriceps: "Квадрицепсы",
    tibialis: "Передняя большеберцовая мышца",
    trapezius: "Трапеции",
    triceps: "Трицепсы",
    "upper-back": "Верх спины",
};

export const musculseToSlugs: Record<Muscles, Slug> = Object.fromEntries(
    new Map(Object.entries(slugsToMuscles).map((value) => [value[1], value[0]]))
) as Record<Muscles, Slug>;
