import { useEffect } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "#core/hooks";

import { RootStackParamList } from "#types/navigation";

import { selectExerciseById } from "#core/store/knowledges/knowledges.selector";

import Anatomy from "#common/Anatomy/Anatomy";

interface ExerciseScreenProps {
    route: RouteProp<RootStackParamList, "Exercise">;
}

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({
    route: {
        params: { id },
    },
}) => {
    const navigation = useNavigation();
    const exercise = useAppSelector((state) => selectExerciseById(state, id));

    useEffect(() => {
        navigation.setOptions({
            title: exercise?.name,
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            {exercise && (
                <>
                    <Text style={styles.title}>{exercise.description}</Text>
                    <Anatomy data={exercise.bodyParts} />
                </>
            )}
            {!exercise && <Text>Некорректное упражнение</Text>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingBottom: 20,
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
    },
});

export default ExerciseScreen;
