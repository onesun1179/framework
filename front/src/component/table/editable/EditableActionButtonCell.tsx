import React, { FC, useContext } from "react";
import { EditableRowContext } from "@src/component/table/editable/EditableRowContext";
import { Button, Tooltip } from "antd";
import {
	DeleteRowOutlined,
	InsertRowBelowOutlined,
	SaveOutlined,
} from "@ant-design/icons";

export interface EditableActionButtonCellProps {
	onInsertClick?: () => void;
	onUpdateClick?: () => void;
	onDeleteClick?: () => void;
}
export const EditableActionButtonCell: FC<EditableActionButtonCellProps> = ({
	onInsertClick,
	onUpdateClick,
	onDeleteClick,
}) => {
	const { form, enableInsertYn, enableUpdateYn, enableDeleteYn } =
		useContext(EditableRowContext)!;

	console.log({
		enableDeleteYn,
	});
	return (
		<>
			{onDeleteClick && enableDeleteYn && (
				<Tooltip title={"삭제"}>
					<Button icon={<DeleteRowOutlined onClick={onDeleteClick} />} />
				</Tooltip>
			)}
			{onInsertClick && enableInsertYn && (
				<Tooltip title={"삽입"}>
					<Button icon={<InsertRowBelowOutlined onClick={onInsertClick} />} />
				</Tooltip>
			)}
			{onUpdateClick && enableUpdateYn && (
				<Tooltip title={"수정"}>
					<Button icon={<SaveOutlined onClick={onUpdateClick} />} />
				</Tooltip>
			)}
		</>
	);
};
