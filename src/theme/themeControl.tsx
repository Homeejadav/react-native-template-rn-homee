import { useDispatch } from "react-redux";
import { setIsDarkMode, setIsThemeSystemSetting } from "../store/reducers/commonData.slice";

export const useThemeControl = () => {
	const dispatch = useDispatch();

	const setDarkMode = () => {
		dispatch(setIsThemeSystemSetting(false));
		dispatch(setIsDarkMode(true));
	};

	const setLightMode = () => {
		dispatch(setIsThemeSystemSetting(false));
		dispatch(setIsDarkMode(false));
	};

	const setDefaultTheme = () => {
		dispatch(setIsThemeSystemSetting(true));
	};

	return {
		setDarkMode,
		setLightMode,
		setDefaultTheme,
	};
};
