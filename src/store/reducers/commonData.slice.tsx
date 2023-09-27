import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface commonDataState {
	isLogin?: boolean;
	localize?: string;
	isDarkMode?: boolean;
	themeSystemSetting?: boolean;
}

const initialState: commonDataState = {
	isLogin: false,
	localize: 'en',
	isDarkMode: false,
	themeSystemSetting: true
};

const commonDataSlice = createSlice({
	name: 'commonData',
	initialState,
	reducers: {
		setIsLogin: (state, action: PayloadAction<boolean>) => {
			state.isLogin = action.payload;
		},

		setLocalize: (state, action: PayloadAction<string>) => {
			state.localize = action.payload;
		},

		setIsDarkMode: (state, action: PayloadAction<boolean>) => {
			state.isDarkMode = action.payload;
		},
		setIsThemeSystemSetting: (state, action: PayloadAction<boolean>) => {
			state.themeSystemSetting = action.payload;
		},
	},
});

export const { setLocalize, setIsLogin, setIsDarkMode, setIsThemeSystemSetting } = commonDataSlice.actions;

export default commonDataSlice.reducer;
