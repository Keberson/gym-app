import { CheckBox, ListItem, createTheme, ThemeProvider } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from "react-native";

interface FormData {
    numApproaches: string;
    weight: string;
    exercise: string;
}

const WorkoutCreate = () => {
    const options = [
        { id: "1", title: "Аджуманя" },
        { id: "2", title: "Прэсс" },
        { id: "3", title: "Прэсс" },
        { id: "4", title: "Прэсс" },
        { id: "5", title: "Прэсс" },
        { id: "6", title: "Прэсс" },
        { id: "7", title: "Прэсс" },
        { id: "8", title: "Прэсс" },
        { id: "9", title: "Прэсс" },
        { id: "10", title: "Прэсс" },
        { id: "11", title: "Прэсс" },
        { id: "12", title: "Прэсс" },
        { id: "13", title: "Прэсс" },
        { id: "14", title: "Прэсс" },
        { id: "15", title: "Прэсс15" },
        { id: "16", title: "Прэсс1ааааааааааааааааааааааа5" },
    ];

    const { control, handleSubmit } = useForm<FormData>();

    return (
        <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Добавления упражнения</Text>
                <View style={styles.rowContent}>
                    <Text>Количество подходов:</Text>
                    <Controller
                        control={control}
                        name="numApproaches"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
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
                            <TextInput
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
                    <View style={styles.selectContainer}>
                        <Controller
                            control={control}
                            name="exercise"
                            render={({ field: { onChange, value } }) => (
                                <>
                                    {options.map((item) => (
                                        <ListItem key={item.id}>
                                            <CheckBox
                                                checked={value === item.id}
                                                onPress={() => onChange(item.id)}
                                                iconType="material-community"
                                                checkedIcon="checkbox-marked-circle"
                                                uncheckedIcon="checkbox-blank-circle-outline"
                                                checkedColor="#4CAF50"
                                            />
                                            <ListItem.Content>
                                                <ListItem.Title>{item.title}</ListItem.Title>
                                            </ListItem.Content>
                                        </ListItem>
                                    ))}
                                </>
                            )}
                        />
                    </View>
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
