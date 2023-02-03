
import React from 'react';
import { Appearance, BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Fonts, Icons } from './assets';
import { Colors } from './constants/colors';
import { borderRadius5 } from './constants/commonStyle';
import StackNavigator from './navigators/stackNavigator';
import { persistor, store } from './reducers';


class App extends React.Component {
	componentDidMount() {
		Appearance.addChangeListener(({ colorScheme }) => {
			console.log(colorScheme);
		});
		BackHandler.addEventListener('hardwareBackPress', () => {
			return true;
		});
	}


	render() {

		const toastConfig = {
			error: ({ text1, props }) => (
				<View style={styles.mainViewStyle}>
					<View style={styles.subViewStyle}>
						<Image style={styles.iconStyle} source={Icons.icnWarning} />
						<Text numberOfLines={2} style={styles.textStyle}>{text1}</Text>
					</View>
				</View>
			),

			success: ({ text1, props }) => (
				<View style={[styles.mainViewStyle, { backgroundColor: Colors.success }]}>
					<View style={styles.subViewStyle}>
						<Image style={styles.iconStyle} source={Icons.icnSuccess} />
						<Text numberOfLines={2} style={styles.textStyle}>{text1}</Text>
					</View>
				</View>
			),
		};


		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<StackNavigator />
					<Toast config={toastConfig} position='top' />
				</PersistGate>
			</Provider>
		)
	}
}

const styles = StyleSheet.create({

	mainViewStyle: {
		height: 50,
		width: '90%',
		backgroundColor: Colors.error,
		justifyContent: 'center',
		...borderRadius5,
	},

	subViewStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10,
	},

	iconStyle: {
		tintColor: Colors.snowWhite
	},

	textStyle: {
		width: '90%',
		color: Colors.snowWhite,
		fontFamily: Fonts.REGULAR,
		fontSize: 14,
		paddingLeft: 10,
	},
})

export default App;