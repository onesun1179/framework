module.exports = {
	plugins: ["@typescript-eslint", "prettier"],
	parser : "@typescript-eslint/parser",
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"],
	},
	extends: [
		"prettier",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
	],
	rules: {
		"@typescript-eslint/ban-types": "off",
	},
};
