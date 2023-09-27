import React from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { useTheme } from '../theme/ThemeProvider';



interface AppLoaderProps {
	isLoading?: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({ isLoading }) => {

	const { Colors, isDarkMode } = useTheme();
	const styles = createStyles(Colors);

	return (
		<View style={styles.container}>
			{isLoading && (
				<Spinner
					isVisible={isLoading}
					size={24} type={'Circle'}
					color={Colors.primary}
				/>
			)}
		</View>
	);
};

const createStyles = (Colors: any) => {
	return StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
	});
};

export default AppLoader;
