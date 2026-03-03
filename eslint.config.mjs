/* * */

import { next } from '@carrismetropolitana/eslint'

/* * */

export default [
  { ignores: ['*.mjs'] },
  ...next,
  {
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'require',
          modifiers: ['private'],
          selector: 'memberLike',
        },
      ],
    },
  },
]
