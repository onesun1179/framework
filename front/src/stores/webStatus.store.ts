import { createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface WebStatusStore {
	menu: {
		collapsed: boolean;
		setCollapsed: (collapsed: boolean) => void;
	};
}

export const webStatusStore = createStore(
	immer<WebStatusStore>((setState, getState, store) => ({
		menu: {
			collapsed: false,
			setCollapsed: (collapsed) =>
				setState((state) => {
					state.menu.collapsed = collapsed;
				}),
		},
	}))
);

export const useWebStatusStore = () => useStore(webStatusStore, (s) => s);
