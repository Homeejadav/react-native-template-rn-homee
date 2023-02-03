import { actionCreators } from '@actions';
import React from 'react';
import { BackHandler, Image, Keyboard, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts, FontSize, Images } from '../../assets';
import { AppButton, AppSafeView, AppText, AppTextInput } from '../../components/Custom';
import { Colors } from '../../constants/colors';
import { AppContainer, AppHeight, AppMargin, AppWidth } from '../../constants/commonStyle';

class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPassword: false,
			emailAddress: '',
			password: '',
			mobileNo: '',
			pickerShow: false,
			countryCode: "1",
			countryName: "United States",
			countryFlag: "US",
		};
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => { return true });
		this._unsubscribe = this.props.navigation.addListener('focus', () => {

		});
	}

	componentWillUnmount() {
		this._unsubscribe();
	}

	_showToast(msg, type = 'error') {
		Toast.show({ type, text1: msg })
	}

	_validateCredentials = () => {
		Keyboard.dismiss();
		const { mobileNo } = this.state;
		const mob = mobileNo ? mobileNo.toString().trim() : '';
		switch (true) {
			case !mob: this._showToast('Enter Mobile number'); break;
			case mob.length !== 10: this._showToast('Mobile number should be 10 digits long'); break;
			default: {
				this.props.navigation.navigate('BottomTab')
				this._showToast('Login Success', 'success')
			}; break;
		}
	};

	render() {
		const { navigation } = this.props;
		return (
			<AppSafeView disableBottom>
				<View style={AppContainer}>

					<View style={{ marginVertical: AppMargin._40 }}>
						<AppText fontFamily={Fonts.BOLD} fontSize={FontSize._32} label={`Login`} />
						<AppText fontFamily={Fonts.REGULAR} color={Colors.secondary} label={`Please Login Or Register to Continue.`} />
					</View>

					<ScrollView showsVerticalScrollIndicator={false} bounces={false}>

						<Image style={{ height: AppHeight._250, width: AppWidth._100pr }} resizeMode='contain' source={Images.imgDemo5} />

						<AppTextInput
							countryPickerComponent={true}
							countryCode={this.state.countryCode}
							onPickerShow={() => { this.setState({ pickerShow: true }) }}
							placeholder='Mobile Number'
							keyboardType='decimal-pad'
							value={this.state.mobileNo}
							maxLength={10}
							left={AppMargin._20}
							onChangeText={(value) => this.setState({ mobileNo: value })}
						/>

						<AppText
							label={`we will send you an OTP of X Digit on your mobile number.`}
							hz={AppMargin._50}
							textAlign={'center'}
							top={AppMargin._40}
							fontFamily={Fonts.REGULAR}
							color={Colors.secondary}
						/>


						{this.state.pickerShow && (
							<CountryPicker
								// theme={DARK_THEME}
								withFilter
								withFlag
								withCallingCode
								onSelect={(country) => {
									this.setState({
										countryName: country.name,
										countryCode: country.callingCode,
										countryFlag: country.cca2
									})
								}}
								onClose={() => this.setState({ pickerShow: false })}
								visible
								withCountryNameButton
							/>
						)}

					</ScrollView>

					<AppButton top={hp(2)} label={`Login`} onClick={this._validateCredentials} />
					<View style={styles.footerText}>
						<AppText fontFamily={Fonts.REGULAR} color={Colors.secondary} label={`Don't have an account?`} />
						<AppText onTextPress={() => { navigation.navigate('RegisterScreen') }} fontFamily={Fonts.REGULAR} color={Colors.primary} label={` Register!`} />
					</View>

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

	orContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: AppMargin._20
	}

});

const mapStatetoProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(LoginScreen);
