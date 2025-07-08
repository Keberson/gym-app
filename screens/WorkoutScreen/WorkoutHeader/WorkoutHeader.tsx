import { Text, View, StyleSheet, Button } from "react-native";
import { Control, Controller, UseFieldArrayAppend } from "react-hook-form";
import { useContext } from "react";

import DatePicker from "#common/controls/DatePicker/DatePicker";
import Input from "#common/controls/Input/Input";
import ModalContext from "#core/contexts/ModalContext";
import { useAppSelector } from "#core/hooks";
import { selectExercisesByIds } from "#core/store/knowledges/knowledges.selector";

import Anatomy from "#common/Anatomy/Anatomy";

import { WorkoutFormData } from "#types/workout";
import { IExercise } from "#types/exercise";

import ExerciseAdd from "./ExerciseAdd/ExerciseAdd";

interface WorkoutHeaderProps {
    editMode?: boolean;
    control: Control<WorkoutFormData, any, WorkoutFormData>;
    selected: IExercise[];
    append: UseFieldArrayAppend<WorkoutFormData, "exercises">;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
    editMode = true,
    control,
    selected,
    append,
}) => {
    const { open, close } = useContext(ModalContext);
    const exercises = useAppSelector((state) => selectExercisesByIds(state, selected));

    const onCreateExercise = () => {
        open({
            content: <ExerciseAdd append={append} selected={selected} />,
            props: {
                onRequestClose: close,
            },
            closeable: true,
        });
    };

    return (
        <>
            <View>
                <View style={styles.rowView}>
                    <Text style={styles.rowTitle}>Дата: </Text>
                    <Controller
                        name="workoutDate"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                value={value}
                                onChange={onChange}
                                styles={{
                                    input: styles.rowInput,
                                    text: styles.rowDescription,
                                    icon: { ...styles.rowAfterIcon, ...styles.rowDescription },
                                }}
                                editMode={editMode}
                            />
                        )}
                    />
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.rowTitle}>Описание: </Text>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                editable={editMode}
                                value={value}
                                handleChange={onChange}
                                multiline={true}
                                numberOfLines={3}
                                style={{
                                    ...styles.rowDescription,
                                    ...styles.rowInput,
                                    ...styles.rowTextarea,
                                }}
                            />
                        )}
                    />
                </View>
                <Anatomy
                    data={exercises.flatMap((exercise) => exercise.bodyParts)}
                    colors={["green", "orange", "red"]}
                />
            </View>
            <Text style={styles.exercisesTitle}>Список упражнений</Text>
            {editMode && (
                <View style={styles.execerciseButton}>
                    <Button title="Добавить упражнение" onPress={onCreateExercise} />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 15,
    },
    rowView: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    rowTitle: {
        width: 75,
        fontWeight: "bold",
        color: "#333",
        fontSize: 16,
    },
    rowDescription: {
        color: "#555",
        fontSize: 16,
    },
    rowInput: {
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
        flexDirection: "row",
    },
    rowTextarea: {
        flex: 1,
        height: 24 * 3,
        textAlignVertical: "top",
    },
    rowAfterIcon: {
        marginLeft: 10,
    },
    exercisesTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    execerciseButton: {
        marginBottom: 10,
    },
});

export default WorkoutHeader;
