import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

import { IKnowledgeExercise } from "#types/exercise";
import { RootNavigationType } from "#types/navigation";

import { useAppDispatch } from "#core/hooks";
import { deleteExercise } from "#core/store/knowledges/knowledges.slice";

interface ExerciseProps {
    exercise: IKnowledgeExercise;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
    const disptach = useAppDispatch();
    const navigation = useNavigation<RootNavigationType>();

    const handleOpen = () => {
        navigation.navigate("Exercise", { id: exercise.id });
    };

    const handleDelete = () => {
        disptach(deleteExercise(exercise.id));
    };

    return (
        <TouchableOpacity onPress={handleOpen}>
            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <Text style={styles.title}>{exercise.name}</Text>
                    <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                        <MaterialIcon name="delete-outline" size={24} />
                    </TouchableOpacity>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    deleteButton: {
        padding: 8,
    },
});

export default Exercise;
