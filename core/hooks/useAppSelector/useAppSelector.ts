import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "#core/store/store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
