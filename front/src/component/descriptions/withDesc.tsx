import { FC } from "react";
import { DescriptionsProps } from "antd/es/descriptions";

export type DescProps = {
	titleYn: boolean;
	descProps: DescriptionsProps;
};

export default function withDesc<P>(
	Fc: FC<DescProps & P>,
	descProps?: DescriptionsProps
) {
	return function (props: Partial<DescProps> & P) {
		return (
			<Fc
				titleYn
				descProps={
					{
						...descProps,
						title: props.titleYn ? descProps?.title : null,
					} || {}
				}
				{...props}
			/>
		);
	};
}
