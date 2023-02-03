import { actionCreators } from '@actions';
import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AppScrollView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const { navigation, enabled = true } = this.props;
		return (
			<KeyboardAvoidingView
				keyboardVerticalOffset={Platform.select({ ios: 20, android: Header.HEIGHT + 20 })}
				contentContainerStyle={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					scrollEnabled={enabled}>
					{this.props.children}
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
});

const mapStatetoProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(AppScrollView);
