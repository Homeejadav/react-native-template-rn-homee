import React, { FC, useEffect, useRef, useState } from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from "react-native";
import { FontSize, Fonts } from "../assets/fonts";
import AppText from "./AppText";
import { useTheme } from '../theme/ThemeProvider';
import { Theme } from "../theme/AppColors";

interface AppOtpViewProps {
	defaultValue?: string;
	inputCount?: number;
	inputCellLength?: number;
	containerStyle?: any; // You can replace 'any' with a more specific type if needed
	textInputStyle?: any; // You can replace 'any' with a more specific type if needed
	handleTextChange?: (text: string) => void;
	keyboardType?: KeyboardTypeOptions | undefined;
}

const AppOtpView: FC<AppOtpViewProps> = ({
	defaultValue = "",
	inputCount = 4,
	inputCellLength = 1,
	containerStyle = {},
	textInputStyle = {},
	handleTextChange = () => { },
	...textInputProps
}) => {
	const { Colors, isDarkMode } = useTheme();
	const styles = createStyles(Colors);
	const [focusedInput, setFocusedInput] = useState<number>(0);
	const [otpText, setOtpText] = useState<string[]>(
		Array.from({ length: inputCount }, () => "")
	);
	const inputs = useRef<TextInput[]>([]);

	const basicValidation = (text: string) => {
		const validText = /^[0-9]+$/;
		return text.match(validText);
	};

	useEffect(() => {
		// Handle text change here and join the otpText array
		handleTextChange(otpText.join(""));
	}, [otpText, handleTextChange]);

	const onTextChange = (text: string, i: number) => {
		if (text && !basicValidation(text)) {
			return;
		}

		// Update the state with the new value
		setOtpText((prevOtpText) => {
			const newOtpText = [...prevOtpText];
			newOtpText[i] = text;
			console.log("##----->> OTP", newOtpText);
			return newOtpText;
		});

		// Focus on the next input if available
		if (text.length === inputCellLength && i < inputCount - 1) {
			inputs.current[i + 1]?.focus();
		}
	};

	const onInputFocus = (i: number) => {
		setFocusedInput(i);
	};

	const onKeyPress = (e: any, i: number) => {
		const val = otpText[i] || "";
		if (e.nativeEvent.key === "Backspace" && i !== 0 && !val.length) {
			inputs.current[i - 1]?.focus();
		}
	};

	return (
		<View>

			<AppText fontFamily={Fonts.REGULAR} label={`please enter the OTP we've sent to your mobile / email`} />

			<View style={[styles.container, containerStyle]}>
				{Array.from({ length: inputCount }, (_, i) => (
					<TextInput
						// placeholder="-"
						placeholderTextColor={Colors.secondaryTransparent}
						key={i}
						ref={(ref) => (inputs.current[i] = ref as TextInput)}
						autoCorrect={false}
						keyboardType={"numeric"}
						autoFocus={i === 0}
						value={otpText[i]}
						style={[styles.textInput, textInputStyle, otpText[i] || focusedInput === i ? { borderWidth: 1 } : null]}
						maxLength={inputCellLength}
						onFocus={() => onInputFocus(i)}
						onChangeText={(text) => onTextChange(text, i)}
						multiline={false}
						onKeyPress={(e) => onKeyPress(e, i)}
						{...textInputProps}
					/>
				))}
			</View>
		</View>
	);
};

const createStyles = (Colors: Theme) => {
	return StyleSheet.create({
		container: {
			flexDirection: "row",
			paddingTop: 20,
		},

		textInput: {
			width: 40,
			height: 40,
			marginRight: 10,
			includeFontPadding: false,
			color: Colors.primary,
			backgroundColor: Colors.placeholder,
			borderColor: Colors.primary,
			textAlign: "center",
			fontFamily: Fonts.BOLD,
			fontSize: FontSize._18,
		},
	});
};

export default AppOtpView;
