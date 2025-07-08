import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

export const selectAllWorkouts = (state: RootState) => state.workout.workouts;

export const selectWorkoutById = createSelector(
    [selectAllWorkouts, (state: RootState, workoutId: string) => workoutId],
    (workouts, workoutId) => workouts.find((workout) => workout.id === workoutId)
);
