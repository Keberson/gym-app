import { useDispatch } from "react-redux";

import { AppDispatch } from "#core/store/store";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
