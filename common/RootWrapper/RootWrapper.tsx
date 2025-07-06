import ModalWrapper from "#common/wrappers/ModalWrapper/ModalWrapper";
import { ReactNode } from "react";

interface RootWrapperProps {
    children: ReactNode;
}

const RootWrapper: React.FC<RootWrapperProps> = ({ children }) => {
    return <ModalWrapper>{children}</ModalWrapper>;
};

export default RootWrapper;
