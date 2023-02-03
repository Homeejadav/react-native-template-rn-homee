import { actionCreators } from '@actions';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Colors } from '../../constants/colors';
import { AppHeight, AppWidth } from '../../constants/commonStyle';
import AppText from './AppText';

class AppButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	_buttonStyle = () => {
		const { width, bottom } = this.props;
		return {
			width: width ? width : AppWidth._100pr,
			height: AppHeight._60,
			borderRadius: 50,
			bottom: bottom ? bottom : 0,
			justifyContent: 'center',
			alignItems: 'center',
		}
	}

	render() {
		const { label, fontsize, onClick, containerStyle, top, fontFamily } = this.props;
		return (
			<View style={[containerStyle, { marginTop: top ? top : 0 }]}>
				<TouchableOpacity activeOpacity={0.5} onPress={onClick}>
					{/* linear gredient pattern from left to right */}
					{/* start={{ x: 0, y: 0.90 }} end={{ x: 1, y: 0.10 }} */}
					<LinearGradient style={this._buttonStyle()} colors={Colors.gredient}>
						{this.props.isLoading ?
							<Spinner size={22} type={'Circle'} color={Colors.snowWhite} />
							: <AppText fontFamily={fontFamily} fontsize={fontsize} color={Colors.snowWhite} label={label} />}
					</LinearGradient>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStatetoProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(AppButton);
