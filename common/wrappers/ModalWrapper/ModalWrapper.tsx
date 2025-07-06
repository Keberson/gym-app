import { ReactNode, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

import ModalContext, { IModalConfig } from "#core/contexts/ModalContext";
import { Icon } from "@rneui/themed";

interface ModalWrapperProps {
    children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
    const [show, setShow] = useState<boolean>(false);
    const [modalConfig, setModalConfig] = useState<IModalConfig | undefined>(undefined);

    const open = (config: IModalConfig) => {
        setShow(true);
        setModalConfig(config);
    };

    const close = () => {
        setShow(false);
        setModalConfig(undefined);
    };

    return (
        <>
            {modalConfig && (
                <Modal visible={show} {...modalConfig.props}>
                    {modalConfig?.content}
                    <View style={styles.addButtonWrapper}></View>
                    <View>
                        <TouchableOpacity
                            style={{ ...styles.addButton, ...styles.button }}
                            onPress={() => console.log("Добавить")}
                        >
                            <Icon name="add" type="material" color="white" size={32} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...styles.closeButton, ...styles.button }}
                            onPress={close}
                        >
                            <Icon name="close" type="material" color="white" size={32} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
            <ModalContext.Provider value={{ open, close }}>{children}</ModalContext.Provider>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    addButton: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: "#007AFF",
    },
    closeButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        borderRadius: "50%",
        backgroundColor: "#A8A8A8",
    },
    addButtonWrapper: {
        height: 80,
    },
});

export default ModalWrapper;
