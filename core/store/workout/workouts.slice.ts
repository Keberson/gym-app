import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IWorkout } from "#types/workout";

import { deleteExercise } from "../knowledges/knowledges.slice";

interface WorkoutState {
    workouts: IWorkout[];
}

const initialState: WorkoutState = {
    workouts: [],
};

const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {
        addWorkout: (state, action: PayloadAction<IWorkout>) => {
            state.workouts.push(action.payload);
        },
        editWorkout: (state, action: PayloadAction<Partial<IWorkout> & Pick<IWorkout, "id">>) => {
            const index = state.workouts.findIndex((item) => item.id === action.payload.id);

            if (index !== -1) {
                state.workouts[index] = { ...state.workouts[index], ...action.payload };
            }
        },
        deleteWorkout: (state, action: PayloadAction<string>) => {
            state.workouts = state.workouts.filter((workout) => workout.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteExercise, (state, action: PayloadAction<string>) => {
            state.workouts = state.workouts
                .map((workout) => ({
                    ...workout,
                    exercises: workout.exercises.filter((ex) => ex.exerciseId !== action.payload),
                }))
                .filter((workout) => workout.exercises.length > 0);
        });
    },
});

export const { addWorkout, editWorkout, deleteWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;
