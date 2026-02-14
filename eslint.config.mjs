/* * */

import { next } from '@carrismetropolitana/eslint'

/* * */

export default [
  ...next,
  {
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "memberLike",
          "modifiers": ["private"],
          "format": ["camelCase", "PascalCase"],
          "leadingUnderscore": "require",
        },
      ],
    },
  },
];