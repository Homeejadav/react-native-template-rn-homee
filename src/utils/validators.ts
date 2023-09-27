// Validate if the input is a valid email format
export const isValidEmail = (text: string): boolean => {
	const emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
	return emailPattern.test(text);
};

// Validate if the input has a minimum length of 8 characters
export const isValidPasswordLength = (text: string): boolean => {
	const passwordLengthPattern: RegExp = /.{8,}/;
	return passwordLengthPattern.test(text);
};

// Validate if the input contains at least one lowercase and one uppercase character
export const isValidPasswordCharacter = (text: string): boolean => {
	const passwordCharacterPattern: RegExp = /(?=.*[a-z])(?=.*[A-Z])/;
	return passwordCharacterPattern.test(text);
};

// Validate if the input contains at least one special character (non-alphanumeric)
export const isValidPasswordSpecial = (text: string): boolean => {
	const passwordSpecialPattern: RegExp = /(?=.*\W)/;
	return passwordSpecialPattern.test(text);
};
