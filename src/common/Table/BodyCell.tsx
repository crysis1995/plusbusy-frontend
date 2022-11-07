import React from "react";
import classNames from "classnames";

type Props = {
	className?: string;
} & React.PropsWithChildren;

const BodyCell: React.FC<Props> = (props) => {
	const classnames = classNames("py-4 px-3 text-sm text-gray-500", props.className || "");

	return <td className={classnames}>{props.children}</td>;
};

export default BodyCell;
