import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import * as path from "path";

// https://vitejs.dev/config/
console.log(path.resolve(__dirname, "graphql.ts"));
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: "@gqlType",
				replacement: path.resolve(__dirname, "graphql.ts"),
			},
			{
				find: "@src",
				replacement: path.resolve(__dirname, "src"),
			},
		],
	},
});
