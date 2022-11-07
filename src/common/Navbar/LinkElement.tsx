import { NavLink } from "react-router-dom";
import React from "react";

const LinkElement = ({
	className = "",
	children,
	path,
}: {
	className?: string;
	children: React.ReactNode;
	path?: string;
}) =>
	path ? (
		<NavLink to={path} className={className}>
			{children}
		</NavLink>
	) : (
		<button className={className}>{children}</button>
	);

export default LinkElement;
