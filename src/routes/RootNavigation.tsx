import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import I18n from 'react-native-i18n';
import { useSelector } from 'react-redux';
import SplashScreen from '../Screens/SplashScreen';
import { NavigationKeys } from '../constants/navigationKeys';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigation from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const RootNavigation: React.FC = () => {

	const options: NativeStackNavigationOptions = { animation: 'none' };
	const commonData = useSelector((state: any) => state.commonData);
	I18n.locale = commonData.localize;

	console.log('LANG ------> ', commonData.localize);

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
				<Stack.Screen name={NavigationKeys.SplashScreen} component={SplashScreen} />
				<Stack.Screen options={options} name={NavigationKeys.AuthNavigator} component={AuthNavigator} />
				<Stack.Screen options={options} name={NavigationKeys.BottomTab} component={BottomTabNavigation} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigation;
