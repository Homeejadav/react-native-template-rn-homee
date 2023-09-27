import { Alert } from "react-native";

export const showAlert = (title: string, message: string, onPressOK: () => void) => {
	Alert.alert(
		title,
		message,
		[
			{ text: 'Cancel', style: 'cancel' },
			{ text: 'OK', onPress: onPressOK },
		],
		{ cancelable: false }
	);
};