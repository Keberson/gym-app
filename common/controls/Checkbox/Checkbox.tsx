import { CheckBox, createTheme, ThemeProvider } from "@rneui/themed";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import FeathernIcon from "react-native-vector-icons/Feather";

interface CheckboxProps {
    title: string;
    id: string;
    value: boolean;
    onChange: (value: string) => void;
    type?: "circle" | "box";
}

const Checkbox: React.FC<CheckboxProps> = ({ title, id, value, onChange, type = "circle" }) => {
    const checkedIcon =
        type === "circle" ? (
            <FeathernIcon name="check-circle" size={20} color="#4CAF50" />
        ) : (
            <FeathernIcon name="check-square" size={20} color="#4CAF50" />
        );
    const uncheckedIcon =
        type === "circle" ? (
            <FeathernIcon name="minus-circle" size={20} />
        ) : (
            <FeathernIcon name="minus-square" size={20} />
        );

    return (
        <ThemeProvider theme={theme}>
            <TouchableWithoutFeedback key={id} onPress={() => onChange(id)}>
                <View style={styles.rowContent}>
                    <CheckBox
                        checked={value}
                        onPress={() => onChange(id)}
                        iconType="material-community"
                        checkedIcon={checkedIcon}
                        uncheckedIcon={uncheckedIcon}
                    />
                    <Text>{title}</Text>
                </View>
            </TouchableWithoutFeedback>
        </ThemeProvider>
    );
};

const theme = createTheme({
    components: {
        CheckBox: {
            containerStyle: {
                paddingVertical: 8,
                padding: 0,
                margin: 0,
            },
        },
    },
});

const styles = StyleSheet.create({
    rowContent: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
    },
});

export default Checkbox;
