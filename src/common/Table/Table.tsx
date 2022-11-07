import React from "react";

type Props = {} & React.PropsWithChildren;

const Table: React.FC<Props> = (props) => {
	return (
		<table className="min-w-full divide-y divide-gray-300">
			{props.children}
		</table>
	);
};


export default Table