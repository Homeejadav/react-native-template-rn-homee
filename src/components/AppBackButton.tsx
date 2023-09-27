import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icons } from '../assets/Icons';
import { Fonts } from '../assets/fonts';
import { useTheme } from '../theme/ThemeProvider';

interface AppBackButtonProps {
	buttonTitle?: string;
	onBack?: () => void;
}

const AppBackButton = (props: AppBackButtonProps) => {
	const { Colors, isDarkMode } = useTheme();
	const styles = createStyles(Colors);

	return (
		<TouchableOpacity onPress={props.onBack} style={styles.container}>
			<Image style={{ width: 24 }} resizeMode='contain' source={Icons.icnBack} />
			<Text style={styles.buttonTitle}>{props.buttonTitle}</Text>
		</TouchableOpacity>
	);
};

const createStyles = (Colors: any) => {
	return StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
		},

		buttonTitle: {
			includeFontPadding: false,
			color: Colors.primary,
			marginLeft: 10,
			fontSize: 16,
			bottom: 1.5,
			fontFamily: Fonts.BOLD
		}
	});
};

export default AppBackButton;