import { actionCreators } from '@actions';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	AppButton,
	AppCheckBox, AppRadioButton,
	AppSafeView, AppSwitch
} from '../../components/Custom';
import AppPicker from '../../components/Custom/AppPicker';
import { AppContainer, AppMargin } from '../../constants/commonStyle';
import { reducerType } from '../../constants/reducerType';
import { t } from '../../services/localize';

class SettingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isChecked: false,
			isRadio: false,
			isSwitch: false,
			lang: 'Select a Language'
		};
	}

	_onClick = () => {
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({ isLoading: false });
			alert('On Pressed');
		}, 3000);
	};

	render() {
		const { navigation } = this.props;
		const { isChecked, isRadio, isSwitch } = this.state;

		const languageOption = [
			{ id: 1, label: 'English', value: 'en' },
			{ id: 2, label: 'Spanish', value: 'sp' },
			{ id: 3, label: 'German', value: 'gr' },
			{ id: 4, label: 'Japanese', value: 'jp' },
		];

		return (
			<AppSafeView>
				<View style={AppContainer}>
					<ScrollView showsVerticalScrollIndicator={false} bounces={false}>
						<AppPicker
							shadow={true}
							options={languageOption}
							itemKey={'label'}
							itemValue={'value'}
							title={this.state.lang}
							onSelectOption={(name, value) => {
								this.setState({ lang: name })
								this.props.dispatchData(value, reducerType.localize);
							}}
						/>

						<AppCheckBox
							top={AppMargin._20}
							value={isChecked}
							onValueChange={() => {
								this.setState({ isChecked: !isChecked });
							}}
						/>

						<AppRadioButton
							top={AppMargin._20}
							value={isRadio}
							onValueChange={() => {
								this.setState({ isRadio: !isRadio });
							}}
						/>

						<AppSwitch
							top={AppMargin._20}
							value={isSwitch}
							onValueChange={() => {
								this.setState({ isSwitch: !isSwitch });
							}}
						/>
					</ScrollView>

					<AppButton
						top={hp(2)}
						label={t('title')}
						onClick={() => { navigation.replace('OnboardingScreen') }}
					/>

				</View>
			</AppSafeView>
		);
	}
}

const styles = StyleSheet.create({

});

const mapStatetoProps = (state) => {
	return {
		localize: state.initReducer.localize,
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(SettingScreen);