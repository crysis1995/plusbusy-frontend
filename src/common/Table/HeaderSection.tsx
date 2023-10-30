import React from "react";

type Props = {} & React.PropsWithChildren;
const HeaderSection: React.FC<Props> = (props) => {
	return <thead className="bg-gray-50">{props.children}</thead>;
};

export default HeaderSection;
