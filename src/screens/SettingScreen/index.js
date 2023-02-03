import { actionCreators } from '@actions';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts, Icons } from '../../assets';
import { AppButton, AppDropdown, AppSafeView, AppScrollView, AppText, AppTextInput } from '../../components/Custom';
import { Colors } from '../../constants/colors';
import { AppContainer, AppMargin, ButtonFlexContainer } from '../../constants/commonStyle';
import { reducerType } from '../../constants/reducerType';
import { t } from '../../services/localize';

class SettingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};
	}



	_onClick = () => {
		this.setState({ isLoading: true })
		setTimeout(() => {
			this.setState({ isLoading: false })
			alert('On Pressed')
		}, 3000)
	}

	render() {
		const languageOption = [
			{ label: 'en - English', value: 'en' },
			{ label: 'sp - Spanish', value: 'sp' },
			{ label: 'gr - German', value: 'gr' },
			{ label: 'jp - Japanese', value: 'jp' },
		]

		return (
			<AppSafeView>
				<View style={AppContainer}>
					<ScrollView showsVerticalScrollIndicator={false} bounces={false}>

						<AppDropdown
							top={AppMargin._10}
							defaultTitle={`Change Language`}
							options={languageOption}
							onValueChange={(value) => {
								this.props.dispatchData(value, reducerType.localize)
							}}
						/>

					</ScrollView>
					<AppButton top={hp(2)} label={t('title')} onClick={() => this.props.navigation.replace('OnboardingScreen')} />
				</View>
			</AppSafeView>
		);
	}
}

const styles = StyleSheet.create({
	footerText: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: AppMargin._20,
		marginBottom: Platform.OS == 'android' && AppMargin._20
	},

});

const mapStatetoProps = state => {
	return {
		localize: state.initReducer.localize
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(SettingScreen);
