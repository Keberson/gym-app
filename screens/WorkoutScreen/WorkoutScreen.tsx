import { useCallback, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import { useAppDispatch, useAppSelector } from "#core/hooks";
import { addWorkout } from "#core/store";
import { generateWorkoutId } from "#core/utils";

import { WorkoutFormData } from "#types/workout";
import { RootStackParamList } from "#types/rootNavigation";

import Exercise from "./Exercise/Exercise";
import WorkoutHeader from "./WorkoutHeader/WorkoutHeader";

type WorkoutScreenProps = RootStackParamList["Workout"];

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ id, editMode }) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const workouts = useAppSelector((state) => state.workout.workouts);
    const currentWorkout = id ? workouts.find((workout) => workout.id === id) : undefined;
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
    console.log(id, defaultValues);
    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<WorkoutFormData>({ defaultValues });

    const onSubmit: SubmitHandler<WorkoutFormData> = useCallback(
        (data) => {
            const { workoutDate, ...otherValues } = data;

            dispatch(
                addWorkout({
                    ...otherValues,
                    id: generateWorkoutId(),
                    date: workoutDate.toISOString(),
                })
            );

            navigation.goBack();
        },
        [dispatch, navigation, id]
    );

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={!isValid}>
                    <AntDesignIcon name="plus" size={32} />
                </TouchableOpacity>
            ),
        });
    }, [isValid]);

    return (
        <FlatList
            data={[...Array(1)]}
            renderItem={() => (
                <Exercise exercise={"Аджуманя"} sets={"2-3"} weight={"10"} notes={"ПримечаниеЮл"} />
            )}
            ListHeaderComponent={<WorkoutHeader editMode={editMode} control={control} />}
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
});

export default WorkoutScreen;
