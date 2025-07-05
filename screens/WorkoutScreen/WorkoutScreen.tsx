import { Text, StyleSheet, ScrollView, TextInput, View } from "react-native";
import Body from "react-native-body-highlighter";
import Exercise from "./Exercise/Exercise";

const WorkoutScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text>Дата: {new Date().toLocaleDateString()}</Text>
            <Text>Описание: </Text>
            <View style={styles.bodyContainer}>
                <Body
                    data={[
                        { slug: "chest", intensity: 1 },
                        { slug: "biceps", intensity: 2 },
                    ]}
                    gender="male"
                    side="front"
                    scale={0.75}
                    border="#dfdfdf"
                    colors={["red", "orange", "yellow"]}
                />
                <Body
                    data={[
                        { slug: "chest", intensity: 1 },
                        { slug: "biceps", intensity: 2 },
                    ]}
                    gender="male"
                    side="back"
                    scale={0.75}
                    border="#dfdfdf"
                    colors={["red", "orange", "yellow"]}
                />
            </View>
            <View style={styles.exercisesContainer}>
                <Exercise exercise={"Аджуманя"} sets={"2-3"} weight={"10"} notes={"ПримечаниеЮл"} />
                <Exercise exercise={"Прэс"} sets={"2-3"} notes={"ПримечаниеЮл"} />
                <Exercise exercise={"Прэс"} sets={"2-3"} notes={"ПримечаниеЮл"} />
                <Exercise exercise={"Прэс"} sets={"2-3"} notes={"ПримечаниеЮл"} />
                <Exercise exercise={"Прэс"} sets={"2-3"} notes={"ПримечаниеЮл"} />
                <Exercise exercise={"Прэс"} sets={"2-3"} notes={"ПримечаниеЮл"} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 15, paddingBottom: 20, marginBottom: 15 },
    bodyContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    exercisesContainer: {
        marginBottom: 10,
    },
});

export default WorkoutScreen;
