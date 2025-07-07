import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "#core/store/store";

interface StoreWrapperProps {
    children: ReactNode;
}

const StoreWrapper: React.FC<StoreWrapperProps> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default StoreWrapper;
