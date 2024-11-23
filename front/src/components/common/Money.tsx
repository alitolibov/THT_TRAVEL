import React from 'react';

interface FormatProps {
	value: number;
}

const Money: React.FC<FormatProps> = ({ value }) => {
	function format(
		value: number,
		symbol: string | null = '$',
		decimals: number | null = 2,
		options: any = {}
	) {
		const digitsRE = /(\d{3})(?=\d)/g;
		if (!isFinite(value) || (!value && value !== 0)) return '';
		
		const {
			thousandsSeparator = ',',
			decimalSeparator = '.',
			symbolOnLeft = true,
			spaceBetweenAmountAndSymbol = false,
		} = options;
		
		// @ts-ignore
		const stringified = Math.abs(value).toFixed(decimals);
		const formattedValue = decimalSeparator
			? stringified.replace('.', decimalSeparator)
			: stringified;
		
		const _int = decimals
			? formattedValue.slice(0, -1 - decimals)
			: formattedValue;
		
		const i = _int.length % 3;
		const head =
			i > 0
				? _int.slice(0, i) +
				(_int.length > 3 ? thousandsSeparator : '')
				: '';
		const _float = decimals
			? formattedValue.slice(-1 - decimals)
			: '';
		
		symbol = spaceBetweenAmountAndSymbol
			? symbolOnLeft
				? symbol + ' '
				: ' ' + symbol
			: symbol;
		
		const result = symbolOnLeft
			? symbol +
			head +
			_int.slice(i).replace(digitsRE, '$1' + thousandsSeparator) +
			_float
			: head +
			_int.slice(i).replace(digitsRE, '$1' + thousandsSeparator) +
			_float +
			symbol;
		
		const sign = value < 0 ? '-' : '';
		return sign + result;
	}
	
	return (
		<span>
            {format(value, '$', 0, {
	            spaceBetweenAmountAndSymbol: ' ',
	            symbolOnLeft: false,
            })}
        </span>
	);
};

export default Money;
