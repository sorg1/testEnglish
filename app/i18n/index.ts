import i18n from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import en from './en';
import { assign } from 'lodash';
import enLocaleData from 'i18next-icu/locale-data/en';

i18n
	.use(
		new ICU({
			localeData: enLocaleData
		})
	)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		debug: true,
		interpolation: {
			escapeValue: false
		},
		resources: {
			en,
			keys: toDotNotation(assign({}, en), [])
		},
		react: {
			nsMode: 'default'
		}
	});

export default i18n;

function toDotNotation(dictionary, path: string[]) {
	const results = {};
	for (const key in dictionary) {
		if (typeof dictionary[key] === 'string') {
			results[key] = [].concat(path, key).join('.') as any;
		} else {
			results[key] = toDotNotation(dictionary[key], [].concat(path, key));
		}
	}
	return results;
}
