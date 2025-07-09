import {
    NativeSyntheticEvent,
    TextInput,
    TextInputChangeEventData,
    TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
    onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ onChange, ...props }) => {
    return (
        <TextInput
            {...props}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                onChange(e.nativeEvent.text)
            }
        />
    );
};

export default Input;
