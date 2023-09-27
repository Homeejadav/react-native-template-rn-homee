import React, { ReactNode, createContext, useContext } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { setIsDarkMode } from '../store/reducers/commonData.slice';
import { Theme, darkTheme, lightTheme } from './AppColors';

interface ThemeContextProps {
	isDarkMode: boolean;
	toggleTheme: () => void;
	Colors: Theme;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

	const dispatch: AppDispatch = useDispatch();
	const systemColorScheme = useColorScheme();
	const isDarkMode = useSelector((state: any) => state.commonData.isDarkMode);
	const isSystemDark = useSelector((state: any) => state.commonData.themeSystemSetting);

	let Colors;

	if (isSystemDark) {
		Colors = systemColorScheme === 'light' ? lightTheme : darkTheme;
	} else {
		Colors = isDarkMode ? darkTheme : lightTheme;
	}

	const toggleTheme = () => {
		dispatch(setIsDarkMode(!isDarkMode))
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme, Colors }}>
			<StatusBar barStyle={isSystemDark ? (systemColorScheme === 'light' ? 'dark-content' : 'light-content') : (isDarkMode ? 'light-content' : 'dark-content')} />
			{children}
		</ThemeContext.Provider>
	);
};
