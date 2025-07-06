import {
    Text,
    View,
    StyleSheet,
    TextInput,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Button,
} from "react-native";
import { Control, Controller } from "react-hook-form";

import DatePicker from "#core/controls/DatePicker/DatePicker";
import Anatomy from "#common/Anatomy/Anatomy";

import { WorkoutFormData } from "#types/workout/workout";
import { useContext } from "react";
import ModalContext from "#core/contexts/ModalContext";
import WorkoutCreate from "./WorkoutCreate/WorkoutCreate";

interface WorkoutHeaderProps {
    editMode?: boolean;
    control: Control<WorkoutFormData, any, WorkoutFormData>;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({ editMode = true, control }) => {
    const { open, close } = useContext(ModalContext);

    const onCreateExercise = () => {
        open({
            content: <WorkoutCreate />,
            props: {
                onRequestClose: close,
            },
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
                            <TextInput
                                value={value}
                                onChange={(
                                    value: NativeSyntheticEvent<TextInputChangeEventData>
                                ) => {
                                    onChange(value.nativeEvent.text);
                                }}
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
                    data={[
                        { slug: "chest", intensity: 1 },
                        { slug: "biceps", intensity: 2 },
                    ]}
                    colors={["red", "orange", "yellow"]}
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
