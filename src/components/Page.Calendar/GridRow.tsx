import React, { useContext } from "react";
import { GridContext } from "./Grid";
import classNames from "classnames";
import CalculateGridColumns from "./CSSCalculator";
import { HorizontalLine } from "./Grid.BorderLine";

type Props = {
	rowIndex: number;
};

export function GridRow(props: Props) {
	const context = useContext(GridContext);
	const currentRow = props.rowIndex + context.headerRowSpan + 1;
	const itemClass = CalculateGridColumns(
		{
			day: 1,
			hour: 10,
		},
		{ day: 5, hour: 14 }
	);

	return (
		<>
			<div className="py-2 border-r border-t" style={{ gridColumn: "1", gridRow: currentRow }}>
				pojazd 2
			</div>
			<div
				className={classNames("bg-blue-500 text-white p-1 rounded items-center flex z-10 my-3")}
				style={{
					gridColumnStart: itemClass.start,
					gridColumnEnd: itemClass.end,
					gridRow: currentRow,
				}}
			>
				<div className={"text-sm"}>10:00</div>
				<div className={"ml-3"}>test</div>
				<div className={"text-sm ml-auto"}>14:00</div>
			</div>
			<HorizontalLine currentRow={currentRow} />
		</>
	);
}
