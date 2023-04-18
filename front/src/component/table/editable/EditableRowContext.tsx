import { createContext, Dispatch, SetStateAction } from "react";
import { FormInstance } from "antd/es/form";

export type EditableRowContextProps<
	T extends Record<string, any> = Record<string, any>
> = {
	form: FormInstance;
	// 수정 가능 여부
	enableUpdateYn: boolean;
	// 삽입 가능 여부
	enableInsertYn: boolean;
	// 삭제 가능 여부
	enableDeleteYn: boolean;
	setEnableUpdateYn: Dispatch<SetStateAction<boolean>>;
	setEnableInsertYn: Dispatch<SetStateAction<boolean>>;
	setEnableDeleteYn: Dispatch<SetStateAction<boolean>>;
} | null;
export const EditableRowContext = createContext<EditableRowContextProps>(null);
