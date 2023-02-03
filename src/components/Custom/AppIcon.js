import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';

class AppIcon extends Component {
	render() {
		const { icon, onIconPress, tint, style } = this.props;
		return (
			<TouchableOpacity style={style} onPress={onIconPress} disabled={!onIconPress}>
				<Image style={{ tintColor: tint ? tint : Colors.primary }} source={icon} />
			</TouchableOpacity>
		);
	}
}

export default AppIcon;
