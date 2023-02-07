import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import { Icons } from '../../assets';

const startRotationAnimation = (durationMs, rotationDegree) => {
	Animated.loop(
		Animated.timing(rotationDegree, {
			toValue: 360,
			duration: durationMs,
			easing: Easing.linear,
			useNativeDriver: true,
		})
	).start();
};

class AppLoader extends Component {
	rotationDegree = new Animated.Value(0);
	componentDidMount() {
		startRotationAnimation(this.props.durationMs || 2000, this.rotationDegree);
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={styles.container} accessibilityRole="progressbar">
					<Animated.Image
						source={Icons.icnLoading}
						style={[styles.progress, {
							transform: [{
								rotateY: this.rotationDegree.interpolate({
									inputRange: [0, 360],
									outputRange: ['0deg', '360deg']
								})
							}
							]
						}
						]}
					/>
				</View>
			</View>
		);
	}
}

const height = 28;

const styles = {
	container: {
		width: height,
		height: height,
		justifyContent: 'center',
		alignItems: 'center'
	},
	background: {
		width: '100%',
		height: '100%',
		borderRadius: height / 2,
		borderWidth: 4,
		opacity: 0.25
	},
	progress: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		tintColor: 'white'
	}
};

export default AppLoader;
