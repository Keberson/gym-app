import ModalContext from "#core/contexts/ModalContext";
import Input from "#core/controls/Input/Input";
import { CheckBox, createTheme, ThemeProvider } from "@rneui/themed";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";

interface FormData {
    numApproaches: string;
    weight: string;
    exercise: string;
}

const WorkoutCreate = () => {
    const options = [
        { id: "1", title: "Аджуманя" },
        { id: "2", title: "Прэс" },
        { id: "3", title: "Бегит" },
    ];

    const { setDisableAdd, setHandleAdd } = useContext(ModalContext);
    const {
        watch,
        control,
        formState: { isValid },
    } = useForm<FormData>();

    const value = watch();

    useEffect(() => {
        setHandleAdd(() => console.log("hello"));
    }, []);

    useEffect(() => {
        console.log(isValid, value);
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
                                handleChange={onChange}
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
                                handleChange={onChange}
                            />
                        )}
                    />
                    <Text>кг</Text>
                </View>
                <View>
                    <Text style={styles.secondTitle}>Выбор упражнения</Text>
                    <Controller
                        control={control}
                        name="exercise"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.selectContainer}>
                                {options.map((item) => (
                                    <TouchableWithoutFeedback
                                        key={item.id}
                                        onPress={() => onChange(item.id)}
                                    >
                                        <View key={item.id} style={styles.rowContent}>
                                            <CheckBox
                                                checked={value === item.id}
                                                onPress={() => onChange(item.id)}
                                                iconType="material-community"
                                                checkedIcon="checkbox-marked-circle"
                                                uncheckedIcon="checkbox-blank-circle-outline"
                                                checkedColor="#4CAF50"
                                            />
                                            <Text>{item.title}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
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

export default WorkoutCreate;
