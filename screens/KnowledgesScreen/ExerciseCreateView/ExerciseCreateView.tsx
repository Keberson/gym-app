import { View, Text, StyleSheet } from "react-native";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import Anatomy from "#common/Anatomy/Anatomy";
import Input from "#common/controls/Input/Input";

import { IKnowledgeExercise } from "#types/exercise";

interface ExerciseCreateViewProps {
    editMode?: boolean;
}

interface ExerciseForm extends Omit<IKnowledgeExercise, "id"> {}

const ExerciseCreateView: React.FC<ExerciseCreateViewProps> = ({ editMode = true }) => {
    const {
        watch,
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<ExerciseForm>({});
    const { fields, append, remove } = useFieldArray({
        control,
        name: "bodyParts",
        rules: {
            required: true,
            minLength: 1,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Создание упражнения</Text>
            <View style={styles.rowContainer}>
                <Text>Название: </Text>
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: true, minLength: 1, min: 1 }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            style={styles.inputContainer}
                            value={value}
                            handleChange={onChange}
                        />
                    )}
                />
            </View>
            <View style={styles.rowContainer}>
                <Text>Описание: </Text>
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
            <Anatomy />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    inputContainer: {
        borderWidth: 1,
        flex: 1,
        borderColor: "#c5c5c5",
        borderRadius: 5,
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
});

export default ExerciseCreateView;
