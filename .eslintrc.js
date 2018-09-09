module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		node: true,
		es6: true
	},
	rules: {
		'no-debugger': 0,
		'no-new': 0,
		'valid-jsdoc': [2, {
			requireReturnDescription: false
		}],
		'one-var': 0
	},
	'globals': {
		IntersectionObserver: true
	},
	'parserOptions': {
		'ecmaVersion': 6,
		'sourceType': 'module',
		'ecmaFeatures': {
		'modules': true
		}
	}
};
