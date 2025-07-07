import { Button, FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppSelector } from "#core/hooks";

import { RootNavigationType } from "#types/rootNavigation";

import Workout from "./Workout/Workout";

const DiaryScreen = () => {
    const navigation = useNavigation<RootNavigationType>();
    const workouts = useAppSelector((state) => state.workout.workouts);

    const handlePress = () => {
        navigation.navigate("Workout", { editMode: true });
    };

    return (
        <View style={styles.container}>
            <Button title="Добавить тренировку" onPress={handlePress} />
            <FlatList
                style={styles.listContaier}
                data={workouts}
                renderItem={(workoutItem) => <Workout workout={workoutItem.item} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    listContaier: {
        marginTop: 10,
        flex: 1,
    },
    separator: {
        height: 10,
    },
});

export default DiaryScreen;
