export function getValue(key: string): string {
	if (typeof window !== 'undefined') {
		const pathname = window.location.pathname;
		
		let language: 'uz' | 'en' | 'ru' = 'ru';
		
		if (pathname.includes('/en/')) {
			language = 'en';
		}
		
		if (pathname.includes('/uz/')) {
			language = 'uz';
		}
		
		return `${key}${language.charAt(0).toUpperCase() + language.slice(1)}`;
	}
	
	return `${key}Ru`;
}
