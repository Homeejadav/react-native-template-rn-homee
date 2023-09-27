import React, { useEffect } from 'react';
import { Image, StyleSheet, View, useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../assets/images';
import { AppDispatch } from '../../store';
import { Theme } from '../../theme/AppColors';
import { useTheme } from '../../theme/ThemeProvider';

interface SplashScreenProps {
	navigation: any
}

const SplashScreen: React.FC<SplashScreenProps> = (props) => {

	const dispatch: AppDispatch = useDispatch();
	const isLogin = useSelector((state: any) => state.commonData.isLogin)
	const { Colors, isDarkMode } = useTheme();
	const colourScheme = useColorScheme()
	const styles = createStyles(Colors, colourScheme as string);

	const showToast = (msg: string, type = 'error') => {
		Toast.show({ type, text1: msg });
	};

	useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			setTimeout(() => {
				switch (isLogin) {
					case true:
						props.navigation.navigate('BottomTab');
						break;
					case false:
						props.navigation.navigate('AuthNavigator');
						break;
					default:
				}
			}, 2000);
		});

		return () => {
			unsubscribe();
		};
	}, [isLogin, props.navigation, dispatch]);

	return (
		<View style={styles.container}>
			<Image source={Images.imgSplash} />
		</View>
	);
};

const createStyles = (Colors: Theme, colourScheme: string) => {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colourScheme == 'dark' ? 'black' : Colors.white,
			alignItems: 'center',
			justifyContent: 'center',
		}
	})
};

export default SplashScreen;