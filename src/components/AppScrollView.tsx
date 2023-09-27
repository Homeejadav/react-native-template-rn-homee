import React, { ReactNode } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet
} from 'react-native';

interface AppScrollViewProps {
	navigation?: any; // Change to appropriate type
	enabled?: boolean;
	children?: ReactNode;
}

const AppScrollView: React.FC<AppScrollViewProps> = ({
	enabled = true,
	children,
}) => {
	const keyboardVerticalOffset = Platform.select({
		ios: 20,
		android: 20,
	});

	const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={keyboardVerticalOffset}
			style={styles.container}
			behavior={behavior}>
			<ScrollView
				contentContainerStyle={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
				scrollEnabled={enabled}>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default AppScrollView;
