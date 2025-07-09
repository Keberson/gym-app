import { useCallback, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { RouteProp, useNavigation } from "@react-navigation/native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import { useAppDispatch, useAppSelector } from "#core/hooks";
import { addWorkout, editWorkout } from "#core/store/workout/workouts.slice";
import { selectWorkoutById } from "#core/store/workout/workout.selector";
import { generateWorkoutId } from "#core/utils";

import { WorkoutFormData } from "#types/workout";
import { RootStackParamList } from "#types/navigation";

import Exercise from "./Exercise/Exercise";
import WorkoutHeader from "./WorkoutHeader/WorkoutHeader";

interface WorkoutScreenProps {
    route: RouteProp<RootStackParamList, "Workout">;
}

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({
    route: {
        params: { id, editMode },
    },
}) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const currentWorkout = id ? useAppSelector((state) => selectWorkoutById(state, id)) : undefined;
    const defaultValues = currentWorkout
        ? {
              workoutDate: new Date(currentWorkout.date),
              description: currentWorkout.description,
              exercises: currentWorkout.exercises,
          }
        : {
              workoutDate: new Date(),
              description: "",
              exercises: [],
          };
    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<WorkoutFormData>({ defaultValues });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "exercises",
        rules: {
            required: true,
            minLength: 1,
        },
    });

    const onSubmit: SubmitHandler<WorkoutFormData> = useCallback(
        (data) => {
            const { workoutDate, ...otherValues } = data;
            const body = {
                ...otherValues,
                date: workoutDate.toISOString(),
            };

            if (currentWorkout) {
                dispatch(editWorkout({ ...body, id: currentWorkout.id }));
            } else {
                dispatch(
                    addWorkout({
                        ...body,
                        id: generateWorkoutId(),
                    })
                );
            }

            navigation.goBack();
        },
        [dispatch, navigation, id]
    );

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                !currentWorkout ? (
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={!isValid}>
                        <AntDesignIcon name="plus" size={32} color={isValid ? "#000" : "#CCC"} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={!isValid}>
                        <AntDesignIcon name="edit" size={32} color={isValid ? "#000" : "#CCC"} />
                    </TouchableOpacity>
                ),
        });
    }, [isValid]);

    return (
        <FlatList
            data={fields}
            renderItem={({ item, index }) => (
                <Exercise
                    exerciseId={item.exerciseId}
                    sets={item.numApproaches}
                    weight={item.weight}
                    remove={remove}
                    index={index}
                />
            )}
            ListHeaderComponent={
                <WorkoutHeader
                    editMode={editMode}
                    control={control}
                    selected={fields}
                    append={append}
                />
            }
            contentContainerStyle={styles.container}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingBottom: 20,
        marginBottom: 15,
    },
    disabledButton: {
        opacity: 0.5,
    },
});

export default WorkoutScreen;
