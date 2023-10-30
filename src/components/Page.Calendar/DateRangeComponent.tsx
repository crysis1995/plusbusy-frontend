import React, { useContext } from "react";
import { PropsWithClassName } from "../../common/types";
import CalendarContext from "./Calendar.Context";

export default function DateRangeComponent(props: PropsWithClassName<{}>) {
	const { start, end } = useContext(CalendarContext).dateRange;

	return (
		<span className={props.className}>
			{start.format("D MMM YYYY")} - {end.format("D MMM YYYY")}
		</span>
	);
}
