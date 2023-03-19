import { FC } from "react";
import { useLocation } from "react-router-dom";

/**
 * 메뉴 관리
 */
const MenuManagement: FC = () => {
	const location = useLocation();
	console.log(location);
	return <>{"ttttttt"}</>;
};

export default MenuManagement;
