import { actionCreators } from '@actions';
import React from 'react';
import { BackHandler, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts } from '../../assets';
import { AppSafeView, AppText } from '../../components/Custom';
import AppDivider from '../../components/Custom/AppDivider';
import { AppContainer, AppPadding } from '../../constants/commonStyle';
import { GET_USER } from '../../services/API/endpoints';
import { APIMethods } from '../../services/API/methods';
import { t } from '../../services/localize';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			serviceData: []
		};
	}

	_getRecentRelease = () => {
		this.setState({ isLoading: true });
		let recentRelease = APIMethods.get(GET_USER, '', '')
			.then((response) => {
				var data = response.data
				console.log('results --- » ', data.results);
				this.setState({
					serviceData: data.results,
					isLoading: false
				})
			}).catch((err) => {
				console.error(err)
			});
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => { return true });
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this._getRecentRelease()
		});
	}

	componentWillUnmount() {
		this._unsubscribe();
	}

	render() {
		const { navigation } = this.props;

		return (
			<AppSafeView>
				<View style={[AppContainer]}>
					<AppText fontFamily={Fonts.BOLD} label={t('title')} />

					<ScrollView showsVerticalScrollIndicator={false} bounces={false}>
						{this.state.serviceData &&
							this.state.serviceData.length > 0 &&
							<FlatList
								data={this.state.serviceData}
								keyExtractor={(item, index) => { return item.id, index }}
								style={{ paddingTop: AppPadding._20, paddingBottom: AppPadding._50 }}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								bounces={true}
								scrollEnabled={false}
								contentContainerStyle={{ paddingBottom: AppPadding._50 }}
								ItemSeparatorComponent={(index) => <AppDivider indexKey={index} />}
								renderItem={({ item, index }) => (
									<View>
										<AppText
											label={`${item.name.first} ${item.name.last}`}
											onTextPress={() => { navigation.navigate('DetailsScreen', { item: item }) }}
											indexKey={index}
										/>

										<AppText
											label={item.email}
											onTextPress={() => { navigation.navigate('DetailsScreen', { item: item }) }}
											indexKey={index}
										/>
									</View>
								)}
							/>}
					</ScrollView>
				</View>
			</AppSafeView>
		);
	}
}


const styles = StyleSheet.create({
});

const mapStatetoProps = state => {
	return {
		init: state.initReducer.init,
		firstname: state.userData.firstname,
		localize: state.initReducer.localize,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen);
