import React from "react";

type Props = {} & React.PropsWithChildren;

const Title: React.FC<Props> = (props) => {
	return <h1 className="text-xl font-semibold text-gray-900">{props.children}</h1>;
};

export default Title;
