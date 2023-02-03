import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppPadding } from '../../constants/commonStyle';
import { Header } from '@react-navigation/elements';
import { heightPercentageToDP } from 'react-native-responsive-screen';

class AppSafeView extends React.Component {
	render() {
		const paddingTop = Platform.select({ ios: { paddingTop: 0 }, android: { paddingTop: AppPadding._20 } });
		const { bounces, color, disableBottom } = this.props;
		return (
			<SafeAreaView style={[{ flex: 1, backgroundColor: color ? color : Colors.background }, paddingTop]}>
				<KeyboardAvoidingView
					style={{ flex: 1, marginBottom: disableBottom ? 0 : heightPercentageToDP(8) }}
					contentContainerStyle={{}}
					keyboardVerticalOffset={Platform.select({ ios: 20, android: Header.HEIGHT + 20 })}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					{this.props.children}
				</KeyboardAvoidingView>
			</SafeAreaView >
		);
	}
}

export default AppSafeView;
