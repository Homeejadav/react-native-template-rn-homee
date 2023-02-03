import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/colors';

class AppDivider extends Component {
	render() {
		const { width } = this.props;
		return (
			<View key={this.props.indexKey} style={[styles.Seperator, { width: width ? width : '100%' }]} />
		);
	}
}

const styles = StyleSheet.create({

	Seperator: {
		marginTop: 20,
		marginBottom: 20,
		width: '100%',
		height: 1,
		backgroundColor: Colors.secondary,
		opacity: 0.2,
	},

});

export default AppDivider;
