import { useCallback, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { RouteProp, useNavigation } from "@react-navigation/native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import { useAppDispatch, useAppSelector } from "#core/hooks";
import { addWorkout, editWorkout } from "#core/store/slices/workouts.slice";
import { generateWorkoutId } from "#core/utils";

import { IWorkout, WorkoutFormData } from "#types/workout";
import { RootNavigationType, RootStackParamList } from "#types/rootNavigation";

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
    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<WorkoutFormData>({ defaultValues });

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
                        <AntDesignIcon name="plus" size={32} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={!isValid}>
                        <AntDesignIcon name="edit" size={32} />
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
