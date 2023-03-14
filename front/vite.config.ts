import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/graphql": "http://localhost:8080",
		},
	},
	resolve: {
		alias: [
			{
				find: "@gqlType",
				replacement: path.resolve(path.resolve(), "graphql.ts"),
			},
			{
				find: "@src",
				replacement: path.resolve(path.resolve(), "src"),
			},
		],
	},
});
