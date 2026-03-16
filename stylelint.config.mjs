/** @type {import('stylelint').Config} */

/* * */

import { css } from '@tmlmobilidade/eslint';

/* * */

export default {
	...css,
	rules: {
		'at-rule-no-unknown': [true, { ignoreAtRules: ['source'] }],
		'comment-empty-line-before': ['always', { ignore: ['after-comment'] }],
		'import-notation': 'string',
		'selector-class-pattern': [
			/^[a-z]+([A-Z][a-z0-9]*)*$/,
			{ message: 'Selector should be written in camelCase.' },
		],
		'selector-id-pattern': [
			/^[a-z]+([A-Z][a-z0-9]*)*$/,
			{ message: 'Selector should be written in camelCase.' },
		],
		'unit-allowed-list': ['px', '%', 'fr', 'ms', 'deg', 'vh', 'vw', 'em', 'rem'],
	},
};
