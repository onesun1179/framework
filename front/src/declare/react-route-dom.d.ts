import { Params } from "@remix-run/router";

module "react-router-dom" {
	export declare function useMatches(): {
		id: string;
		pathname: string;
		params: Params<string>;
		data: unknown;
		handle: {
			frontComponentId?: string;
			menuSeqNo?: number;
		};
	}[];
}
