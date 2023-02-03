import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import initReducer from './initReducer';
import userData from './userDataReducer'

//persist config
const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: [
		//reducers that wont be stored
	],
	whitelist: [
		//reducers that will be stored
		'init',
		'localize',
		'firstname',
		'lastname'
	]
};

const logger = createLogger({
	// ...options
});

const rootReducer = combineReducers({
	//add all reducers
	initReducer: persistReducer(persistConfig, initReducer),
	userData: persistReducer(persistConfig, userData)
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))
export const persistor = persistStore(store);