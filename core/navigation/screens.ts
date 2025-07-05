import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WorkoutScreen from "#screens/WorkoutScreen/WorkoutScreen";
import { RootTabs } from "./tabs";

const RootStack = createNativeStackNavigator({
    initialRouteName: "Root",
    screens: {
        Root: {
            screen: RootTabs,
            options: {
                headerShown: false,
            },
        },
        Workout: {
            screen: WorkoutScreen,
            options: {
                title: "Тренировка",
            },
        },
    },
});

export const Navigation = createStaticNavigation(RootStack);
