import { View, StyleSheet } from "react-native";
import Body, { ExtendedBodyPart } from "react-native-body-highlighter";

interface AnatomyProps {
    gender?: "male" | "female";
    colors?: string[];
    data?: ExtendedBodyPart[];
}

const Anatomy: React.FC<AnatomyProps> = ({
    gender = "male",
    colors = ["red", "orange", "yellow"],
    data = [],
}) => {
    return (
        <View style={styles.bodyContainer}>
            <Body
                data={data}
                gender={gender}
                side="front"
                scale={0.75}
                border="#dfdfdf"
                colors={colors}
            />
            <Body
                data={data}
                gender={gender}
                side="back"
                scale={0.75}
                border="#dfdfdf"
                colors={colors}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 15,
    },
});

export default Anatomy;
