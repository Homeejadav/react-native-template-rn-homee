import { actionCreators } from '@actions';
import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppSafeView, AppText } from '../../components/Custom';
import AppCard from '../../components/Custom/AppCard';
import AppHeader from '../../components/Custom/AppHeader';
import { AppContainer, AppMargin } from '../../constants/commonStyle';
import { t } from '../../services/localize';

class DetailsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			details: this?.props?.route?.params?.item
		};
	}

	componentDidMount() {
		console.log(this.state.details);
		BackHandler.addEventListener('hardwareBackPress', () => { return true });
		this._unsubscribe = this.props.navigation.addListener('focus', () => {

		});
	}

	componentWillUnmount() {
		this._unsubscribe();
	}

	render() {
		const { navigation } = this.props;
		const { details } = this.state;

		const dummyData = [
			{
				id: '1',
				label: 'username',
				value: details.login.username
			},
			{
				id: '2',
				label: 'gender',
				value: details.gender
			},
			{
				id: '3',
				label: 'mobileno',
				value: details.cell
			},
			{
				id: '4',
				label: 'country',
				value: details.location.country
			}
		]

		return (
			<AppSafeView>
				<View style={AppContainer}>
					<AppHeader onIconPress={() => { navigation.goBack() }} label={'Back'} />
					<View style={styles.itemContainer}>
						<AppCard
							image={details.picture.large}
							title={details.email}
						/>

						{dummyData.map((item, index) => {
							return (
								<View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
									<AppText label={t(item.label)} />
									<AppText label={item.value} />
								</View>
							)
						})}


					</View>
				</View>
			</AppSafeView>
		);
	}
}


const styles = StyleSheet.create({
	itemContainer: {
		flex: 1,
		marginTop: AppMargin._20
	}
});

const mapStatetoProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(DetailsScreen);
