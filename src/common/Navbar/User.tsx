import React from "react";

type Props = {
	userName?: string;
};

export default function User(props: Props) {
	return (
		<div className="relative flex flex-row items-center font-medium">
			<button className={"flex flex-row items-center"}>
				<div>{props.userName || ""}</div>
				{/*<div className={"ml-2"}>*/}
				{/*	<svg*/}
				{/*		xmlns="http://www.w3.org/2000/svg"*/}
				{/*		fill="none"*/}
				{/*		viewBox="0 0 24 24"*/}
				{/*		strokeWidth="1.5"*/}
				{/*		stroke="currentColor"*/}
				{/*		className="w-4 h-4"*/}
				{/*	>*/}
				{/*		<path*/}
				{/*			strokeLinecap="round"*/}
				{/*			strokeLinejoin="round"*/}
				{/*			d="M19.5 8.25l-7.5 7.5-7.5-7.5"*/}
				{/*		/>*/}
				{/*	</svg>*/}
				{/*</div>*/}
			</button>
		</div>
	);
}
