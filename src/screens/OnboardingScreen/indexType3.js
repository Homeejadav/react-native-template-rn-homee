import React from 'react';
import {
	Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { Fonts, Icons } from '../../assets';
import AppIcon from '../../components/Custom/AppIcon';
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
					<View style={{ flexDirection: 'row', borderRadius: 50, overflow: 'hidden' }}>
						{data.map((_, index) => (
							<View key={index}
								style={[styles.indicator,
								currentSlideIndex == index && {
									backgroundColor: Colors.primary,
									width: width / data.length / 2,
									borderRadius: 50
								}]}
							/>
						))}
					</View>
				</View>

				{/* Render buttons */}
				<View style={{ marginBottom: 50, alignItems: 'center' }}>
					<TouchableOpacity
						onPress={currentSlideIndex == data.length - 1 ?
							() => navigation.replace('LoginScreen') : goToNextSlide}
						style={styles.containerNext}>
						<AppIcon
							tint={Colors.snowWhite}
							icon={Icons.icnBack}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.snowWhite }}>
			<View style={{ marginHorizontal: 40, marginTop: 20, alignItems: 'flex-end' }}>
				<AppText fontFamily={Fonts.MEDIUM} color={Colors.secondary} onTextPress={skip} label={'Skip'} />
			</View>
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
		height: 5,
		width: width / data.length / 2,
		backgroundColor: Colors.primaryTransparent,
		// marginHorizontal: 5,
		// borderRadius: 50,
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
	},

	containerNext: {
		height: 75,
		width: 75,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		transform: [{ rotate: '180deg' }]
	},

});

export default OnboardingScreen;