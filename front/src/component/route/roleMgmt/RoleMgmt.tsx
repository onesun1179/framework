import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useState,
} from "react";
import RoleSideTree from "@src/component/role/RoleSideTree";

type SeqNo = number | undefined;
export const RoleMgmtContext = createContext<{
	roleSeqNo: SeqNo;
	setRoleSeqNo: Dispatch<SetStateAction<SeqNo>>;
}>({
	roleSeqNo: undefined,
	setRoleSeqNo: () => void 0,
});
const RoleMgmt: FC<PropsWithChildren> = ({ children }) => {
	const [roleSeqNo, setRoleSeqNo] = useState<number>();
	return (
		<RoleMgmtContext.Provider
			value={{
				roleSeqNo,
				setRoleSeqNo,
			}}
		>
			<RoleSideTree>{children}</RoleSideTree>
		</RoleMgmtContext.Provider>
	);
};

export default RoleMgmt;
