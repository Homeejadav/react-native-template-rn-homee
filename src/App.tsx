import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import StackNavigator from './routes/RootNavigation';
import store, { persistor } from './store';
import { ThemeProvider } from './theme/ThemeProvider';
import toastConfig from './theme/ToastConfig';

const App: React.FC = () => {

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { return true });
		return () => { backHandler.remove() }
	}, []);

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null} >
				<ThemeProvider>
					<StackNavigator />
					<Toast config={toastConfig} topOffset={40} position='top' />
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
