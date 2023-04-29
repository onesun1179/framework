import React, { FC, PropsWithChildren } from "react";
import { Button, Drawer, Space } from "antd";

export interface FormDrawerProps {
	onSave: () => Promise<void>;
	open: boolean;
	setOpen: (p: boolean) => void;
}

const FormDrawer: FC<PropsWithChildren<FormDrawerProps>> = ({
	onSave,
	children,
	open,
	setOpen,
}) => {
	return (
		<Drawer
			open={open}
			onClose={() => setOpen(false)}
			extra={
				<Space>
					<Button
						htmlType={"submit"}
						type="primary"
						onClick={async () => {
							await onSave();
						}}
					>
						저장
					</Button>
				</Space>
			}
		>
			{children}
		</Drawer>
	);
};

export default FormDrawer;
