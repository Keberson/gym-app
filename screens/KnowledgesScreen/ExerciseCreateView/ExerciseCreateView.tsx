import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Slug } from "react-native-body-highlighter";
import { useContext, useEffect } from "react";

import Input from "#common/controls/Input/Input";

import { IKnowledgeExercise } from "#types/exercise";
import { musculesTranslated, musculseToSlugs } from "#types/muscles";

import ModalContext from "#core/contexts/ModalContext";
import { useAppDispatch } from "#core/hooks";
import { addExercise } from "#core/store/knowledges/knowledges.slice";
import generateKnowledgeId from "#core/utils/generateKnowledgeId/generateKnowledgeId";

import MuscleLoad from "./MuscleLoad/MuscleLoad";

interface ExerciseCreateViewProps {
    editMode?: boolean;
}

export interface ExerciseForm extends Omit<IKnowledgeExercise, "id"> {}

const ExerciseCreateView: React.FC<ExerciseCreateViewProps> = ({ editMode = true }) => {
    const dispatch = useAppDispatch();
    const {
        watch,
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<ExerciseForm>({});
    const { fields, append, remove } = useFieldArray({
        control,
        name: "bodyParts",
        rules: {
            required: true,
            minLength: 1,
        },
    });
    const { setHandleAdd, setDisableAdd, close } = useContext(ModalContext);

    const values = watch();

    useEffect(() => {
        setHandleAdd(
            handleSubmit((formData) => {
                dispatch(addExercise({ ...formData, id: generateKnowledgeId() }));
                close();
            })
        );
    }, []);

    useEffect(() => {
        setDisableAdd(!isValid);
    }, [values]);

    const handleToggleMuscle = (slug: Slug, isSelected: boolean) => {
        if (isSelected) {
            append({ slug, load: 5 });
        } else {
            const index = fields.findIndex((item) => item.slug === slug);
            if (index !== -1) {
                remove(index);
            }
        }
    };

    const isMuscleSelected = (slug: Slug) => {
        return fields.some((item) => item.slug === slug);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Создание упражнения</Text>
            <View style={styles.rowContainer}>
                <Text>Название: </Text>
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: true, minLength: 1, min: 1 }}
                    render={({ field: { onChange, value } }) => (
                        <Input style={styles.inputContainer} value={value} onChange={onChange} />
                    )}
                />
            </View>
            <View style={styles.rowContainer}>
                <Text>Описание: </Text>
                <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            editable={editMode}
                            value={value}
                            onChange={onChange}
                            multiline={true}
                            numberOfLines={3}
                            style={{
                                ...styles.rowDescription,
                                ...styles.rowInput,
                                ...styles.rowTextarea,
                            }}
                        />
                    )}
                />
            </View>
            <Text style={styles.text}>Выберите мышцы</Text>
            <View>
                {musculesTranslated.map((item, index) => (
                    <MuscleLoad
                        muscle={item}
                        slug={musculseToSlugs[item]}
                        index={index}
                        control={control}
                        isSelected={isMuscleSelected(musculseToSlugs[item])}
                        onToggle={handleToggleMuscle}
                        key={item}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
    },
    inputContainer: {
        borderWidth: 1,
        flex: 1,
        borderColor: "#c5c5c5",
        borderRadius: 5,
    },
    rowDescription: {
        color: "#555",
        fontSize: 16,
    },
    rowInput: {
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
        flexDirection: "row",
    },
    rowTextarea: {
        flex: 1,
        height: 24 * 3,
        textAlignVertical: "top",
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default ExerciseCreateView;
