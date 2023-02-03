import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets';
import { AppText } from '../../components/Custom';
import { AppMargin } from '../../constants/commonStyle';
import AppIcon from './AppIcon';

class AppHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {

	}


	render() {
		const { label, onIconPress } = this.props;
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={onIconPress} style={styles.container} >
					<AppIcon icon={Icons.icnBack} />
					<AppText left={AppMargin._10} label={label} />
				</TouchableOpacity>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});


export default AppHeader;
