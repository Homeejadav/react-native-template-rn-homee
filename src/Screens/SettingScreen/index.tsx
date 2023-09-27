import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '../../components/AppText';
import MainContainer from '../../components/MainContainer';
import { AppMargin, AppPadding } from '../../constants/commonStyle';
import { settings } from '../../constants/string';
import { useTheme } from '../../theme/ThemeProvider';
import { useThemeControl } from '../../theme/themeControl';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setLocalize } from '../../store/reducers/commonData.slice';

interface SettingScreenProps {
	navigation: any;
}

const SettingScreen = (props: SettingScreenProps) => {
	const dispatch: AppDispatch = useDispatch();
	const { setDarkMode, setLightMode, setDefaultTheme } = useThemeControl();
	const { Colors, isDarkMode } = useTheme();
	const styles = createStyles(Colors);

	const handleSettings = (itemTitle: string) => {
		// Define types for themeActions and localizeActions || Any Other
		type ThemeActions = { [key: string]: () => void };
		type LocalizeActions = { [key: string]: () => void };
		const themeActions: ThemeActions = {
			'Default Theme': setDefaultTheme,
			'Dark Theme': setDarkMode,
			'Light Theme': setLightMode,
		};
		const localizeActions: LocalizeActions = {
			'English': () => dispatch(setLocalize('en')),
			'Japanese': () => dispatch(setLocalize('jp')),
		};
		themeActions[itemTitle]?.();
		localizeActions[itemTitle]?.();
	};

	const renderSettings = ({ item }: any) => (
		<View style={{ paddingVertical: AppPadding._20, flex: 1 }}>
			<AppText textColor={Colors.primary} label={item.title} />
			<View style={{ marginVertical: AppMargin._20, height: 1, backgroundColor: Colors.primary }} />
			<FlatList
				data={item.value}
				keyExtractor={(subItem) => subItem.id.toString()}
				ItemSeparatorComponent={() => <View style={{ marginVertical: AppMargin._5 }} />}
				renderItem={({ item: subItem }) => (
					<TouchableOpacity
						onPress={() => handleSettings(subItem.title)}
						style={{ padding: 20, backgroundColor: Colors.primaryTransparent }}>
						<AppText textColor={Colors.text} label={subItem.title} />
					</TouchableOpacity>
				)}
			/>
		</View>
	);

	return (
		<MainContainer>
			<View style={{ marginHorizontal: 20, flex: 1 }}>
				<FlatList
					data={settings}
					contentContainerStyle={styles.flatListContainer}
					keyExtractor={(item, index) => item.id + index.toString()}
					renderItem={renderSettings}
				/>
			</View>
		</MainContainer>
	);
};

const createStyles = (Colors: any) => {
	return StyleSheet.create({
		flatListContainer: {
			paddingBottom: AppMargin._75,
			justifyContent: 'space-between',
		},
	});
};

export default SettingScreen;
