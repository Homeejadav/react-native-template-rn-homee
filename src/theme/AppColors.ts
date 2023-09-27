export interface Theme {
	background: string;
	text: string;
	white: string;
	primary: string;
	primaryTransparent: string;
	secondary: string;
	secondaryTransparent: string;
	placeholder: string;
	error: string;
	success: string;
}

export const lightTheme = {
	background: 'rgba(255, 255, 255, 1)',
	text: 'rgba(30, 30, 30, 1)',
	white: 'rgba(255, 255, 255, 1)',
	primary: 'rgba(80, 104, 219, 1)',
	primaryTransparent: 'rgba(80, 104, 219,0.1)',
	secondary: 'rgba(150, 150, 150, 1)',
	secondaryTransparent: 'rgba(150, 150, 150, 0.3)',
	placeholder: 'rgba(150, 150, 150, 0.7)',
	error: 'rgba(255, 0, 0, 1)',
	success: 'rgba(80, 104, 219, 1)',
};

export const darkTheme = {
	background: 'rgba(15, 15, 30, 1)',
	text: 'rgba(255, 255, 255, 1)',
	white: 'rgba(255, 255, 255, 1)',
	primary: 'rgba(80, 104, 219, 1)',
	primaryTransparent: 'rgba(80, 104, 219, 0.1)',
	secondary: 'rgba(150, 150, 150, 1)',
	secondaryTransparent: 'rgba(150, 150, 150, 0.3)',
	placeholder: 'rgba(150, 150, 150, 0.7)',
	error: 'rgba(255, 0, 0, 1)',
	success: 'rgba(80, 104, 219, 1)',
};
