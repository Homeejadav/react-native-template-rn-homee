import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';
import AppSafeView from '../../components/Custom/AppSafeView';
import { Colors } from '../../constants/colors';

class AnimatedProgressBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: new Animated.Value(0),
		};
	}

	componentDidMount() {
		Animated.timing(this.state.progress, {
			toValue: this.props.progress,
			duration: 1000,
			useNativeDriver: false
		}).start();
	}

	render() {
		const { progress } = this.state;
		return (
			<AppSafeView>
				<View style={{ flexDirection: 'row', backgroundColor: Colors.background }}>
					<Text >Hiiii</Text>
				</View>
			</AppSafeView>
		);
	}
}

export default AnimatedProgressBar;
