import React from "react";
import classNames from "classnames";
import { PropsWithClassName } from "../types";

export default function ArrowRight(props: PropsWithClassName<{}>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={classNames("w-5 h-5 stroke-gray-400 hover:stroke-gray-800", props.className)}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	);
}
