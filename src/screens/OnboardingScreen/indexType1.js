import React from 'react';
import {
	Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { Fonts } from '../../assets';
import AppButton from '../../components/Custom/AppButton';
import AppText from '../../components/Custom/AppText';
import { Colors } from '../../constants/colors';
import { AppWidth } from '../../constants/commonStyle';
import { data } from './data';
import { t } from '../../services/localize';

const { width, height } = Dimensions.get('window');

const SKIP = `Skip`
const NEXT = `Next`
const EXPLORE = `Explore!`

const Slide = ({ item }) => {
	return (
		<View style={{ alignItems: 'center', width: width, }}>
			<View style={{ marginTop: 20 }}>
				<Text style={styles.title}>{`${t(item?.title)}`}</Text>
			</View>
			<Image source={item?.image} style={{ height: '65%', width, resizeMode: 'contain' }} />
			<Text style={styles.subtitle}>{`${t(item?.subtitle)}`}</Text>
		</View>
	);
};

const OnboardingScreen = ({ navigation }) => {

	const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
	const ref = React.useRef();

	const updateCurrentSlideIndex = e => {
		const contentOffsetX = e.nativeEvent.contentOffset.x;
		const currentIndex = Math.round(contentOffsetX / width);
		setCurrentSlideIndex(currentIndex);
	};

	const goToNextSlide = () => {
		const nextSlideIndex = currentSlideIndex + 1;
		if (nextSlideIndex != data.length) {
			const offset = nextSlideIndex * width;
			ref?.current.scrollToOffset({ offset });
			setCurrentSlideIndex(currentSlideIndex + 1);
		}
	};

	const skip = () => {
		const lastSlideIndex = data.length - 1;
		const offset = lastSlideIndex * width;
		ref?.current.scrollToOffset({ offset });
		setCurrentSlideIndex(lastSlideIndex);
	};

	const Footer = () => {
		return (
			<View style={{
				height: height * 0.25,
				justifyContent: 'space-between',
				paddingHorizontal: 20
			}}>
				{/* Indicator container */}
				<View style={{
					flexDirection: 'row',
					justifyContent: 'center',
					// marginTop: 20
				}}>
					{/* Render indicator */}
					{data.map((_, index) => (
						<View key={index}
							style={[styles.indicator,
							currentSlideIndex == index && {
								backgroundColor: Colors.primary,
								width: 10,
								// width: 25,

							}, {
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 2,
								},
								shadowOpacity: 0.25,
								shadowRadius: 3.84,
								elevation: 5,
							}]}
						/>
					))}
				</View>

				<View style={styles.Divider} />


				{/* Render buttons */}
				<View style={{ marginBottom: 40 }}>

					{currentSlideIndex == data.length - 1 ? (
						<View style={{ height: 50 }}>
							<AppButton onClick={() => navigation.replace('LoginScreen')} containerStyle={{ flex: 1 }} fontFamily={Fonts.MEDIUM} label={EXPLORE} color={Colors.snowWhite} />
						</View>
					) : (
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity onPress={skip} activeOpacity={0.5}
								style={[styles.btn, {
									borderColor: Colors.secondary,
									borderWidth: 1,
									backgroundColor: 'transparent',
								}]}>
								<AppText color={Colors.secondary} fontFamily={Fonts.MEDIUM} label={SKIP} />
							</TouchableOpacity>
							<View style={{ width: 15 }} />
							<AppButton onClick={goToNextSlide} containerStyle={{ flex: 1 }} fontFamily={Fonts.MEDIUM} label={NEXT} color={Colors.snowWhite} />
						</View>
					)}

				</View>

			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.snowWhite }}>
			<FlatList
				ref={ref}
				onMomentumScrollEnd={updateCurrentSlideIndex}
				// contentContainerStyle={{ height: height * 0.75, }}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				bounces={false}
				horizontal
				data={data}
				pagingEnabled
				renderItem={({ item }) => <Slide item={item} />}
			/>
			<Footer />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({

	subtitle: {
		fontFamily: Fonts.REGULAR,
		color: Colors.primary,
		fontSize: 13,
		marginTop: 10,
		maxWidth: '70%',
		textAlign: 'center',
		lineHeight: 23,
	},

	title: {
		fontFamily: Fonts.BOLD,
		color: Colors.primary,
		fontSize: 22,
		marginTop: 20,
		textAlign: 'center',
	},

	image: {
		height: '100%',
		width: '100%',
		resizeMode: 'contain',
	},

	indicator: {
		// height: 2.5,
		// width: 10,
		height: 10,
		width: 10,
		backgroundColor: Colors.secondary,
		marginHorizontal: 5,
		borderRadius: 50,
	},

	btn: {
		flex: 1,
		height: 50,
		borderRadius: 50,
		// backgroundColor: Colors.snowWhite,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},

	Divider: {
		height: 1,
		alignSelf: 'center',
		width: AppWidth._75pr,
		backgroundColor: Colors.primaryTransparent,
	}
});

export default OnboardingScreen;