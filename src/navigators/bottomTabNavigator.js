import { actionCreators } from '@actions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Screen from '@screens';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts, FontSize } from '../assets';
import { Icons } from '../assets/Icons';
import { Colors } from '../constants/colors';
import { AppShadow } from '../constants/commonStyle';
import { t } from '../services/localize';

const BottomTab = createBottomTabNavigator();

const MyTabBar = props => {
	return (
		<View style={[AppShadow, styles.mainContainer]}>
			<View style={styles.subContainer}>
				{props.tabValue.map((item, index) => {
					return (
						<TouchableOpacity key={index} style={[{ alignItems: 'center' }]} onPress={() => props.navigation.navigate(item.screen)}>
							<Image source={Icons[item.icon]} style={{ marginTop: 15, tintColor: Colors[props.state.index == index ? 'primary' : 'secondary'], }} />
							<Text style={[styles.textStyle, { color: Colors[props.state.index == index ? 'primary' : 'secondary'] }]}>
								{t(item.text)}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View >
	);
};

class bottomTabNavigation extends React.Component {
	state = {
		tabValue: [
			{ icon: 'icnHome', text: 'home', screen: 'HomeScreen' },
			{ icon: 'icnSetting', text: 'setting', screen: 'SettingScreen' },
		]
	}

	_addScreen(name) {
		return <BottomTab.Screen name={name} component={Screen[name]} />;
	}

	render() {
		return (
			<View style={styles.insideContainer}>
				<BottomTab.Navigator tabBar={props => {
					var tabValue = { ...props, ...this.state }
					return <MyTabBar {...tabValue} />
				}} screenOptions={{ headerShown: false }}>
					{this._addScreen('HomeScreen')}
					{this._addScreen('SettingScreen')}
				</BottomTab.Navigator>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	mainContainer: {
		bottom: 0,
		position: 'absolute', width: '100%',
		backgroundColor: Colors.snowWhite
	},

	subContainer: {
		flexDirection: 'row',
		height: hp(10),
		justifyContent: 'space-around',
		alignSelf: 'center',
		width: '80%',
		// justifyContent: 'space-between',
	},

	textStyle: {
		marginTop: hp(0.5),
		fontSize: FontSize._10,
		fontFamily: Fonts.REGULAR,
	},

	insideContainer: {
		flex: 1,
		zIndex: 1,
		backgroundColor: Colors.snowWhite
	}
})

const mapStatetoProps = state => {
	return {
		localize: state.initReducer.localize,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps,)(bottomTabNavigation);
