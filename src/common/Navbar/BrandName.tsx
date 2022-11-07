import React from "react";
import LinkElement from "./LinkElement";

type AsLinkProps = {
	path: string;
};
type AsButtonProps = {};

type Props = {
	name: string | JSX.Element;
} & (AsButtonProps | AsLinkProps);

const BrandName: React.FC<Props> = (props) => {
	const path = "path" in props ? props.path : undefined;

	return (
		<LinkElement path={path} className="flex items-center px-5">
			<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
				{props.name}
			</span>
		</LinkElement>
	);
};

export default BrandName;
