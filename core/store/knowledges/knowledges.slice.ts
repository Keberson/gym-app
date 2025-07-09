import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IKnowledgeExercise } from "#types/exercise";

import { mockedExercises } from "./mockData";

interface KnowledgesState {
    exercises: IKnowledgeExercise[];
}

const initialState: KnowledgesState = {
    exercises: mockedExercises,
};

const knowledgesSlice = createSlice({
    name: "knowledges",
    initialState,
    reducers: {
        addExercise: (state, action: PayloadAction<IKnowledgeExercise>) => {
            state.exercises.push(action.payload);
        },
        setExercises: (state, action: PayloadAction<IKnowledgeExercise[]>) => {
            state.exercises = action.payload;
        },
        deleteExercise: (state, action: PayloadAction<string>) => {
            state.exercises = state.exercises.filter((exercise) => exercise.id !== action.payload);
        },
    },
});

export const { setExercises, addExercise, deleteExercise } = knowledgesSlice.actions;
export default knowledgesSlice.reducer;
