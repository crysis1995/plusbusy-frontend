import React from "react";

type Props = React.PropsWithChildren & {
	htmlFor?: string;
};

export const Label = (props: Props) => {
	return <label className={"selection:block"} htmlFor={props.htmlFor}>{props.children}</label>;
};
