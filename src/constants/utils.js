
export const validEmail = (text) => {
	var validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
	return validate.test(text);
};

export const validPasswordLength = (text) => {
	var validate = /.{8,}/;
	return validate.test(text)
}

export const validPasswordChar = (text) => {
	var validate = /(?=.*[a-z])(?=.*[A-Z])/;
	return validate.test(text)
}

export const validPasswordSpecial = (text) => {
	var validate = /(?=.*\W)/;
	return validate.test(text)
}