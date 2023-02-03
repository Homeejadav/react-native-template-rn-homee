import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Fonts, FontSize, Icons } from '../../assets';
import { Colors } from '../../constants/colors';
import { AppHeight, AppMargin, AppPadding } from '../../constants/commonStyle';
import AppIcon from './AppIcon';
import AppText from './AppText';

class AppTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	extraStyle = (type) => {
		switch (type) {

			case 1: return ({
				backgroundColor: 'transparent',
				borderBottomWidth: 1,
				borderBottomColor: Colors.primary
			})

			case 2: return ({
				backgroundColor: 'transparent',
				borderWidth: 1,
				borderColor: Colors.primary
			})

			default:
				break;
		}
	}

	render() {

		const {
			style,
			placeholder,
			value,
			onChangeText,
			defaultValue,
			multiline,
			secureTextEntry,
			editable,
			keyboardType,
			enterKeyHint,
			autoCapitalize,
			autoCorrect,
			icon,
			type,
			onEyePress,
			showEye,
			maxLength,
			letterSpacing,
			countryPickerComponent,
			onPickerShow
		} = this.props;

		return (
			<View style={[styles.container, this.extraStyle(type)]}>
				{icon &&
					<View style={{ opacity: 0.5, width: '10%', justifyContent: 'center', alignItems: 'center' }}>
						<AppIcon icon={icon} />
					</View>}


				{countryPickerComponent &&
					<AppText
						label={`+ ${this.props.countryCode}   |`}
						onTextPress={onPickerShow}
					/>
				}

				<TextInput
					style={
						[style, styles.textInput,
							{
								width: showEye ? '80%' : '90%',
								letterSpacing: letterSpacing ? letterSpacing : null
							}]
					}
					placeholder={placeholder}
					defaultValue={defaultValue}
					value={value}
					maxLength={maxLength}
					placeholderTextColor={Colors.secondary}
					multiline={multiline}
					onChangeText={onChangeText}
					secureTextEntry={secureTextEntry}
					editable={editable}
					keyboardType={keyboardType}
					enterKeyHint={enterKeyHint}
					selectionColor={Colors.primary}
					autoCorrect={autoCorrect}
					autoCapitalize={autoCapitalize}
				/>

				{showEye &&
					<TouchableOpacity onPress={onEyePress} style={{ opacity: 0.5, width: '10%', justifyContent: 'center', alignItems: 'center' }}>
						<AppIcon icon={this.props.show ? Icons.icnHidePassword : Icons.icnShowPassword} />
					</TouchableOpacity>}
			</View>
		)
	}
}

const styles = StyleSheet.create({

	container: {
		flexDirection: 'row',
		paddingHorizontal: AppPadding._10,
		height: AppHeight._60,
		backgroundColor: Colors.placeholder,
		marginTop: AppMargin._20,
		borderRadius: 5,
		alignItems: 'center'
		// padding: AppPadding._15,
		// justifyContent: 'center',
	},

	textInput: {
		width: '90%',
		marginLeft: AppMargin._10,
		includeFontPadding: false, //to remove default font padding in ttf.
		fontFamily: Fonts.REGULAR,
		fontSize: FontSize._14,
		color: Colors.primary
		// flexGrow: 1,
	}

});

export default AppTextInput;
