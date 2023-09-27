import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeScreen from '../Screens/HomeScreen';
import SettingScreen from '../Screens/SettingScreen';
import { Icons } from '../assets/Icons';
import { Fonts } from '../assets/fonts';
import { AppShadow } from '../constants/commonStyle';
import { Theme } from '../theme/AppColors';
import { useTheme } from '../theme/ThemeProvider';
import { NavigationKeys } from '../constants/navigationKeys';

const BottomTab = createBottomTabNavigator();

interface TabItem {
	icon: string;
	text: string;
	screen: string;
}

interface MyTabBarProps {
	tabValue: TabItem[];
	state: any;
	navigation: any;
}

const MyTabBar: FC<MyTabBarProps> = ({ tabValue, state, navigation }) => {

	const { Colors, isDarkMode } = useTheme();
	const styles = createStyles(Colors);

	const renderTabItem = (item: TabItem, index: React.Key | null | undefined) => {
		const isSelected = state.index === index;
		const iconSource = Icons[item.icon as keyof typeof Icons];
		const textColor = isSelected ? Colors.primary : Colors.secondary;

		return (
			<TouchableOpacity
				key={index}
				style={{ alignItems: 'center' }}
				onPress={() => navigation.navigate(item.screen)}>

				<Image source={iconSource}
					style={{ marginTop: 15, tintColor: textColor }}
				/>

				{/* uncomment if you want to show texts */}
				{/* <Text style={[styles.textStyle, { color: textColor }]}>
					{item.text}
				</Text> */}
			</TouchableOpacity>
		);
	};

	return (
		<View style={[AppShadow, styles.mainContainer]}>
			<View style={styles.subContainer}>
				{tabValue.map((item, index) => renderTabItem(item, index))}
			</View>
		</View>
	);
};

const BottomTabNavigation: FC = () => {

	const { Colors, isDarkMode } = useTheme();
	const styles = createStyles(Colors);

	const tabValue: TabItem[] = [
		{ icon: 'icnHome', text: 'Home', screen: NavigationKeys.HomeScreen },
		{ icon: 'icnSetting', text: 'Setting', screen: NavigationKeys.SettingScreen },
	];

	return (
		<View style={styles.insideContainer}>
			<BottomTab.Navigator
				initialRouteName={NavigationKeys.HomeScreen}
				tabBar={(props) => <MyTabBar {...props} tabValue={tabValue} />}
				screenOptions={{ headerShown: false }}>
				<BottomTab.Screen name={NavigationKeys.HomeScreen} component={HomeScreen} />
				<BottomTab.Screen name={NavigationKeys.SettingScreen} component={SettingScreen} />
			</BottomTab.Navigator>
		</View>
	);
};

const createStyles = (Colors: Theme) => {
	return StyleSheet.create({
		mainContainer: {
			bottom: 0,
			position: 'absolute',
			width: '100%',
			backgroundColor: Colors.background,
		},

		subContainer: {
			flexDirection: 'row',
			height: hp(8.5),
			justifyContent: 'space-evenly',
			alignSelf: 'center',
			width: '100%',
		},

		textStyle: {
			marginTop: hp(1),
			fontSize: 12,
			fontFamily: Fonts.REGULAR,
		},

		insideContainer: {
			flex: 1,
			zIndex: 1
		},
	});
};

export default BottomTabNavigation;
