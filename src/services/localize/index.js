import I18n from 'react-native-i18n';
import { English, Spanish, Japanese, German } from '../../constants/labels';

I18n.fallbacks = true;
I18n.translations = {
	en: English,
	sp: Spanish,
	jp: Japanese,
	gr: German
};

// I18n.locale = 'en';

export const t = (name, params = {}) => {
	return I18n.t(name, params);
};



