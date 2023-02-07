import { actionCreators } from '@actions';
import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts } from '../../assets';
import { AppCheckBox, AppRadioButton, AppSafeView, AppSwitch, AppText } from '../../components/Custom';
import { AppContainer, AppMargin } from '../../constants/commonStyle';

class TestScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false,
			isRadio: false,
			isSwitch: false,
		};
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			return true;
		});
		this._unsubscribe = this.props.navigation.addListener('focus', () => { });
	}

	componentWillUnmount() {
		this._unsubscribe();
	}

	render() {
		const { isChecked, isSwitch, isRadio } = this.state;
		const { navigation } = this.props;
		return (
			<AppSafeView>
				<View style={AppContainer}>
					<AppText fontFamily={Fonts.BOLD} label={'TestScreen'} />

					<AppCheckBox
						top={AppMargin._20}
						value={isChecked}
						onValueChange={() => {
							this.setState({ isChecked: !isChecked });
							alert(this.state.isChecked);
						}}
					/>

					<AppRadioButton
						top={AppMargin._20}
						value={isRadio}
						onValueChange={() => {
							this.setState({ isRadio: !isRadio });
							alert(this.state.isRadio);
						}}
					/>

					<AppSwitch
						top={AppMargin._20}
						value={isSwitch}
						onValueChange={() => {
							this.setState({ isSwitch: !isSwitch });
							alert(this.state.isSwitch);
						}}
					/>
				</View>
			</AppSafeView>
		);
	}
}

const styles = StyleSheet.create({});

const mapStatetoProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(TestScreen);
