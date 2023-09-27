import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ButtonEnd } from '../constants/commonStyle';
import { useTheme } from '../theme/ThemeProvider';
import AppText from './AppText';

interface AppButtonProps {
	buttonLabel?: string;
	textColor?: string;
	top?: number;
	width?: any;
	bottom?: number;
	icon?: any;
	fontFamily?: string;
	onClick?: () => void;
	position?: "end";
}

const AppButton: React.FC<AppButtonProps> = (props: AppButtonProps) => {

	const { Colors, isDarkMode } = useTheme();
	const styles = createStyles(Colors);

	return (
		<View style={{ ...props.position as any && ButtonEnd }}>
			<TouchableOpacity onPress={props.onClick} style={[styles.container, { marginBottom: props.bottom, marginTop: props.top, flexDirection: 'row', alignItems: 'center', width: props.width }]}>
				<AppText fontFamily={props.fontFamily} textColor={Colors.white} label={props.buttonLabel} />
				{props.icon && <Image style={{ left: 20, transform: [{ rotate: '180deg' }] }} tintColor={Colors.background} source={props.icon} />}
			</TouchableOpacity>
		</View >
	);
};

const createStyles = (Colors: any) => {
	return StyleSheet.create({
		container: {
			padding: 20,
			backgroundColor: Colors.primary,
			justifyContent: 'center',
			alignItems: 'center'
		}
	});
};

export default AppButton;
