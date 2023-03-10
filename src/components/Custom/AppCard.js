import { actionCreators } from '@actions';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts } from '../../assets';
import { AppDivider, AppText } from '../../components/Custom';
import { Colors } from '../../constants/colors';
import { AppHeight, AppMargin, AppPadding, borderRadius5 } from '../../constants/commonStyle';

class AppCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	render() {
		const { image, title, subTitle, onCardPress } = this.props;
		return (
			<TouchableOpacity onPress={onCardPress} disabled={!onCardPress} style={styles.container}>
				<Image style={styles.imageStyle} source={{ uri: image } || image} />
				<AppDivider />
				{title && <AppText fontFamily={Fonts.MEDIUM} label={title} />}
				{subTitle && <AppText fontFamily={Fonts.MEDIUM} label={subTitle} top={AppMargin._10} />}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: AppPadding._10,
		borderWidth: 2,
		borderColor: Colors.primaryTransparent,
		...borderRadius5,
	},
	imageStyle: {
		height: AppHeight._250,
		width: '100%',
		...borderRadius5,
	}
});

const mapStatetoProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(AppCard);
