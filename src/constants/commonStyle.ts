import { Dimensions } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

const AppShadow = {
	shadowColor: "#000",
	shadowOffset: { width: 0, height: 2 },
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	elevation: 5
}

const borderRadius5 = {
	borderRadius: 5
}

const AppMargin = {
	_5: hp(0.5),
	_10: hp(1),
	_15: hp(1.5),
	_20: hp(2),
	_30: hp(3),
	_40: hp(4),
	_50: hp(5),
	_75: hp(7.5),
	_100: hp(10)
}

const AppPadding = {
	...AppMargin
}

const AppHeight = {
	_50: hp(5),
	_60: hp(6),
	_70: hp(7),
	_80: hp(8),
	_90: hp(9),
	_100: hp(10),
	_150: hp(15),
	_200: hp(20),
	_250: hp(25),
	_300: hp(30),
	_350: hp(35),
}

const AppWidth = {
	_50pr: '50%',
	_75pr: '75%',
	_100pr: '100%',

	_50: wp(5),
	_60: wp(6),
	_70: wp(7),
	_80: wp(8),
	_90: wp(9),
	_100: wp(10),
	_150: wp(15),
	_200: wp(20),
	_250: wp(25),
	_300: wp(30),
	_350: wp(35),
}

const ButtonEnd = {
	justifyContent: 'flex-end',
	flex: 1
}

const AppContainer = {
	flex: 1,
	marginHorizontal: AppMargin._20,
}

const AllCenter = {
	justifyContent: 'center',
	alignItems: 'center'
}

const ButtonFlexContainer = {
	flex: 1,
	justifyContent: 'flex-end'
}

export {
	AllCenter,
	AppContainer,
	AppHeight,
	AppMargin,
	AppPadding,
	AppShadow,
	AppWidth,
	ButtonEnd,
	ButtonFlexContainer,
	WindowHeight,
	WindowWidth,
	borderRadius5
};
