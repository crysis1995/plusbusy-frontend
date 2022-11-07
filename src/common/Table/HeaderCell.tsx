import React from "react";
import classNames from "classnames";

type Props = {
	className?: string;
} & React.PropsWithChildren;

const HeaderCell: React.FC<Props> = (props) => {
	const classname = classNames(
		"py-3.5 px-3 text-left text-sm font-semibold text-gray-900 first:pl-4",
		props.className
	);

	return (
		<th scope="col" className={classname}>
			{props.children}
		</th>
	);
};

export default HeaderCell;
