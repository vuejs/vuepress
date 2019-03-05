// based on https://github.com/yeoman/stringify-object/blob/master/index.js
// this version disabled some functionality
// but fixed wrong function interpretation (#1338)

import { isRegExp, isObject } from './datatypes'
import getOwnEnumPropSymbols from 'get-own-enumerable-property-symbols'

interface StringifyOptions {
	indent?: string
	commaDangle?: boolean
	singleQuotes?: boolean
	inlineCharacterLimit?: number
}

const TOKEN_DANGLE = '@@__STRINGIFY_TOKEN_DANGLE__@@'

export default function stringify(input: any, options: StringifyOptions = {}, pad: string = '') {
	const encounted: object[] = []

	const {
		indent = '\t',
		commaDangle = true,
		singleQuotes = true,
		inlineCharacterLimit = 80
	} = options

	let TOKEN_NEWLINE: string, NEWLINE_OR_SPACE: string

	if (!inlineCharacterLimit) {
		TOKEN_NEWLINE = '\n'
		NEWLINE_OR_SPACE = '\n'
	} else {
		TOKEN_NEWLINE = '@@__STRINGIFY_TOKEN_NEWLINE__@@'
		NEWLINE_OR_SPACE = '@@__STRINGIFY_NEWLINE_OR_SPACE__@@'
	}

	function stringify(input: any, pad: string = ''): string {
		let TOKEN_PAD: string, TOKEN_INDENT: string

		if (!inlineCharacterLimit) {
			TOKEN_PAD = pad
			TOKEN_INDENT = pad + indent
		} else {
			TOKEN_PAD = '@@__STRINGIFY_TOKEN_PAD__@@'
			TOKEN_INDENT = '@@__STRINGIFY_TOKEN_INDENT__@@'
		}

		const expandWhiteSpace = (source: string) => {
			if (!inlineCharacterLimit) return source

			const oneLined = source
				.replace(new RegExp(`${TOKEN_NEWLINE}|${TOKEN_DANGLE}`, 'g'), '')
				.replace(new RegExp(NEWLINE_OR_SPACE, 'g'), ' ')
				.replace(new RegExp(`${TOKEN_PAD}|${TOKEN_INDENT}`, 'g'), '')

			if (oneLined.length <= inlineCharacterLimit) return oneLined

			return source
				.replace(new RegExp(`${TOKEN_NEWLINE}|${NEWLINE_OR_SPACE}`, 'g'), '\n')
				.replace(new RegExp(TOKEN_DANGLE, 'g'), commaDangle ? ',' : '')
				.replace(new RegExp(TOKEN_PAD, 'g'), pad)
				.replace(new RegExp(TOKEN_INDENT, 'g'), pad + indent)
		}

		if (encounted.indexOf(input) !== -1) {
			throw new Error('Circular reference encounted.')
		}
		
		if (typeof input === 'function') {
			let output = String(input);
			if (!/^(function\b|\()/.test(output)) {
				output = output.replace(/^[^(]+/, 'function');
			}
			return output;
		}

		if (input === null ||
			input === undefined ||
			typeof input === 'number' ||
			typeof input === 'boolean' ||
			typeof input === 'symbol' ||
			isRegExp(input)
		) {
			return String(input)
		}

		if (input instanceof Date) {
			return `new Date('${input.toISOString()}')`
		}

		if (Array.isArray(input)) {
			if (input.length === 0) {
				return '[]'
			}

			encounted.push(input)

			const output = '[' + TOKEN_NEWLINE + input.map((el, i) => {
				const eol = input.length - 1 === i
					? TOKEN_DANGLE + TOKEN_NEWLINE
					: ',' + NEWLINE_OR_SPACE
				const value = stringify(el, pad + indent)
				return TOKEN_INDENT + value + eol
			}).join('') + TOKEN_PAD + ']'

			encounted.pop()

			return expandWhiteSpace(output)
		}

		if (isObject(input)) {
			const objKeys = (Object.keys(input) as (string | symbol)[]).concat(getOwnEnumPropSymbols(input))
			if (objKeys.length === 0) return '{}'

			encounted.push(input)

			const output = '{' + TOKEN_NEWLINE + objKeys.map((el, i) => {
				const eol = objKeys.length - 1 === i
					? TOKEN_DANGLE + TOKEN_NEWLINE
					: ',' + NEWLINE_OR_SPACE
				const isSymbol = typeof el === 'symbol'
				const isClassic = !isSymbol && /^[a-z$_][a-z$_0-9]*$/i.test(el as string)
				const key = isSymbol || isClassic ? el : stringify(el)
				const value = stringify(input[el], pad + indent)
				return TOKEN_INDENT + String(key) + ': ' + value + eol
			}).join('') + TOKEN_PAD + '}'

			encounted.pop()

			return expandWhiteSpace(output)
		}

		input = String(input).replace(/[\r\n]/g, x => x === '\n' ? '\\n' : '\\r')

		if (!singleQuotes) {
			return `"${input.replace(/"/g, '\\"')}"`
		} else {
			return `'${input.replace(/\\?'/g, '\\\'')}'`
		}
	}

	return stringify(input, pad)
}
