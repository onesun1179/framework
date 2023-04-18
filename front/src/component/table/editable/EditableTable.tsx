import { TableProps } from "antd/es/table/InternalTable";
import { Table } from "antd";
import { EditableRow } from "@src/component/table/editable/EditableRow";
import {
	EditableCell,
	EditableCellProps,
} from "@src/component/table/editable/EditableCell";
import { ColumnType } from "antd/es/table";
import { Rule } from "rc-field-form/lib/interface";
import { HTMLAttributes } from "react";

export interface EditableType {
	rules?: Rule[];
}
export interface EditableString extends EditableType {
	type: "string";
}
export interface EditableNumber extends EditableType {
	type: "number";
}
export type EditableColumn<R> = Omit<ColumnType<R>, "onCell"> & {
	onCell?: (record: R) => EditableCellProps<R>;
	cellType?: "action";
};
export type EditableColumns<R> = Array<EditableColumn<R>>;

export interface EditableTableProps<
	R extends Record<string, any> = Record<string, any>
> extends Omit<TableProps<R>, "columns"> {
	columns: EditableColumns<R>;
}
export function EditableTable<
	T extends Record<string, any> = Record<string, any>
>({ ...props }: EditableTableProps<T>) {
	return (
		<Table
			{...props}
			onRow={(record: T) =>
				({
					record,
				} as unknown as HTMLAttributes<any>)
			}
			components={{
				body: {
					row: EditableRow,
					cell: EditableCell,
				},
			}}
			// loading={loading}
			// columns={columns}
			// dataSource={dataSource}
			// scroll={{
			// 	y: 240,
			// }}
		/>
	);
}
