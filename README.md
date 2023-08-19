# standard-dev-demo

**Last update: 2023-8-19**

> Main Stack: pnpm, eslint, prettier, commitizen, husky, commitlint
> Secondary Stack:Typescript, git, lint-staged, standard-version

## 1.Initialize project and use pnpm
*Initialize project*:

```shell
mkdir standard-dev-demo
cd ./standard-dev-demo
npm init -y
```
> For Vue, React ,NestJs and other projecst: use their own cli tools
> Such as `Vue-cli(Vue-cli-ui)`, `Vite`, `lint-staged`...

*Open it(Vscode):*

```shell
code .
```

Use `PNPM`:

```shell
npm install pnpm -g
```

### why is pnpm?

- Fast speed - It's fast than `NPM` and `YARN`
- Small footprint - Using `hard linking` to link nodes_ modules resource
- Compatible with NPM - PNPM is fully compatible with the ecosystem of NPM and can be easily migrated.

*Install Typescript:*

```shell
npm install typescript -g
tsc --init
```

>Example tsconfig.json

```json
{
	"compilerOptions": {
		"target": "ESNext", // Specify ECMAScript target version
		"module": "ESNext" /* CommonJS */, // Specify module code generation
		"moduleResolution": "node" /* Optional */, // Module resolution strategy for imports
		"strict": true, // Enable strict mode
		"jsx": "preserve",
		"sourceMap": false, // Generate sourceMap for debug in browser
		"resolveJsonModule": true,
		"isolatedModules": true,
		"esModuleInterop": true, // Enable compatibility handling for imports from CommonJS modules
		/* List of library files to be included in compilation */
		"lib": ["ESNext", "DOM" /* "DOM.Iterable" */ /* Optional */],
		/* Paths to declare type definition files to include */
		"types": [
			/* "vite/client", */
			/* Optional(If exists) */
			/* "node" */
		],
		"skipLibCheck": true,
		"noEmit": true,
		"forceConsistentCasingInFileNames": true, // Force consistent casing with imports
		"baseUrl": ".", // Base directory for imports
		/* Path mapping for module imports */
		"paths": {
			"@/*": ["src/*"]
		},
		"outDir": "./dist/", // Output directory
		"noImplicitAny": true, // Disallow implicit any
		"noUnusedLocals": true, // Disallow unused locals
		"noUnusedParameters": true, // Disallow unused params
		"declaration": true /* Optional */, // Generate .d.ts files
		"declarationDir": "./dist/" /* Optional */, // Output directory for declarations
		"declarationMap": false /* Optional */ // Generate sourcemaps for declarations
	},
	/* Included files */
	"include": [
		"src/**/*.ts",
		// "src/**/*.d.ts" /* Optional */,
		// "src/**/*.tsx" /* Optional */,
		// "src/**/*.vue" /* Optional */
		"main.ts",
		"plugins/**/*.ts"
	],
	/* Excluded files */
	"exclude": ["node_modules", "*.test.ts"] /* Optional */
}
```

*Initialize Git:*

>  Create a Github repository:[https://github.com/new](https://github.com/new)

```shell
git init
git remote add origin git@github.com:BIYUEHU/standard-dev-demo.git
```

>  Create `.gitignore`

```ini
node_modules
dist
logs
*.log

.vscode/*
.vs/*
!.vscode/extensions.json
.idea
```

# 2.Standardize code format and style

> ESLint: Check syntax and find problems By `NPM packages`
> Prettier: A code-format tool and unified code style By `Editor Plugins`

Install `ESLint`:

```shell
pnpm install --save-install eslint
npx eslint --init
> To check syntax and find problems
> JavaScript modules (import/export)
> *Whic framework does your project use?
   Vue
   React
 > None of these
> Does your project use TypeScript >> Yes
> *Where does your code run?
 √ Browser
 √ Node
> *What format do you want your config file to be in?
 > JavaScript
   YAML
   JSON
> Would you like to install now? >> Yes
> Which package manager do you want to use?
   npm
   yarn
 > pnpm
```

In addition, intstall some packages about `ESLint` and Prettier

```shell
pnpm install eslint-config-prettier eslint-config-airbnb-base eslint-import-resolver-alias eslint-plugin-import eslint-plugin-prettier prettier -D
# eslint-config-prettier: ESLint with Prettier
# eslint-config-airbnb-base: ESLint's support for airbnb
# eslint-import-resolver-alias: ESLint's support for import alias
# eslint-plugin-import: Organize your import statement
# eslint-plugin-prettier: ESLint's support for Prettier
# prettier: Prettier's core repository

# Optional
pnpm install eslint-plugin-vue -D
# ESLint's support for Vue project
```

*Install their editor plugins(Vscode):*

> Search in the expand store: `ESLint` `Prettier - Code formatter` 
> Optional plugins: `ESLint Chinese Rules`(For Chinese) `Prettier ESLint`

> Change save setting: Settings(`ctrl + .`) -> Search: save -> √ Editor: Format On Save

> Right click in the editing area -> Using Format Document -> Configure default formatted documents

*Auto fix problems that is can  by ESLint on save:*

```json
/*
* VSCode Settings JSON File
*/
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```

> .eslintrc

```json
{
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "airbnb-base", "prettier"],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [".eslintrc.{js,cjs}"],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": ["@typescript-eslint"],
	"rules": {
		"import/no-unresolved": 0,
		"import/extensions": 0,
		"import/no-extraneous-dependencies": 0,
		"import/no-mutable-exports": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/no-unused-vars": 0,
		"no-unused-vars": 0,
		"no-shadow": 0,
		"no-undef": 0,
		"no-use-before-define": 0,
		"no-restricted-syntax": 0,
		"max-classes-per-file": 0,
		"no-continue": 0,
		"prefer-destructuring": 0,
		"default-case": 0,
		"no-console": 0,
		"indent": [0, "spaces", 4],
		"space-before-function-paren": 0
	},
	"settings": {
		"import/resolver": {
			"alias": {
				"map": [["@", "./src"]],
				"extensions": [".ts", ".tsx", ".js", ".jsx", ".json"]
			}
		}
	}
}
```

> .prettier

```json
{
	"printWidth": 120,
	"tabWidth": 4,
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "all",
	"arrowParens": "avoid"
}
```

> .eslintignore

```ini
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
/bin
.eslintrc.js
prettier.config.js
/src/mock/*

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

.DS_Store
dist-ssr
*.local

/cypress/videos/
/cypress/screenshots/

# Editor directories and files
.vscode
!.vscode/extensions.json
.idea
*.suo
*.njsproj
*.sln
*.sw?

components.d.ts
```

> prettierignore

```ini
/dist/*
.local
.output.js
/node_modules/**
src/.DS_Store

**/*.svg
**/*.sh

/public/*
components.d.ts
```

> package.json

```json
{
    /* ... */
    "scripts": {
        /* ... */
		"lint": "eslint \"src/**/*.{js,vue,ts}\" --fix",
		"prettier": "prettier --config .prettierrc \"src/**/*.{vue,js,ts}\" --write"
    }
    /* ... */
}
```

## 3.Standard Git Commit Specification

> Commitizen: Use `git cz` instead of `git commit` to guide users in filling out standardized commit information

> Husky: A tool for adding hooks to Git clients, which automatically triggers functions before some Git operations
>
> [https://typicode.github.io/husky/#/](https://typicode.github.io/husky/#/)

> Commitlint: A tool for verifying comments submitted by git commit

> Lint-staged: filter out Git code temporary storage areas (by `git add`), passing a list of all temporary files to the task

Install Commitizen:

```shell
npm install commitizen -g
pnpm install cz-conventional-changelog -D
```

> package.json

```json
{
    /* ... */,
	"config": {
		"commitizen": {
			"path": "./node_modules/cz-conventional-changelog"
		}
	}
}
```

Try a few!

```shell
git cz
```


Install Husky(Method.1):

```shell
pnpm install husky -D
```

> package.json

```json
{
    /* ... */
    "scripts": {
        /* ... */
    	"prepare": "husky install"
    }
    /* ... */
}
```

```shell
pnpm run prepare
```

Install Husky(Method.2):

```shell
pnpx husky install
```

Install Commitlint:

```shell
pnpm install @commitlint/config-conventional @commitlint/cli@12.1.4 -D
pnpx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

> .commitlintrc

```json
{
	"extends": [
		"@commitlint/config-conventional"
	],
	"rules": {
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"docs",
				"style",
				"refactor",
				"perf",
				"test",
				"build",
				"ci",
				"chore",
				"revert"
			]
		],
		"subject-case": [
			0
		]
	}
}
```

| Type     | Description                                                  |
| -------- | ------------------------------------------------------------ |
| feat     | A new feature                                                |
| fix      | A bug fix                                                    |
| docs     | Documentation only changes                                   |
| style    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| refactor | A code change that neither fixes a bug nor adds a feature    |
| perf     | A code change that improves performance                      |
| test     | Adding missing tests or correcting existing tests            |
| build    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
| ci       | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| chore    | Other changes that don't modify src or test files            |
| revert   | Reverts a previous commit                                    |

Use lint-staged:

```shell
pnpm install lint-staged -D
```

> .lintstagedrc

```json
{
	"*.{js,jsx,vue,ts,tsx}": ["npm run lint", "npm run prettier", "git add ."]
}
```

```shell
pnpx husky add .husky/pre-commit "npx lint-staged"
```

## 4.Auto create CHANGELOG.md and release

Install standard-version

```shell
pnpm install standard-version -D
```

> package.json

```json
{
    /* ... */
    "scripts": {
        /* ... */
		"release": "standard-version"
    }
    /* ... */
}
```

> .versionrc.js

```json
module.exports = {
	types: [
		{ type: 'feat', section: '✨ Features' },
		{ type: 'fix', section: '🐛 Bug Fixes' },
		{ type: 'docs', section: '✏️ Documentation' },
		{ type: 'style', section: '💄 Styles' },
		{ type: 'refactor', section: '♻️ Code Refactoring' },
		{ type: 'perf', section: '⚡ Performance Improvements' },
		{ type: 'test', section: '✅ Tests' },
		{ type: 'revert', section: '⏪ Revert', hidden: true },
		{ type: 'build', section: '📦‍ Build System' },
		{ type: 'chore', section: '🚀 Chore' },
		{ type: 'ci', section: '👷 Continuous Integration' },
	],
};
```

