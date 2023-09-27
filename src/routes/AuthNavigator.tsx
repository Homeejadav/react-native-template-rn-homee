import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../Screens/Auth/LoginScreen';
import { NavigationKeys } from '../constants/navigationKeys';

const Stack = createNativeStackNavigator();

const AuthNavigator: React.FC = () => {
	return (
		<Stack.Navigator initialRouteName={NavigationKeys.LoginScreen} screenOptions={{ headerShown: false }}>
			<Stack.Screen name={NavigationKeys.LoginScreen} component={LoginScreen} />
		</Stack.Navigator>
	);
};

export default AuthNavigator;
