import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { FontSize, Fonts } from '../../../assets/fonts';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import MainContainer from '../../../components/MainContainer';
import { AppContainer, AppMargin } from '../../../constants/commonStyle';
import { setIsLogin } from '../../../store/reducers/commonData.slice';
import { useTheme } from '../../../theme/ThemeProvider';
import { isValidEmail, isValidPasswordCharacter, isValidPasswordLength, isValidPasswordSpecial } from '../../../utils/validators';

const LoginScreen = (props: any) => {
	const dispatch = useDispatch()
	const { isDarkMode, toggleTheme, Colors } = useTheme();
	const styles = createStyles(Colors);

	const [showPassword, setShowPassword] = useState(false);
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const showToast = (msg: string, type = 'error') => {
		Toast.show({ type, text1: msg });
	};

	const validateCredentials = () => {

		Keyboard.dismiss();
		const email = emailAddress ? emailAddress.trim() : '';
		const pass = password ? password.trim() : '';

		switch (true) {
			case !email: showToast('Enter email address'); break;
			case !isValidEmail(email): showToast('Enter valid Email address'); break;
			case !pass: showToast('Enter password'); break;
			case !isValidPasswordLength(pass): showToast('The password must be at least 8 characters long'); break;
			case !isValidPasswordCharacter(pass): showToast('The password must contain one uppercase, one lowercase'); break;
			case !isValidPasswordSpecial(pass): showToast('The password must contain one special character'); break;
			default:
				props.navigation.navigate('BottomTab');
				showToast('Login Success', 'success');
				dispatch(setIsLogin(true))
				break;
		}
	};

	return (
		<MainContainer>
			<View style={AppContainer}>

				<View>
					<AppText fontFamily={Fonts.BOLD} fontSize={FontSize._32} label={`Login`} />
					<AppText fontFamily={Fonts.REGULAR} textColor={Colors.secondary} label={`Please Login to Continue.`} />
				</View>

				<View style={{ flex: 1 }}>
					<AppTextInput
						placeholder={'Email Address'}
						value={emailAddress}
						onChangeText={(text: React.SetStateAction<string>) => setEmailAddress(text)}
					/>

					<AppTextInput
						placeholder={'Password'}
						value={password}
						onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
						secureTextEntry={!showPassword}
					/>

				</View>

				<AppButton buttonLabel={'Login'} onClick={validateCredentials} />

			</View>
		</MainContainer>
	);
};

const createStyles = (Colors: any) => {
	return StyleSheet.create({
		orContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			marginTop: AppMargin._20,
		},
	});
};

export default LoginScreen;
