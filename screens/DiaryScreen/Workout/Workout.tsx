import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { RootNavigationType } from "#types/rootNavigation";
import { IWorkout } from "#types/workout";

interface WorkoutProps {
    workout: IWorkout;
}

const Workout: React.FC<WorkoutProps> = ({ workout }) => {
    const navigation = useNavigation<RootNavigationType>();

    const handlePress = () => {
        navigation.navigate("Workout", { id: workout.id, editMode: true });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.subcontainer}>
                    <Text style={styles.title}>
                        Тренировка от {new Date(workout.date).toLocaleDateString()}
                    </Text>
                    <Text>{workout.description}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: "#E1E1E1",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
    },
    subcontainer: {
        gap: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Workout;
