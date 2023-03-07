import React, { Component } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppShadow } from '../../constants/commonStyle';

class AppSwitch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			switchAnimation: new Animated.Value(props.value ? 1 : 0),
			bgColorAnimation: new Animated.Value(props.value ? 1 : 0),
			value: props.value,
		};
	}

	toggleSwitch = () => {
		const toValue = this.state.value ? 0 : 1;
		Animated.parallel([
			Animated.timing(this.state.switchAnimation, { toValue, duration: 150, useNativeDriver: true }),
			Animated.timing(this.state.bgColorAnimation, { toValue, duration: 150, useNativeDriver: false }),
		]).start(() => {
			this.setState({ value: !this.state.value });
			if (this.props.onValueChange) {
				this.props.onValueChange();
			}
		});
	};

	render() {
		const animatedSwitchStyles = {
			transform: [{
				translateX: this.state.switchAnimation.interpolate({
					inputRange: [0, 1], outputRange: [-9, 9],
				}),
			}],
		};

		const bgColorInterpolation = this.state.bgColorAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [Colors.primaryTransparent, Colors.primary],
		});

		return (
			<View style={{ paddingTop: this.props.top ? this.props.top : 0 }}>
				<TouchableOpacity activeOpacity={1} onPress={this.toggleSwitch}>
					<Animated.View style={[styles.switchContainer, { backgroundColor: bgColorInterpolation }]}>
						<Animated.View
							style={[
								animatedSwitchStyles,
								styles.switch,
								{
									backgroundColor: this.state.value ? Colors.snowWhite : Colors.snowWhite,
									position: 'absolute', justifyContent: 'center', alignItems: 'center'
								},
							]}
						>
							{/* render inside circle */}
							<View style={{ backgroundColor: Colors.primary, padding: 5, borderRadius: 100 }} />
						</Animated.View>
					</Animated.View>
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
		backgroundColor: Colors.primaryTransparent,
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
