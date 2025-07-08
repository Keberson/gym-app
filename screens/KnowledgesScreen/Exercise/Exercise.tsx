import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import { IKnowledgeExercise } from "#types/exercise";

interface ExerciseProps {
    exercise: IKnowledgeExercise;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
    const handleOpen = () => {};

    return (
        <TouchableOpacity onPress={handleOpen}>
            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <Text style={styles.title}>{exercise.name}</Text>
                    {/* <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                        <MaterialIcon name="delete-outline" size={28} />
                    </TouchableOpacity> */}
                </View>
                <Text>{exercise.description}</Text>
            </View>
        </TouchableOpacity>
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
        gap: 5,
        justifyContent: "center",
    },
    subcontainer: {
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Exercise;
