import { View, StyleSheet } from "react-native";
import Body from "react-native-body-highlighter";

import { IMuscleLoad } from "#types/exercise";
import { calculateIntensity } from "#core/utils/calculateIntesity/calculateIntesity";

interface AnatomyProps {
    gender?: "male" | "female";
    colors?: string[];
    data?: IMuscleLoad[];
}

const Anatomy: React.FC<AnatomyProps> = ({
    gender = "male",
    colors = ["green", "orange", "red"],
    data = [],
}) => {
    const transformedData = calculateIntensity(data);

    return (
        <View style={styles.bodyContainer}>
            <Body
                data={transformedData}
                gender={gender}
                side="front"
                scale={0.9}
                border="#dfdfdf"
                colors={colors}
            />
            <Body
                data={transformedData}
                gender={gender}
                side="back"
                scale={0.9}
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
