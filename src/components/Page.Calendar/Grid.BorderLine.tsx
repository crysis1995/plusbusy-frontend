import React from "react";
import classNames from "classnames";
import { PropsWithClassName } from "../../common/types";

function HorizontalLine({ currentRow }: { currentRow: number }) {
	return <div className={"border-t"} style={{ gridColumn: "1/-1", gridRow: currentRow }} />;
}

type Props = {
	gridColumnStart: number | string;
	gridColumnEnd: number | string;
	gridRow: string | number;
};

function VerticalLine(props: PropsWithClassName<Props>) {
	return (
		<div
			className={classNames("border-r", props.className)}
			style={{
				gridColumnStart: props.gridColumnStart,
				gridColumnEnd: props.gridColumnEnd,
				gridRow: props.gridRow,
			}}
		/>
	);
}

export {
	VerticalLine,
	HorizontalLine,
};
