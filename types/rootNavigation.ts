import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Workout: {
        id?: string;
        editMode?: boolean;
    };
};

export type RootNavigationType = NativeStackNavigationProp<RootStackParamList>;
