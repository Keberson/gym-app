import { useContext, useEffect } from "react";
import { Controller, UseFieldArrayAppend, useForm } from "react-hook-form";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { createTheme, ThemeProvider } from "@rneui/themed";

import ModalContext from "#core/contexts/ModalContext";
import { useAppSelector } from "#core/hooks";
import { selectExercisesWithoutSelected } from "#core/store/knowledges/knowledges.selector";
import generateExercisetId from "#core/utils/generateExerciseId/generateExercisetId";

import Input from "#common/controls/Input/Input";

import { WorkoutFormData } from "#types/workout";
import { IExercise } from "#types/exercise";
import Checkbox from "#common/controls/Checkbox/Checkbox";

interface FormData {
    numApproaches: string;
    weight: string;
    exerciseId: string;
}

interface ExerciseAddProps {
    append: UseFieldArrayAppend<WorkoutFormData, "exercises">;
    selected: IExercise[];
}

const ExerciseAdd: React.FC<ExerciseAddProps> = ({ append, selected }) => {
    const exercises = useAppSelector((state) => selectExercisesWithoutSelected(state, selected));
    const { setDisableAdd, setHandleAdd } = useContext(ModalContext);
    const {
        watch,
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<FormData>();
    const { close } = useContext(ModalContext);

    const value = watch();

    useEffect(() => {
        setHandleAdd(
            handleSubmit((formData) => {
                append({ ...formData, id: generateExercisetId() });
                close();
            })
        );
    }, []);

    useEffect(() => {
        setDisableAdd(!isValid);
    }, [value]);

    return (
        <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Добавления упражнения</Text>
                <View style={styles.rowContent}>
                    <Text>Количество подходов:</Text>
                    <Controller
                        control={control}
                        name="numApproaches"
                        rules={{ required: true, minLength: 1, min: 1 }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                inputMode="numeric"
                                style={styles.inputContainer}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                </View>
                <View style={styles.rowContent}>
                    <Text>Рабочий вес:</Text>
                    <Controller
                        control={control}
                        name="weight"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                inputMode="numeric"
                                style={styles.inputContainer}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                    <Text>кг</Text>
                </View>
                <View>
                    <Text style={styles.secondTitle}>Выбор упражнения</Text>
                    <Controller
                        control={control}
                        name="exerciseId"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.selectContainer}>
                                {exercises.map((item) => (
                                    <Checkbox
                                        key={item.id}
                                        title={item.name}
                                        id={item.id}
                                        value={value === item.id}
                                        onChange={onChange}
                                    />
                                ))}
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </ThemeProvider>
    );
};

const theme = createTheme({
    components: {
        ListItem: {
            containerStyle: {
                padding: 0,
                margin: 0,
            },
        },
        CheckBox: {
            containerStyle: {
                paddingVertical: 8,
                padding: 0,
                margin: 0,
            },
        },
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 28,
        marginBottom: 20,
    },
    secondTitle: {
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 20,
    },
    rowContent: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
    },
    inputContainer: {
        borderWidth: 1,
        width: 50,
        borderColor: "#c5c5c5",
        borderRadius: 5,
    },
    selectContainer: {
        marginTop: 5,
    },
});

export default ExerciseAdd;
