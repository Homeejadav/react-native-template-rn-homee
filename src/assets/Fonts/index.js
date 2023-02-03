import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 326;

function normalize(size) {
	const newSize = size * scale
	if (Platform.OS === 'ios') {
		return Math.round(PixelRatio.roundToNearestPixel(newSize))
	} else {
		return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
	}
}

export const Fonts = {
	REGULAR: 'Poppins-Regular',
	MEDIUM: 'Poppins-Medium',
	BOLD: 'Poppins-Bold'
}

export const FontSize = {
	_33: normalize(33),
	_32: 32,
	_30: 30,
	_28: 28,
	_26: 26,
	_25: 25,
	_24: 24,
	_23: 23,
	_22: 22,
	_21: 21,
	_20: 20,
	_18: 18,
	_16: 16,
	_15: 15,
	_14: 14,
	_13: 13,
	_12: 12,
	_11: 11,
	_10: 10,
}