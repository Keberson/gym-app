import React from "react";
import { Slug } from "react-native-body-highlighter";
import { View, StyleSheet, Text } from "react-native";
import { Control, Controller } from "react-hook-form";
import { Slider } from "@rneui/themed";

import Checkbox from "#common/controls/Checkbox/Checkbox";

import { Muscles } from "#types/muscles";

import { ExerciseForm } from "../ExerciseCreateView";

interface MuscleLoadProps {
    muscle: Muscles;
    slug: Slug;
    index: number;
    control: Control<ExerciseForm, any, ExerciseForm>;
    isSelected: boolean;
    onToggle: (slug: Slug, isSelected: boolean) => void;
}

const MuscleLoad: React.FC<MuscleLoadProps> = ({
    muscle,
    slug,
    index,
    control,
    isSelected,
    onToggle,
}) => {
    const handleCheckboxChange = () => {
        onToggle(slug, !isSelected);
    };

    return (
        <View style={styles.container}>
            <Checkbox title={muscle} id={slug} value={isSelected} onChange={handleCheckboxChange} />

            {isSelected && (
                <View style={styles.sliderContainer}>
                    <Controller
                        name={`bodyParts.${index}.load`}
                        control={control}
                        defaultValue={5}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Slider
                                    minimumValue={1}
                                    maximumValue={10}
                                    step={1}
                                    value={value}
                                    onValueChange={onChange}
                                    minimumTrackTintColor="#4CAF50"
                                    maximumTrackTintColor="#d3d3d3"
                                    thumbTintColor="#4CAF50"
                                    thumbStyle={{
                                        height: 20,
                                        width: 20,
                                    }}
                                />
                                <Text style={styles.sliderValue}>Нагрузка: {value}</Text>
                            </>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    sliderContainer: {
        marginTop: 8,
        paddingHorizontal: 8,
    },
    sliderValue: {
        textAlign: "center",
        marginTop: 4,
        color: "#666",
    },
});

export default MuscleLoad;
