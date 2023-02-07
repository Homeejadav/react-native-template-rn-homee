import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Fonts, FontSize } from '../../assets';
import { Colors } from '../../constants/colors';

class AppText extends React.Component {
	_textStyles = () => {
		const {
			fontSize,
			color,
			letterSpacing,
			fontFamily,
			top,
			left,
			goRight,
			center,
			bottom,
			hz,
			textAlign,
		} = this.props;

		return {
			alignSelf: goRight ? 'flex-end' : center ? 'center' : 'flex-start',
			fontFamily: fontFamily ? fontFamily : Fonts.REGULAR,
			fontSize: fontSize ? fontSize : FontSize._14,
			color: color ? color : Colors.primary,
			marginTop: top ? top : 0,
			marginBottom: bottom ? bottom : 0,
			marginLeft: left ? left : 0,
			includeFontPadding: false,
			textAlign: textAlign ? textAlign : null,
			paddingHorizontal: hz ? hz : 0,
			letterSpacing: letterSpacing ? letterSpacing : null,
		};
	};

	render() {
		const { label, indexKey, onTextPress, flex } = this.props;
		return (
			<TouchableOpacity
				style={[
					{
						flex: flex ? flex : 0,
					},
					{
						justifyContent: 'center',
					},
				]}
				disabled={!onTextPress}
				onPress={onTextPress}
			>
				<Text key={indexKey} style={this._textStyles()}>
					{label}
				</Text>
			</TouchableOpacity>
		);
	}
}

export default AppText;
