import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { useAppDispatch } from "#core/hooks";
import { deleteWorkout } from "#core/store/slices/workouts.slice";

import { RootNavigationType } from "#types/rootNavigation";
import { IWorkout } from "#types/workout";

interface WorkoutProps {
    workout: IWorkout;
}

const Workout: React.FC<WorkoutProps> = ({ workout }) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<RootNavigationType>();

    const handleOpen = () => {
        navigation.navigate("Workout", { id: workout.id, editMode: true });
    };

    const handleDelete = () => {
        dispatch(deleteWorkout(workout.id));
    };

    return (
        <TouchableOpacity onPress={handleOpen}>
            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Тренировка от {new Date(workout.date).toLocaleDateString()}
                        </Text>
                    </View>
                    <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
                        {workout.description}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={handleDelete}
                    style={styles.deleteButton}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                    <MaterialIcon name="delete-outline" size={28} />
                </TouchableOpacity>
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
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },
    subcontainer: {
        flex: 1,
        gap: 10,
    },
    titleContainer: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        flexShrink: 1,
    },
    deleteButton: {
        padding: 8,
    },
});

export default Workout;
