import { createContext, type ReactNode } from "react";
import { ModalProps } from "react-native";

export interface IModalConfig {
    content: ReactNode;
    props?: ModalProps;
}

export interface IModalContext {
    open: (config: IModalConfig) => void;
    close: () => void;
}

const defaultValues: IModalContext = {
    open: () => {},
    close: () => {},
};

const ModalContext = createContext<IModalContext>(defaultValues);

export default ModalContext;
