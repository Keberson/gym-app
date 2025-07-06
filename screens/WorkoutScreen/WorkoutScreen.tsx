import { StyleSheet, View, FlatList } from "react-native";
import { useForm } from "react-hook-form";

import { WorkoutFormData } from "#types/workout/workout";

import Exercise from "./Exercise/Exercise";
import WorkoutHeader from "./WorkoutHeader/WorkoutHeader";

interface WorkoutScreenProps {
    editMode?: boolean;
}

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ editMode }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkoutFormData>({
        defaultValues: {
            workoutDate: new Date(),
            description: "",
            exercises: [],
        },
    });

    return (
        <FlatList
            data={[...Array(15)]}
            renderItem={() => (
                <Exercise exercise={"Аджуманя"} sets={"2-3"} weight={"10"} notes={"ПримечаниеЮл"} />
            )}
            ListHeaderComponent={<WorkoutHeader control={control} />}
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
