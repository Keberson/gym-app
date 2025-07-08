import { IExercise } from "#types/exercise";
import { IWorkout } from "#types/workout";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkoutState {
    workouts: IWorkout[];
    exercises: IExercise[];
}

const initialState: WorkoutState = {
    workouts: [],
    exercises: [],
};

const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {
        addWorkout: (state, action: PayloadAction<IWorkout>) => {
            state.workouts.push(action.payload);
        },
        editWorkout: (state, action: PayloadAction<IWorkout>) => {
            const index = state.workouts.findIndex((item) => item.id === action.payload.id);

            if (index !== -1) {
                state.workouts[index] = { ...state.workouts[index], ...action.payload };
            }
        },
        deleteWorkout: (state, action: PayloadAction<string>) => {
            state.workouts = state.workouts.filter((workout) => workout.id !== action.payload);
        },
        addExercise: (state, action: PayloadAction<IExercise>) => {
            state.exercises.push(action.payload);
        },
        setExercises: (state, action: PayloadAction<IExercise[]>) => {
            state.exercises = action.payload;
        },
    },
});

export const { addWorkout, editWorkout, addExercise, setExercises, deleteWorkout } =
    workoutSlice.actions;
export default workoutSlice.reducer;
