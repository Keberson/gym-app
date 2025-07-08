import { createSelector } from "@reduxjs/toolkit";

import { IExercise } from "#types/exercise";

import { RootState } from "../store";
import { selectWorkoutById } from "../workout/workout.selector";

export const selectAllExercises = (state: RootState) => state.knowledges.exercises;

export const selectExercisesByWorkout = createSelector(
    [selectAllExercises, selectWorkoutById],
    (exercises, workout) => {
        if (!workout) return [];

        const exercisesMap = new Map(exercises.map((ex) => [ex.id, ex]));

        return workout.exercises
            .map((workoutExercise) => {
                const exercise = exercisesMap.get(workoutExercise.exerciseId);
                return exercise ? { ...exercise, ...workoutExercise } : null;
            })
            .filter((item) => item !== null);
    }
);

export const selectExercisesByIds = createSelector(
    [selectAllExercises, (_, selected: IExercise[]) => selected],
    (exercises, selected) => {
        const exercisesMap = new Map(exercises.map((ex) => [ex.id, ex]));

        return selected
            .map((exerciseItem) => {
                const exercise = exercisesMap.get(exerciseItem.exerciseId);
                return exercise ? exercise : null;
            })
            .filter((item) => item !== null);
    }
);

export const selectExercisesWithoutSelected = createSelector(
    [selectAllExercises, (_, selected: IExercise[]) => selected],
    (exercises, selected) => {
        const selectedMap = new Map(selected.map((ex) => [ex.exerciseId, ex]));

        return exercises.filter((exercise) => !selectedMap.get(exercise.id));
    }
);

export const selectExerciseById = createSelector(
    [selectAllExercises, (_, exerciseId: string) => exerciseId],
    (exercises, exerciseId) => exercises.find((exercise) => exercise.id === exerciseId)
);
