import React from "react";
import LinkElement from "./LinkElement";

type AsLinkProps = {
	path: string;
};
type AsButtonProps = {};

type Props = React.PropsWithChildren & (AsButtonProps | AsLinkProps);

const MenuLink = (props: Props) => {
	const path = "path" in props ? props.path : undefined;
	return (
		<li className="py-0">
			<LinkElement path={path}>{props.children}</LinkElement>
		</li>
	);
};

export default MenuLink;
