import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface MainContainerProps {
	children: ReactNode;
	style?: any; // You can define a more specific style type if needed
}

const MainContainer: React.FC<MainContainerProps> = ({ children, style }) => {
	const { Colors, isDarkMode } = useTheme();
	const styles = createStyles(Colors);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
			<View style={[styles.container, style]}>
				{children}
			</View>
		</SafeAreaView>
	)
}

const createStyles = (Colors: any) => {
	return StyleSheet.create({
		container: {
			flex: 1,
		},
	});
};


export default MainContainer;
