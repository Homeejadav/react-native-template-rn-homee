import I18n from 'react-native-i18n';
import English from './labels/english.json';
import Japanese from './labels/japanese.json';

// Configure i18n
I18n.fallbacks = true;
I18n.translations = {
	en: English,
	jp: Japanese,
};

// You can set the initial locale here if needed
// I18n.locale = 'en';

// Create a translation function
export const t = (name: any, params = {}) => {
	return I18n.t(name, params);
};
