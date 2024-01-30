# standard-dev-demo

**Last update: 2024-1-30**

> Main Stack: pnpm, eslint, prettier, husky, commitlint

> Secondary Stack: Typescript, git, lint-staged, standard-version

## 1.Initialize project and use pnpm

*Initialize project*:

```bash
mkdir standard-dev-demo
cd ./standard-dev-demo
npm init -y
```
> For Vue, React ,NestJs and other projecst: use their own cli tools
> Such as `Vue-cli(Vue-cli-ui)`, `Vite`...

*Open it(Vscode):*

```bash
code .
```

Use pnpm:

```bash
npm install pnpm -g
```

### why is pnpm?

- Fast speed - It's fast than `npm` and `yarn`
- Small footprint - Using `hard linking` to link nodes_ modules resource
- Compatible with NPM - PNPM is fully compatible with the ecosystem of NPM and can be easily migrated.

*Install Typescript:*

```bash
npm install typescript -g
tsc --init
```

>Example tsconfig.json

```json
{
	"extends": "./tsconfig.node.json",
	"compilerOptions": {
		"outDir": "dist",
	},
	"include": [
		"src/**/*.ts"
	]
}
```

```json
{
	"compilerOptions": {
		"module": "NodeNext",
		"moduleResolution": "NodeNext",
		"target": "ESNext",
		"strict": true,
		"declaration": true,
		"experimentalDecorators": true,
		"composite": true,
		"incremental": true,
		"outDir": "lib",
		"rootDir": "src"
	},
}
```

*Initialize Git:*

>  Create a Github repository: [https://github.com/new](https://github.com/new)

```bash
git init
git remote add origin git@github.com:BIYUEHU/standard-dev-demo.git
git push -u origin master
```

>  Create `.gitignore`

```ini
node_modules
dist
lib
.husky/_

.vscode/*
.vs/*
!.vscode/extensions.json

*.tgz
tsconfig.tsbuildinfo
*.log
```

# 2.Standardize code format and style

> ESLint: Check syntax and find problems By `npm packages`
> Prettier: A code-format tool and unified code style By `Editor Plugins`

```bash
pnpm install eslint-config-prettier eslint-config-airbnb-base eslint-plugin-prettier eslint prettier -D

# eslint-config-prettier: ESLint with Prettier
# eslint-config-airbnb-base: ESLint's support for airbnb
# eslint-import-resolver-alias: ESLint's support for import alias
# eslint-plugin-import: Organize your import statement
# eslint-plugin-prettier: ESLint's support for Prettier
# prettier: Prettier's core repository

# Optional:
# eslint-plugin-vue: ESLint's support for Vue project
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
	"root": true,
	"extends": [
		"airbnb-base",
		"prettier"
	],
	"parser": "@typescript-eslint/parser",
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		// "@typescript-eslint/no-explicit-any": 0,
		// "@typescript-eslint/no-namespace": 0,
		// "no-console": 0,
		// "space-before-function-paren": 0,
		/* typescript need */
		"import/no-unresolved": 0,
		"import/extensions": 0,
		"no-use-before-define": 0,
		"no-unused-vars": 0,
		"no-shadow": 0,
		"no-redeclare": 0
	},
	"ignorePatterns": [
		"*.js"
	]
}
```

> .prettier

```json
{
	"singleQuote": true,
	"printWidth": 120,
	"trailingComma": "none"
}
```

> package.json

```json
{
    // ...
    "scripts": {
        // ...
		"lint": "eslint \"src/**/*.{js,vue,ts}\" --fix",
		"prettier": "prettier --config .prettierrc \"src/**/*.{vue,js,ts}\" --write"
    }
}
```

## 3.Standard Git Commit Specification

> Husky: A tool for adding hooks to Git clients, which automatically triggers functions before some Git operations
>
> [https://typicode.github.io/husky/#/](https://typicode.github.io/husky/#/)

> Commitlint: A tool for verifying comments submitted by git commit

> Lint-staged: filter out Git code temporary storage areas (by `git add`), passing a list of all temporary files to the task

Install Husky:

```bash
pnpm install husky -D
```

> package.json

```json
{
    // ...
    "scripts": {
        // ...
    	"prepare": "husky install"
    }
}
```

```bash
pnpm run prepare
pnpx husky install
```

Install Commitlint:

```bash
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

```bash
pnpm install lint-staged -D
```

> package.json

```json
{
	// ...
	"lint-staged": {
		"*.{js,jsx,vue,ts,tsx}": [
			"npm run lint",
			"npm run prettier",
			"git add ."
		]
	}
}
```

```bash
pnpx husky add .husky/pre-commit "npx lint-staged"
```

## 4.Auto release

Install standard-version

```bash
pnpm install standard-version -D
```

> package.json

```json
{
    // ...
    "scripts": {
        // ...
		"release": "standard-version"
    }
}
```

Try a few!

```bash
pnpm run release
```

## 5.Publish to Npm Package

Mange npm's sources:

```bash
npm install nrm -g
nrm ls
# View all sources list
nrm use npm
# Checkout some source
npm login
# Login your account
```

> package.json

Added some information for your `package.json`

```json
{
    // ...
	"bugs": {
		"url": "https://github.com/biyuehu/standard-dev-demo/issues"
	},
	"repository": {
		"type": "git",
		"url": "git+https://github.com/biyuehu/standard-dev-demo.git"
	},
	"homepage": "https://github.com/biyuehu/standard-dev-demo"
}
```

When Everything is ready:

```bash
git add .
git commit -m 'chore: update'
pnpm run release
git push
npm publish
```

View your package: [https://www.npmjs.com/package/standard-dev-demo](https://www.npmjs.com/package/standard-dev-demo)

>  Good!You can develop to a standard project,Now!
