import { ConfigProvider } from "antd";
import { FC, PropsWithChildren, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { MessageEntitiesOutput } from "@gqlType";
import { ValidateMessages } from "rc-field-form/lib/interface";

export const MESSAGE_ENTITIES_CONFIG_QUERY = gql`
	query MESSAGE_ENTITIES_CONFIG_QUERY {
		messageEntities(
			messageEntitiesInput: {
				search: { groupCode: { equal: { value: "FVM" } } }
			}
		) {
			list {
				code
				text
			}
		}
	}
`;
export const AntdConfigProvider: FC<PropsWithChildren> = ({ children }) => {
	const { data, previousData } = useQuery<{
		messageEntities: MessageEntitiesOutput;
	}>(MESSAGE_ENTITIES_CONFIG_QUERY);

	const validateMessages = useMemo<ValidateMessages>(() => {
		const _data = data || previousData;

		if (_data) {
			return _data.messageEntities.list.reduce((r, o) => {
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
