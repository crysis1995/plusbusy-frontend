import React from "react";

type Props = {
	id?: string;
	ref?: React.LegacyRef<HTMLInputElement>;
};

export const Checkbox = (props: Props) => {
	return <input id={props.id} name={props.id} className={"rounded"} type={"checkbox"} ref={props.ref} />;
};
