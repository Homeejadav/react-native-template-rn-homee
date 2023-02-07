import React, { Component } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppShadow } from '../../constants/commonStyle';

class AppSwitch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			switchAnimation: new Animated.Value(props.value ? 1 : 0),
			value: props.value,
		};
	}

	toggleSwitch = () => {
		const toValue = this.state.value ? 0 : 1;
		Animated.timing(this.state.switchAnimation, {
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
			transform: [
				{
					translateX: this.state.switchAnimation.interpolate({
						inputRange: [0, 1],
						outputRange: [-9, 9],
					}),
				},
			],
		};

		return (
			<View style={{ paddingTop: this.props.top ? this.props.top : 0 }}>
				<TouchableOpacity activeOpacity={1} onPress={this.toggleSwitch}>
					<View style={[styles.switchContainer, { backgroundColor: this.state.value ? Colors.primary : Colors.primaryTransparent }]}>
						<Animated.View style={[styles.switch, animatedStyles, { backgroundColor: this.state.value ? Colors.primary : Colors.placeholder }]} />
						<Animated.View style={[styles.switch, animatedStyles, { backgroundColor: this.state.value ? Colors.snowWhite : Colors.snowWhite, position: 'absolute', justifyContent: 'center', alignItems: 'center' }]}>{/* render inside circle */}</Animated.View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

AppSwitch.defaultProps = {
	value: false,
};

const styles = {
	switchContainer: {
		width: 44,
		height: 25,
		borderRadius: 50,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},

	switch: {
		width: 18,
		height: 18,
		borderRadius: 50,
		...AppShadow,
	},
};

export default AppSwitch;
