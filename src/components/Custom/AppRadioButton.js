import React, { Component } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppPadding } from '../../constants/commonStyle';

class AppRadioButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checkboxAnimation: new Animated.Value(props.value ? 1 : 0),
			value: props.value,
		};
	}

	toggleCheckbox = () => {
		const toValue = this.state.value ? 0 : 1;
		Animated.timing(this.state.checkboxAnimation, {
			toValue,
			duration: 150,
			useNativeDriver: true,
		}).start(() => {
			this.setState({ value: !this.state.value });
			if (this.props.onValueChange) {
				this.props.onValueChange();
			}
		});
	};

	render() {
		const animatedStyles = {
			backgroundColor: Colors.primary,
			transform: [
				{
					scale: this.state.checkboxAnimation.interpolate({
						inputRange: [0, 4],
						outputRange: [0, 4],
					}),
				},
			],
		};
		return (
			<View style={{ paddingTop: this.props.top ? this.props.top : 0 }}>
				<TouchableOpacity activeOpacity={1} style={styles.container} onPress={this.toggleCheckbox}>
					<Animated.View style={[styles.checkbox, animatedStyles]} />
				</TouchableOpacity>
			</View>
		);
	}
}

AppRadioButton.defaultProps = {
	color: Colors.snowWhite,
	value: false,
};

const styles = {
	container: {
		height: 24,
		width: 24,
		justifyContent: 'center',
		alignItems: 'center',
		padding: AppPadding._10,
		borderWidth: 2,
		borderColor: Colors.primary,
		borderRadius: 100,
	},

	checkbox: {
		width: 12,
		height: 12,
		borderRadius: 100,
	},
};

export default AppRadioButton;
