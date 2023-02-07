import { actionCreators } from '@actions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screen from '@screens';
import React from 'react';
import { StatusBar } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Colors } from '../constants/colors';
import BottomTabNav from './bottomTabNavigator';
import { navigationRef } from './navActions';

const Stack = createNativeStackNavigator();

class StackNavigator extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		};
	};

	_addScreen(name) {
		return <Stack.Screen name={name} component={Screen[name]} />;
	}

	render() {
		I18n.locale = this.props.localize;
		return (
			<NavigationContainer ref={navigationRef}>
				<StatusBar animated={true} backgroundColor={Colors.snowWhite} barStyle={"dark-content"} />
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{/* {this._addScreen('TestScreen')} */}
					<Stack.Screen options={{ animation: 'fade' }} name={'BottomTab'} component={BottomTabNav} />
					<Stack.Screen name={'SplashScreen'} component={Screen.SplashScreen} />
					<Stack.Screen options={{ animation: 'fade' }} name={'OnboardingScreen'} component={Screen.OnboardingScreen} />
					<Stack.Screen options={{ animation: 'fade' }} name={'LoginScreen'} component={Screen.LoginScreen} />
					<Stack.Screen options={{ animation: 'slide_from_bottom' }} name={'RegisterScreen'} component={Screen.RegisterScreen} />
					{this._addScreen('OtpScreen')}
					{this._addScreen('DetailsScreen')}
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

const mapStatetoProps = state => {
	return {
		localize: state.initReducer.localize,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps,)(StackNavigator);
