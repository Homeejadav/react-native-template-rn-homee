import React, { Component } from 'react';
import { Animated, Image, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets';
import { Colors } from '../../constants/colors';

class AppFavoriteButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			AppFavoriteButtonAnimation: new Animated.Value(props.value ? 1 : 0),
			value: props.value,
		};
	}

	toggleAppFavoriteButton = () => {
		const toValue = this.state.value ? 0 : 1;
		Animated.timing(this.state.AppFavoriteButtonAnimation, {
			toValue,
			duration: 150,
			useNativeDriver: true
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
					scale: this.state.AppFavoriteButtonAnimation.interpolate({
						inputRange: [0, 4],
						outputRange: [0, 4],
					})
				},
			],
			backgroundColor: this.props.color,
		};

		return (
			<View style={{ paddingTop: this.props.top ? this.props.top : 0 }}>
				<TouchableOpacity activeOpacity={1} style={styles.container} onPress={this.toggleAppFavoriteButton}>
					<Image resizeMode={'contain'} source={Icons.icnFavorite} style={[styles.AppFavoriteButton]} />
					<Animated.Image resizeMode={'contain'} source={Icons.icnFavoriteFill} style={[styles.AppFavoriteButton, animatedStyles, { position: 'absolute', tintColor: this.props.value ? 'red' : Colors.primary }]} />
				</TouchableOpacity>
			</View>
		);
	}
}

AppFavoriteButton.defaultProps = {
	color: Colors.snowWhite,
	value: false,
};

const styles = {
	container: {
		height: 24,
		width: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},

	AppFavoriteButton: {
		tintColor: Colors.primary,
	},
};

export default AppFavoriteButton;
