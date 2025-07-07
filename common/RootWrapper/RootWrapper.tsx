import React, { ReactNode } from "react";

import ModalWrapper from "#common/wrappers/ModalWrapper/ModalWrapper";
import StoreWrapper from "#common/wrappers/StoreWrapper/StoreWrapper";

interface RootWrapperProps {
    children: ReactNode;
}

const RootWrapper: React.FC<RootWrapperProps> = ({ children }) => {
    return (
        <StoreWrapper>
            <ModalWrapper>{children}</ModalWrapper>
        </StoreWrapper>
    );
};

export default RootWrapper;
