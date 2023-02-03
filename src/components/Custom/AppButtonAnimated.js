import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Animated, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';

class AppButtonAnimated extends Component {

	animation = new Animated.Value(1);

	pressIn = () => {
		Animated.spring(this.animation, {
			toValue: 0.8,
			useNativeDriver: true,
		}).start();
	};

	pressOut = () => {
		Animated.spring(this.animation, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	render() {
		const buttonStyle = {
			transform: [{ scale: this.animation }],
		};

		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPressIn={this.pressIn} onPressOut={this.pressOut}>
					<Animated.View style={[styles.button, buttonStyle]}>
						<Text style={styles.text}>Resend</Text>
					</Animated.View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {

		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		padding: 20,
		borderRadius: 5,
	},
	text: {
		color: Colors.primary,
		fontWeight: 'bold',
	},
});

export default AppButtonAnimated;
