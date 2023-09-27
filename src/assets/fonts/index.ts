import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 375;

function normalize(size: number): number {
  const newSize = size * scale;
  const roundedSize = Platform.OS === 'ios'
	? Math.round(PixelRatio.roundToNearestPixel(newSize))
	: Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  return roundedSize;
}

  const iosFonts = {
	REGULAR: 'Poppins-Regular',
	MEDIUM: 'Poppins-Medium',
	BOLD: 'Poppins-Bold'
  };

  const androidFonts = {
	REGULAR: 'Poppins-Regular',
	MEDIUM: 'Poppins-Medium',
	BOLD: 'Poppins-Bold'
  };

  export const Fonts = {
	...(Platform.OS === 'ios' ? iosFonts : androidFonts),
  };

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
};
