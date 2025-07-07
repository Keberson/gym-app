import { createContext, type ReactNode } from "react";
import { ModalProps } from "react-native";

export interface IModalConfig {
    content: ReactNode;
    props?: ModalProps;
    handleAdd?: () => void;
    handleClose?: () => void;
    closeable?: boolean;
}

export interface IModalContext {
    open: (config: IModalConfig) => void;
    close: () => void;
    setHandleAdd: (handleAdd: (() => void) | undefined) => void;
    setDisableAdd: (value: boolean) => void;
    setHandleClose: (handleClose: (() => void) | undefined) => void;
}

const defaultValues: IModalContext = {
    open: () => {},
    close: () => {},
    setHandleAdd: () => {},
    setDisableAdd: () => {},
    setHandleClose: () => {},
};

const ModalContext = createContext<IModalContext>(defaultValues);

export default ModalContext;
