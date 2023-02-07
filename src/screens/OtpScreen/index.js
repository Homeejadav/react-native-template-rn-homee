import { actionCreators } from '@actions';
import React from 'react';
import { BackHandler, Image, Keyboard, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts, FontSize, Images } from '../../assets';
import { AppButton, AppSafeView, AppText } from '../../components/Custom';
import AppOtpView from '../../components/Custom/AppOtpView';
import { Colors } from '../../constants/colors';
import { AppContainer, AppHeight, AppMargin, AppWidth } from '../../constants/commonStyle';

class OtpScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			otpInput: '',
			timeLeft: 12,
			showTimer: true,
			linkDisable: true
		};
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => { return true });
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
		});
		this.startCountdown();
	}

	componentWillUnmount() {
		this._unsubscribe();
		clearInterval(this.intervalId);
	}

	startCountdown = () => {
		this.intervalId = setInterval(() => {
			this.setState(({ timeLeft }) => {
				if (timeLeft === 0) {
					clearInterval(this.intervalId);
					this.resetCountdown()
					return { timeLeft: 0 };
				}
				return { timeLeft: timeLeft - 1 };
			});
		}, 1000);
	};

	resetCountdown = () => {
		clearInterval(this.intervalId);
		this.setState({ timeLeft: 12 });
		this.startCountdown();
	};

	_showToast(msg, type = 'error') {
		Toast.show({ type, text1: msg })
	}

	_validateCredentials = () => {
		Keyboard.dismiss();
		const { mobileNo } = this.state;
		const mob = mobileNo ? mobileNo.toString().trim() : '';
		switch (true) {
			case !mob: this._showToast('Enter Mobile number'); break;
			case mob.length !== 10: this._showToast('Enter valid Mobile number'); break;
			default: {
				this.props.navigation.navigate('BottomTab')
				this._showToast('Login Success', 'success')
			}; break;
		}
	};

	render() {
		const { navigation } = this.props;
		return (
			<AppSafeView>
				<View style={AppContainer}>

					<View style={{ marginVertical: AppMargin._40 }}>
						<AppText fontFamily={Fonts.BOLD} fontSize={FontSize._32} label={`Enter OTP`} />
						<AppText fontFamily={Fonts.REGULAR} color={Colors.secondary} label={`Enter OTP Sent on Mobile Number\n+1 878XXXXX98`} />
					</View>

					<ScrollView bounces={false} showsVerticalScrollIndicator={false} >
						<AppOtpView
							inputCount={4}
							handleTextChange={(text) =>
								this.setState({ otpInput: text })}
						/>

						<View style={{ marginTop: AppMargin._20, alignItems: 'center' }}>
							<AppText label={`Resend OTP in 00:${this.state.timeLeft} Sec`} />
						</View>

						<Image style={{ height: AppHeight._250, width: AppWidth._100pr, marginTop: AppMargin._40 }} resizeMode='contain' source={Images.imgDemo7} />
					</ScrollView>

					<AppButton isLoading={true} top={hp(2)} label={`Submit`} onClick={() => { alert(this.state.otpInput) }} />

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

const mapDispatchToProps = dispatch =>
	bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(OtpScreen);
