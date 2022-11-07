import React from "react";

type Props = React.PropsWithChildren;

const Menu = (props: Props) => {
	return (
		<ul className="flex flex-row font-medium sm:space-x-8">
			<>{props.children}</>
		</ul>
	);
};

export default Menu;
