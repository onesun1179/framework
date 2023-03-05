import {
	PropsWithChildren,
	ReactElement,
	ValidationMap,
	WeakValidationMap,
} from "react";

declare module "react" {
	interface FunctionComponent<P = {}> {
		(props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
		propTypes?: WeakValidationMap<P> | undefined;
		contextTypes?: ValidationMap<any> | undefined;
		defaultProps?: Partial<P> | undefined;
		displayName?: string | undefined;
	}
}
