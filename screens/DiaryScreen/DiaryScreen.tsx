import { Button, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import Workout from "./Workout/Workout";

const DiaryScreen = () => {
    return (
        <View style={styles.container}>
            <Button title="Добавить тренировку" />
            <FlatList
                style={styles.listContaier}
                data={[...Array(15)]}
                renderItem={() => <Workout />}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
});

export default DiaryScreen;
