import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeScreenState {
	items?: any[];
	userName?: string;
}

const initialState: HomeScreenState = {
	items: [],
	userName: 'Onyx!',
};

const homeScreenSlice = createSlice({
	name: 'homeScreen',
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<any[]>) => {
			state.items = action.payload;
		},
		setUserName: (state, action: PayloadAction<string>) => {
			state.userName = action.payload;
		},
	},
});

export const { setData, setUserName } = homeScreenSlice.actions;

export default homeScreenSlice.reducer;
