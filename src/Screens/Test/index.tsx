import React, { useEffect } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { name as AppName } from '../../../app.json';
import { Fonts } from '../../assets/fonts';
import AppText from '../../components/AppText';
import MainContainer from '../../components/MainContainer';
import { AppDispatch } from '../../store';

declare function alert(message: string): void;

interface testProps {
	navigation: any
}
const test = (props: testProps) => {

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { return true });
		const unsubscribe = props.navigation.addListener('focus', () => {

		});

		return () => {
			backHandler.remove();
			unsubscribe();
		}
	}, [dispatch, props.navigation]);

	return (
		<MainContainer>
			<View style={styles.container}>
				<AppText fontFamily={Fonts.BOLD} title={AppName} />
			</View>
		</MainContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 20,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default test;