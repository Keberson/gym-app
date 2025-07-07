import { IExercise } from "./exercise";

export type WorkoutFormData = {
    workoutDate: Date;
    description: string;
    exercises: IExercise[];
};

export interface IWorkout {
    id: string;
    date: string;
    description: string;
    exercises: IExercise[];
}
