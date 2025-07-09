import React, { ReactNode, useState, useMemo, useCallback } from "react";
import { Modal, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon } from "@rneui/themed";

import ModalContext, { IModalConfig } from "#core/contexts/ModalContext";

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);
    const [modalProps, setModalProps] = useState<any>({});
    const [isCloseable, setIsCloseable] = useState(false);
    const [addHandler, setAddHandler] = useState<(() => void) | null>(null);
    const [closeHandler, setCloseHandler] = useState<(() => void) | null>(null);
    const [isAddDisabled, setIsAddDisabled] = useState(false);

    const openModal = useCallback((config: IModalConfig) => {
        setContent(config.content);
        setModalProps(config.props || {});
        setIsCloseable(config.closeable || false);
        setIsVisible(true);
        setIsAddDisabled(false);
    }, []);

    const closeModal = useCallback(() => {
        setIsVisible(false);
        setAddHandler(null);
        setCloseHandler(null);
    }, []);

    const handleAddPress = useCallback(() => {
        if (!isAddDisabled && addHandler) {
            addHandler();
        }
    }, [addHandler, isAddDisabled]);

    const handleClosePress = useCallback(() => {
        if (closeHandler) {
            closeHandler();
        }
        closeModal();
    }, [closeHandler, closeModal]);

    const contextValue = useMemo(
        () => ({
            open: openModal,
            close: closeModal,
            setHandleAdd: (handler: (() => void) | undefined) => {
                setAddHandler(() => handler);
            },
            setHandleClose: (handler: (() => void) | undefined) => {
                setCloseHandler(() => handler);
            },
            setDisableAdd: setIsAddDisabled,
        }),
        [openModal, closeModal]
    );

    const hasButtons = addHandler || isCloseable;

    const contentContainerStyle: ViewStyle = {
        flex: 1,
        paddingBottom: hasButtons ? 80 : 0,
    };

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
            <Modal visible={isVisible} {...modalProps}>
                <View style={contentContainerStyle}>{content}</View>
                {hasButtons && (
                    <View style={styles.buttonsContainer}>
                        {addHandler && (
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    styles.addButton,
                                    isAddDisabled && styles.disabledButton,
                                ]}
                                onPress={handleAddPress}
                                activeOpacity={0.7}
                                disabled={isAddDisabled}
                            >
                                <Icon
                                    name="add"
                                    type="material"
                                    color={isAddDisabled ? "#CCCCCC" : "white"}
                                    size={32}
                                />
                            </TouchableOpacity>
                        )}
                        {isCloseable && (
                            <TouchableOpacity
                                style={[styles.button, styles.closeButton]}
                                onPress={handleClosePress}
                                activeOpacity={0.7}
                            >
                                <Icon name="close" type="material" color="white" size={32} />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </Modal>
        </ModalContext.Provider>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
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
        backgroundColor: "#007AFF",
    },
    closeButton: {
        position: "absolute",
        left: 20,
        backgroundColor: "#A8A8A8",
    },
    disabledButton: {
        backgroundColor: "#E0E0E0",
    },
    buttonsContainer: {
        height: 80,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 0,
    },
});

export default ModalProvider;
