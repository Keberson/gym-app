import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ExerciseProps {
    exercise: string;
    sets: string;
    weight?: string;
    notes: string;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise, sets, weight, notes }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.exerciseName}>{exercise}</Text>

            <View style={styles.detailsRow}>
                <Text style={styles.detailLabel}>
                    Подходы: <Text style={styles.detailValue}>{sets}</Text>
                </Text>
                <Text style={styles.detailLabel}>
                    Вес:{" "}
                    <Text style={styles.detailValue}>{weight ? `${weight} кг` : "Без веса"}</Text>
                </Text>
            </View>

            {notes && <Text style={styles.notes}>📝 {notes}</Text>}
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
