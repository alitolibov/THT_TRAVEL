import { bus } from './bus';

let currentLocale = 'ru';

bus.on('updateLocale', (newLocale: string) => {
	currentLocale = newLocale;
});

export function getLocale() {
	return currentLocale;
}

export function getValue(key: string): string {
	const locale = getLocale();
	
	let language: 'uz' | 'en' | 'ru' = 'ru';
	
	if(locale) {
		if (locale == 'en') {
			language = 'en';
		}
		
		if (locale == 'uz') {
			language = 'uz';
		}
		
		if (locale == 'ru') {
			language = 'ru';
		}
		
		return `${key}${language.charAt(0).toUpperCase() + language.slice(1)}`;
	}
	
	return `${key}Ru`;
	
}

export interface IErrorPathAndMsg {
	firstWord: string;
	msg: string;
}

export function getErrorPathAndMsg(sentence: string): IErrorPathAndMsg {
	const split = sentence.split(' ');
	return {
		firstWord: split[0],
		msg: split.slice(1).join(' ')
	};
}
