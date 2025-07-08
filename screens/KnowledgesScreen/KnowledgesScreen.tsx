import { Button, FlatList, StyleSheet, View } from "react-native";
import { useContext } from "react";

import { useAppSelector } from "#core/hooks";
import { selectAllExercises } from "#core/store/knowledges/knowledges.selector";
import ModalContext from "#core/contexts/ModalContext";

import Exercise from "./Exercise/Exercise";
import ExerciseCreateView from "./ExerciseCreateView/ExerciseCreateView";

const KnowledgesScreen = () => {
    const exercises = useAppSelector((state) => selectAllExercises(state));
    const { open, close } = useContext(ModalContext);

    const handleAdd = () => {
        open({
            content: <ExerciseCreateView />,
            props: {
                onRequestClose: close,
            },
            closeable: true,
        });
    };

    return (
        <View style={styles.container}>
            <Button title="Добавить упражнение" onPress={handleAdd} />
            <FlatList
                style={styles.listContaier}
                data={exercises}
                renderItem={(workoutItem) => <Exercise exercise={workoutItem.item} />}
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

export default KnowledgesScreen;
