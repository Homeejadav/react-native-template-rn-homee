import React, { Component } from 'react';
import { Animated, FlatList, LayoutAnimation, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { Fonts, FontSize, Icons } from '../../assets';
import { AppDivider } from '.';
import { Colors } from '../../constants/colors';
import { AppMargin, AppShadow, borderRadius5 } from '../../constants/commonStyle';

UIManager.setLayoutAnimationEnabledExperimental?.(true);

class AppPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			animationValue: new Animated.Value(0),
			selectedOption: null
		};
	}

	toggleBox = () => {
		const toValue = this.state.isOpen ? 0 : 1;
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		Animated.timing(this.state.animationValue, {
			toValue,
			duration: 200,
			useNativeDriver: true
		}).start();
		this.setState({ isOpen: !this.state.isOpen });
	};

	handleSelectOption = (option) => {
		this.toggleBox();
		const { itemKey, itemValue, onSelectOption } = this.props;
		const title = option[itemKey];
		const value = option[itemValue];
		onSelectOption(title, value);
		this.setState({ selectedOption: option });
	};

	_listRenderItem = ({ item }) => {
		const { title, itemKey } = this.props;
		return (
			<TouchableOpacity
				onPress={() => this.handleSelectOption(item)}
				style={{ justifyContent: 'center' }}>
				<Text style={styles.childrenTitle(item, title, itemKey)}>{item[itemKey]}</Text>
			</TouchableOpacity>
		);
	};

	render() {
		const { title, options, top, shadow } = this.props;
		const { isOpen, animationValue } = this.state;
		const rotateAnimation = animationValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['180deg', '270deg']
		});

		return (
			<View style={shadow && { ...AppShadow }}>
				<View style={styles.mainContainer(top)}>
					<TouchableOpacity style={styles.subContainer} onPress={this.toggleBox}>
						<Text style={styles.titleStyle}>{title}</Text>
						<Animated.Image
							style={{
								tintColor: Colors.primary,
								transform: [{ rotate: rotateAnimation }]
							}}
							source={Icons.icnBack}
						/>
					</TouchableOpacity>
					{isOpen && (
						<View style={styles.childrenContainer}>
							<FlatList
								data={options}
								scrollEnabled={false}
								keyExtractor={(item, index) => item.id.toString()}
								ItemSeparatorComponent={() => <AppDivider />}
								renderItem={this._listRenderItem}
							/>
						</View>
					)}
				</View>
			</View>
		);
	}
}

AppPicker.defaultProps = {
	options: [
		{ id: 1, label: 'New York', value: 'NY' },
		{ id: 2, label: 'London', value: 'LDN' },
		{ id: 3, label: 'Tokyo', value: 'TKY' },
		{ id: 4, label: 'Paris', value: 'PRS' },
		{ id: 5, label: 'Berlin', value: 'BRL' },
	]
};

const styles = StyleSheet.create({
	mainContainer: (top) => ({
		top: top,
		borderWidth: 1,
		overflow: 'hidden',
		backgroundColor: Colors.snowWhite,
		borderColor: Colors.primary,
		marginBottom: AppMargin._20,
		...borderRadius5,
	}),
	subContainer: {
		marginHorizontal: 20,
		flexDirection: 'row',
		height: 50,
		alignItems: 'center',
	},
	titleStyle: {
		flexGrow: 1,
		color: Colors.primary,
		fontFamily: Fonts.MEDIUM,
		fontSize: FontSize._16
	},
	childrenContainer: {
		margin: 20,
	},
	childrenTitle: (item, title) => ({
		color: item.label === title ? Colors.primary : Colors.secondary,
		fontFamily: item.label === title ? Fonts.BOLD : Fonts.REGULAR,
		fontSize: FontSize._14
	})
});


export default AppPicker;
