import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/graphql": "http://localhost:8080",
			// "/file": "http://localhost:8080",
		},
	},

	resolve: {
		alias: [
			{
				find: "@gqlType",
				replacement: path.resolve(path.resolve(), "src", "graphql-type.ts"),
			},
			{
				find: "@src",
				replacement: path.resolve(path.resolve(), "src"),
			},
		],
	},
});
