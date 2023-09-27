import React, { useEffect, useState } from 'react';
import { FlatList, Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../assets/fonts';
import AppLoader from '../../components/AppLoader';
import AppText from '../../components/AppText';
import MainContainer from '../../components/MainContainer';
import { AppHeight, AppMargin, AppPadding } from '../../constants/commonStyle';
import { t } from '../../i18n';
import { GET_RECENT } from '../../services/API/endpoints';
import { APIMethods } from '../../services/API/methods';
import { showAlert } from '../../services/UIs/dialogues';
import { AppDispatch } from '../../store';
import { setData } from '../../store/reducers/homeScreen.slice';
import { Theme } from '../../theme/AppColors';
import { useTheme } from '../../theme/ThemeProvider';

declare function alert(message: string): void;

interface HomeScreenProps {
	navigation: any
}

const HomeScreen = (props: HomeScreenProps) => {

	const dispatch: AppDispatch = useDispatch();
	const listData = useSelector((state: any) => state.homeScreen);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { Colors, isDarkMode } = useTheme();
	const styles = createStyles(Colors);

	useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			_getLatestProducts()
		});

		return () => {
			unsubscribe();
		};
	}, [dispatch, props.navigation]);

	const _getLatestProducts = async () => {
		try {
			setIsLoading(true); // show loading indicator regardless of success or error
			const response: any = await APIMethods.get(GET_RECENT, '', []);
			const data = response.data?.data;
			// console.log('API RES | GET_PRODUCTS ------------ >>', data);
			dispatch(setData(data));
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false); // Hide loading indicator regardless of success or error
		}
	};

	const openYoutubeLink = (item: any) => {
		showAlert(item.title, 'Open trailer in YouTube?', () => {
			Linking.openURL(item?.trailer?.url);
		});
	};

	return (
		<MainContainer>
			<View style={{ marginHorizontal: 20, flex: 1 }}>

				<AppText textColor={Colors.primary} fontFamily={Fonts.BOLD} title={`${t('title')} ${listData.userName}`} />

				{isLoading ? (
					<AppLoader isLoading={isLoading} />
				) : (
					<View style={{ flex: 1 }}>

						{listData.items && listData.items.length > 0 &&
							<FlatList
								style={{ flex: 1 }}
								data={listData.items}
								contentContainerStyle={styles.flatListContainer}
								keyExtractor={(item, index) => index.toString()}
								ItemSeparatorComponent={() => <View style={{ marginVertical: AppMargin._10 }} />}
								renderItem={({ item, index }) => {
									return (
										<TouchableOpacity onPress={() => openYoutubeLink(item)}
											style={styles.renderContainer}>
											<AppText label={item.title_english} />
											<Image
												style={{ marginTop: AppMargin._30, height: AppHeight._250, resizeMode: 'cover' }}
												source={{ uri: item?.images?.jpg?.large_image_url }}
											/>
										</TouchableOpacity>
									)
								}}
							/>}

					</View>
				)}
			</View>
		</MainContainer>
	);
};



const createStyles = (Colors: Theme) => {
	return StyleSheet.create({
		renderContainer: {
			padding: 20,
			borderWidth: 1,
			borderColor: Colors.primaryTransparent
		},
		flatListContainer: {
			paddingBottom: AppMargin._75,
			paddingTop: AppPadding._20,
		},
	});
};

export default HomeScreen;