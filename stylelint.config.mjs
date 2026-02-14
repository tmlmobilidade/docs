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
		"comment-empty-line-before": ["always", { "ignore": ["after-comment"] }]
	},
}
