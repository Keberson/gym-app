import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { UseFieldArrayRemove } from "react-hook-form";

import { useAppSelector } from "#core/hooks";
import { selectExerciseById } from "#core/store/knowledges/knowledges.selector";

interface ExerciseProps {
    exerciseId: string;
    sets: string;
    weight?: string;
    remove: UseFieldArrayRemove;
    index: number;
}

const Exercise: React.FC<ExerciseProps> = ({ exerciseId, sets, weight, remove, index }) => {
    const exercise = useAppSelector((state) => selectExerciseById(state, exerciseId));

    const handleDelete = () => {
        remove(index);
    };

    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.exerciseName}>{exercise?.name ?? "-"}</Text>
                <TouchableOpacity onPress={handleDelete}>
                    <AntDesignIcon name="close" size={28} />
                </TouchableOpacity>
            </View>

            <View style={styles.detailsRow}>
                <Text style={styles.detailLabel}>
                    Подходы: <Text style={styles.detailValue}>{sets}</Text>
                </Text>
                <Text style={styles.detailLabel}>
                    Вес:{" "}
                    <Text style={styles.detailValue}>{weight ? `${weight} кг` : "Без веса"}</Text>
                </Text>
            </View>

            <Text style={styles.notes}>📝 {exercise?.description}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
        color: "#333",
    },
    row: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },
    detailsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    detailLabel: {
        color: "#666",
        fontSize: 14,
    },
    detailValue: {
        color: "#222",
        fontWeight: "500",
    },
    notes: {
        fontSize: 12,
    },
});

export default Exercise;
