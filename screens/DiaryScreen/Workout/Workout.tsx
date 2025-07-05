import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { RootNavigationType } from "#types/RootNavigation/RootNavigation";

const Workout = () => {
    const navigation = useNavigation<RootNavigationType>();

    const handlePress = () => {
        navigation.navigate("Workout");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <View>
                    <Text>Тренировка от 05.07.25</Text>
                    <Text>Описание</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: "#E1E1E1",
        borderRadius: 10,
        borderWidth: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
        backgroundColor: "#fff",
    },
});

export default Workout;
