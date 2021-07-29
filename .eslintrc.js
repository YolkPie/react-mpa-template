const path = require('path')

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
		'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
	parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 7,
    sourceType: 'module',
    babelOptions: {
      configFile: path.join(__dirname, '.babelrc')
    }
  },
  plugins: [
    'react',
    'react-hooks',
		'@typescript-eslint'
  ],
  rules: {
    'semi': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'comma-dangle': 0,
    'arrow-parens': 0,
    'react/static-property-placement': 0,
    'react/state-in-constructor': 0,
    'react/forbid-prop-types': 0,
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
		'react/jsx-filename-extension': [1, { 'extensions': ['.ts', '.tsx'] }],
		'import/extensions': ['error', 'ignorePackages', {
			"js": 'never',
			"jsx": 'never',
			"ts": 'never',
			"tsx": 'never'
		}],
  },
	overrides: [
		{
			// 为特定的文件类型指定附加的配置
			files: ["*.ts", "*.tsx", "*.jsx"],
			rules: {
				"@typescript-eslint/explicit-module-boundary-types": "warn",
				"no-use-before-define": "off",
				"@typescript-eslint/no-use-before-define": ["error"]

			},
		},
	],
  settings: {
    'import/resolver': {
			'node': {
				'extensions': ['.js', '.jsx', '.ts', '.tsx']
			},
			// 解决tsconfig下的path别名导致eslint插件无法解决的bug
			'typescript': {
				'alwaysTryTypes': true
			},
      webpack: {
        //此处config对应webpack.config.js的路径
        config: path.resolve(__dirname, 'config/webpack.config.js')
      }
    }
  }
}
