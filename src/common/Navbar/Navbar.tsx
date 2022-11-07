import React from "react";
import classNames from "classnames";

export default function Navbar({
	children,
	className = "",
}: {
	children: JSX.Element | JSX.Element[];
	className?: string;
}) {
	return (
		<nav className={classNames("bg-gray-100", className)}>
			<div className="flex flex-wrap justify-between items-center h-full">
				<>{children}</>
			</div>
		</nav>
	);
}
