import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icons } from '../assets/Icons';
import { useTheme } from '../theme/ThemeProvider';

interface AppCheckBoxProps {
	isChecked?: boolean;
	onCheckBoxPress?: (isChecked: boolean) => void;
}

const AppCheckBox: React.FC<AppCheckBoxProps> = ({ isChecked, onCheckBoxPress }) => {

	const { Colors, isDarkMode } = useTheme();
	const styles = createStyles(Colors);

	const handlePress = () => {
		if (onCheckBoxPress) {
			onCheckBoxPress(!isChecked);
		}
	};

	return (
		<TouchableOpacity onPress={handlePress} style={styles.container}>
			<Image tintColor={Colors.primary} source={isChecked ? Icons.icnCheckbox : Icons.icnCheckboxEmpty} />
		</TouchableOpacity>
	);
};

const createStyles = (Colors: any) => {
	return StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
		},
	});
};

export default AppCheckBox;
