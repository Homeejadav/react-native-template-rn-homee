import { actionCreators } from '@actions';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SplashScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	_splashTimeout() {
		return setTimeout(() => {
			this.props.navigation.replace('OnboardingScreen');
		}, 1000);
	}

	componentDidMount() {
		I18n.locale = this.props.localize
		this._splashTimeout();
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.mainContainer}>
					<Text style={styles.title}>{'iOnyx'}</Text>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
	title: { fontSize: 20, fontWeight: '600' },
});

const mapStatetoProps = state => {
	return {
		localize: state.initReducer.localize,
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(SplashScreen);
