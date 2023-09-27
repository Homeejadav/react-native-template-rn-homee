import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Toast, { ToastConfig as ToastMessageType } from 'react-native-toast-message';
import { useTheme } from '../theme/ThemeProvider';
import { Theme } from './AppColors';

interface ToastConfigParams {
	text1?: string;
	type?: 'success' | 'error';
}

type ToastView = (params: ToastConfigParams) => React.ReactNode;

const CustomToastView: ToastView = ({ text1, type }) => {
	const { Colors } = useTheme();
	const styles = createStyles(Colors);

	const backgroundColor = type === 'error' ? Colors.error : Colors.success;

	return (
		<View style={[styles.mainViewStyle, { backgroundColor }]}>
			<View style={styles.subViewStyle}>
				<Text numberOfLines={2} style={styles.textStyle}>
					{text1}
				</Text>
			</View>
		</View>
	);
};

const toastConfig: ToastMessageType = {
	error: (props) => <CustomToastView {...props} type="error" />,
	success: (props) => <CustomToastView {...props} type="success" />,
};

const createStyles = (Colors: Theme) => {
	return StyleSheet.create({
		mainViewStyle: {
			height: 50,
			width: '100%',
			justifyContent: 'center',
		},
		subViewStyle: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingLeft: 10,
		},
		iconStyle: {
			tintColor: Colors.white,
		},
		textStyle: {
			color: Colors.white,
			width: '90%',
			fontSize: 14,
			paddingLeft: 10,
		},
	});
};

export default toastConfig;
