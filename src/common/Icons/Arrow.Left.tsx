import React from "react";
import { PropsWithClassName } from "../types";
import classNames from "classnames";

export default function ArrowLeft(props: PropsWithClassName<{}>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={classNames("w-5 h-5 stroke-gray-400 hover:stroke-gray-800", props.className)}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
		</svg>
	);
}
