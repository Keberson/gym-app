import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntIcon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";

import GeneralScreen from "#screens/GeneralScreen/GeneralScreen";
import DiaryScreen from "#screens/DiaryScreen/DiaryScreen";
import KnowledgesScreen from "#screens/KnowledgesScreen/KnowledgesScreen";
import ProgressScreen from "#screens/ProgressScreen/ProgressScreen";

export const RootTabs = createBottomTabNavigator({
    screens: {
        General: {
            screen: GeneralScreen,
            options: {
                title: "Главная",
                tabBarIcon: ({ color, size }) => <AntIcon name="home" size={size} color={color} />,
            },
        },
        Diary: {
            screen: DiaryScreen,
            options: {
                title: "Дневник тренировок",
                tabBarIcon: ({ color, size }) => <AntIcon name="book" size={size} color={color} />,
            },
        },
        Knowledges: {
            screen: KnowledgesScreen,
            options: {
                title: "База знаний",
                tabBarIcon: ({ color, size }) => (
                    <AntIcon name="database" size={size} color={color} />
                ),
            },
        },
        Progress: {
            screen: ProgressScreen,
            options: {
                title: "Прогресс",
                tabBarIcon: ({ color, size }) => (
                    <IonIcon name="analytics" size={size} color={color} />
                ),
            },
        },
    },
});
