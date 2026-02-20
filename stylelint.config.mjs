/** @type {import('stylelint').Config} */

/* * */

import { css } from '@carrismetropolitana/eslint'

/* * */

export default {
	...css,
	rules: {
		'unit-allowed-list': ['px', '%', 'fr', 'ms', 'deg', 'vh', 'vw', 'em', 'rem'],
		"at-rule-no-unknown": [true, { "ignoreAtRules": ["source"] }],
		"import-notation": "string",
		"comment-empty-line-before": ["always", { "ignore": ["after-comment"] }],
		'selector-class-pattern': [
			/^[a-z]+([A-Z][a-z0-9]*)*$/,
			{ message: 'Selector should be written in camelCase.' },
		],
		'selector-id-pattern': [
			/^[a-z]+([A-Z][a-z0-9]*)*$/,
			{ message: 'Selector should be written in camelCase.' },
		],
	},
}
