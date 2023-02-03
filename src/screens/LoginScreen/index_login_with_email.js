import { actionCreators } from '@actions';
import React from 'react';
import { BackHandler, Image, Keyboard, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts, FontSize, Icons, Images } from '../../assets';
import { AppButton, AppDivider, AppSafeView, AppText, AppTextInput } from '../../components/Custom';
import { Colors } from '../../constants/colors';
import { AppContainer, AppHeight, AppMargin, AppWidth } from '../../constants/commonStyle';
import { validEmail, validPasswordChar, validPasswordLength, validPasswordSpecial } from '../../constants/utils';

class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPassword: false,
			emailAddress: '',
			password: ''
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
		const { emailAddress, password } = this.state;
		const email = emailAddress ? emailAddress.toString().trim() : '';
		const pass = password ? password.toString().trim() : '';
		switch (true) {
			case !email: this._showToast('Enter email address'); break;
			case !validEmail(email): this._showToast('Enter valid Email address'); break;
			case !pass: this._showToast('Enter password'); break;
			case !validPasswordLength(pass): this._showToast('The password must be at least 8 characters long'); break;
			case !validPasswordChar(pass): this._showToast('The password must contain one uppercase, one lowercase'); break;
			case !validPasswordSpecial(pass): this._showToast('The password must contain one special character'); break;
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

						<View>
							<AppTextInput
								type={1}
								placeholder={'Email Address'}
								value={this.state.emailAddress}
								onChangeText={(text) => this.setState({ emailAddress: text })}
								icon={Icons.icnEmail}
							/>

							<AppTextInput
								type={1}
								placeholder={'Password'}
								icon={Icons.icnPassword}
								value={this.state.password}
								onChangeText={(text) => this.setState({ password: text })}
								secureTextEntry={!this.state.showPassword}
								showEye={true}
								onEyePress={() => { this.setState({ showPassword: !this.state.showPassword }) }}
								show={this.state.showPassword}
							/>
						</View>

						<AppText
							goRight
							top={AppMargin._20}
							label={'Forgot password?'}
							onTextPress={() => alert('forgot password')}
						/>

						<View style={styles.orContainer}>
							<AppDivider width={'30%'} />
							<AppText hz={AppMargin._10}
								fontFamily={Fonts.REGULAR}
								color={Colors.secondary}
								label={`OR`}
							/>
							<AppDivider width={'30%'} />
						</View>

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
