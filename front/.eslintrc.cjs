module.exports = {
	parser : "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "prettier"],
	extends: [
		"prettier",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	],
	rules: {
		"import/no-unresolved" : "off",
		"@typescript-eslint/no-non-null-assertion" : "off"

	},
	"settings": {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx", ".js"]
		},
		"import/resolver": {
			"typescript": "./tsconfig.json",
			"node": {
				"extensions": [".ts", ".tsx", ".native.js"]
			}
		}
	}
};
