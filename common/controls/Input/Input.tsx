import {
    NativeSyntheticEvent,
    TextInput,
    TextInputChangeEventData,
    TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
    handleChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ handleChange, ...props }) => {
    return (
        <TextInput
            {...props}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                handleChange(e.nativeEvent.text)
            }
        />
    );
};

export default Input;
