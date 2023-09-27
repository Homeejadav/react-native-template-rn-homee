import { configureStore } from '@reduxjs/toolkit';
import { MMKV } from 'react-native-mmkv';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, Storage, persistReducer, persistStore } from 'redux-persist';
import commonDataSlice from './reducers/commonData.slice';
import homeScreenSlice from './reducers/homeScreen.slice';

const storage = new MMKV();

export const reduxStorage: Storage = {
	setItem: (key, value) => {
		storage.set(key, value);
		return Promise.resolve(true);
	},
	getItem: key => {
		const value = storage.getString(key);
		return Promise.resolve(value);
	},
	removeItem: key => {
		storage.delete(key);
		return Promise.resolve();
	},
};

const persistMMKVConfig = {
	key: 'mmkvroot',
	storage: reduxStorage,
	blacklist: ['userName',],
	whitelist: ['localize', 'isDarkMode', 'themeSystemSetting', 'isLogin',]
};

const mmkv_CommonDataSlice = persistReducer(persistMMKVConfig, commonDataSlice)
const mmkv_HomeScreen = persistReducer(persistMMKVConfig, homeScreenSlice)

// Define your additional middleware here
const additionalMiddleware = (store: any) => (next: any) => (action: any) => {
	// Middleware logic
	return next(action);
};

const store = configureStore({
	reducer: {
		commonData: mmkv_CommonDataSlice,
		homeScreen: mmkv_HomeScreen,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(additionalMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
