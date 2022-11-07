import React from "react";

type Props = {} & React.PropsWithChildren;

const BodySection: React.FC<Props> = (props) => {
	return (
		<tbody className={"divide-y divide-gray-200 bg-white"}>
			{props.children}
		</tbody>
	);
};
export default BodySection