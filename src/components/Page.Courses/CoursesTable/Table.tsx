import React from "react";

const Table: React.FC<React.PropsWithChildren> = (props) => {
	return (
		<div>
			<table>
				<>{props.children}</>
			</table>
		</div>
	);
};
export default Table;
