import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import FeatherIcon from "react-native-vector-icons/Feather";

import { BasicStyles } from "#types/styles";

interface DatePickerProps {
    editMode?: boolean;
    value: Date;
    onChange: (val: Date) => void;
    styles: { input: BasicStyles; text: BasicStyles; icon: BasicStyles };
}

const DatePicker: React.FC<DatePickerProps> = ({ editMode = false, value, onChange, styles }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            {editMode && show && (
                <DateTimePicker
                    testID="workoutDate"
                    value={value}
                    mode={"date"}
                    onChange={(_: DateTimePickerEvent, selectedDate?: Date) => {
                        if (selectedDate) {
                            onChange(selectedDate);
                        }

                        setShow(false);
                    }}
                />
            )}
            <TouchableOpacity onPress={() => setShow(editMode)} style={styles.input}>
                <Text style={styles.text}>{value.toLocaleDateString()}</Text>
                {editMode && <FeatherIcon name="edit" style={styles.icon} />}
            </TouchableOpacity>
        </>
    );
};

export default DatePicker;
