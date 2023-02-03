import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Fonts, Icons } from '../../assets';
import AppIcon from './AppIcon';
import AppText from './AppText';
import AppSafeView from './AppSafeView';
import { AppContainer, AppMargin } from '../../constants/commonStyle';

class AppDropdown extends Component {
	state = {
		modalVisible: false,
		selectedValue: this.props.selectedValue || ''
	};

	showModal = () => {
		this.setState({ modalVisible: true });
	};

	hideModal = () => {
		this.setState({ modalVisible: false });
	};

	onValueChange = (value) => {
		this.setState({ selectedValue: value });
		this.props.onValueChange(value);
	};

	render() {
		const { top, defaultTitle, selectedValue } = this.props;
		return (
			<View style={{ marginTop: top ? top : 0 }}>

				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<AppIcon icon={Icons.icnTranslate} />
					{defaultTitle && <AppText left={AppMargin._10} onTextPress={this.showModal} label={defaultTitle} />}
					{selectedValue && <AppText fontFamily={Fonts.BOLD} left={AppMargin._10} onTextPress={this.showModal} label={this.state.selectedValue} />}
				</View>

				<Modal
					visible={this.state.modalVisible}
					animationType="slide">
					<AppSafeView>
						<View style={AppContainer}>
							<AppText left={AppMargin._10} onTextPress={this.hideModal} label={'Done'} />
							<Picker selectedValue={this.state.selectedValue} onValueChange={this.onValueChange}>
								{this.props.options.map((option) => (
									<Picker.Item
										key={option.value}
										label={option.label}
										value={option.value}
									/>
								))}
							</Picker>
						</View>
					</AppSafeView>
				</Modal>

			</View>
		);
	}
}

export default AppDropdown;
