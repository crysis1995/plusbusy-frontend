import { PropsWithClassName } from "../../common/types";
import React, { useContext } from "react";
import classNames from "classnames";
import { GridContext } from "./Grid";
import dayjs from "dayjs";
import { VerticalLine } from "./Grid.BorderLine";

type Props = {
	title: JSX.Element;
	dates: dayjs.Dayjs[];
	generateHoursEvery: number;
	highlightWhenWeekend: boolean;
} & PropsWithClassName<unknown>;

function Generate(startColumn: number, day: number, resolution: number) {
	return startColumn + day * resolution;
}

function GenerateHoursEveryNth(hours: number, resolution: number) {
	let output = [];
	const stopNumber = Math.floor(resolution / hours); //24 / 6 = 4

	for (let i = 0; i < stopNumber; i++) {
		output.push(i * hours + ":00");
	}
	return output;
}

export function GridHeader(props: Props) {
	const { headerRowSpan, startColumn, resolution } = useContext(GridContext);
	const hours = GenerateHoursEveryNth(props.generateHoursEvery, resolution);

	const weekendBackgroundClass = "bg-red-100";

	return (
		<>
			<div
				className={classNames(props.className || "", "border-r border-t row-span-2")}
				style={{ gridColumnStart: 1, gridColumnEnd: 1, gridRowStart: 1, gridRowEnd: headerRowSpan + 1 }}
			>
				{props.title}
			</div>
			<>
				{props.dates.map((e, index) => (
					<>
						<div
							className={classNames("border-t border-r flex flex-row items-center", {
								[weekendBackgroundClass]: [0, 6].includes(e.day()),
							})}
							style={{
								gridColumnStart: Generate(startColumn, index, resolution),
								gridColumnEnd: Generate(startColumn, index + 1, resolution),
								gridRow: 1,
							}}
						>
							<div className={"ml-1"}>{e.format("DD MMMM")}</div>
							<div className={"text-gray-500 text-sm ml-3"}>{e.format("ddd")}</div>
						</div>
						<>
							{hours.map((h, index2) => (
								<>
									<div
										className={classNames("border-t border-r text-xs z-10", {
											[weekendBackgroundClass]: [0, 6].includes(e.day()),
										})}
										style={{
											gridColumnStart:
												Generate(startColumn, index2, props.generateHoursEvery) +
												index * resolution,
											gridColumnEnd:
												Generate(startColumn, index2 + 1, props.generateHoursEvery) +
												index * resolution,
											gridRow: 2,
										}}
									>
										<div className="ml-1">{h}</div>
									</div>
									<VerticalLine
										className={classNames({
											[weekendBackgroundClass]: [0, 6].includes(e.day()),
										})}
										gridRow={"2 / 1000"}
										gridColumnStart={
											Generate(startColumn, index2, props.generateHoursEvery) + index * resolution
										}
										gridColumnEnd={
											Generate(startColumn, index2 + 1, props.generateHoursEvery) +
											index * resolution
										}
									/>
								</>
							))}
						</>
						<div className={classNames("border-t")} style={{ gridColumn: "1/-1", gridRow: "3" }} />
					</>
				))}
			</>
		</>
	);
}
