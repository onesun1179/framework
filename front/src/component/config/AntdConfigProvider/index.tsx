import { FC, PropsWithChildren, useMemo } from "react";
import { useMessageEntitiesConfigQuery } from "@src/component/config/AntdConfigProvider/quires";
import { ValidateMessages } from "rc-field-form/lib/interface";
import { ConfigProvider } from "antd";

const AntdConfigProvider: FC<PropsWithChildren> = ({ children }) => {
	const { data, previousData } = useMessageEntitiesConfigQuery();

	const validateMessages = useMemo<ValidateMessages>(() => {
		const _data = data || previousData;

		if (_data) {
			return _data.messages.list.reduce((r, o) => {
				switch (o.code) {
					case "0001":
						r.required = o.text;
						break;
					case "0002":
						(r.string ??= {}).len = o.text;
						break;
					case "0003":
						(r.string ??= {}).min = o.text;
						break;
					case "0004":
						(r.string ??= {}).max = o.text;
						break;
					case "0005":
						(r.string ??= {}).range = o.text;
						break;
				}
				return r;
			}, {} as ValidateMessages);
		} else {
			return {};
		}
	}, [data, previousData]);
	return (
		<ConfigProvider
			form={{
				validateMessages,
			}}
		>
			{children}
		</ConfigProvider>
	);
};

export default AntdConfigProvider;
