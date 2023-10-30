import React from "react";
import useDateRange, { DateRangeDurationEnum } from "../../utils/Calendar/DateRange";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import { Course } from "../../services/Api.types";
import DateRangeComponent from "./DateRangeComponent";
import { Grid } from "./Grid";
import { GridHeader } from "./GridHeader";
import { GridRow } from "./GridRow";
import CalendarContext from "./Calendar.Context";
import Icons from "../../common/Icons";

export default function CalendarPage() {
	dayjs.locale("pl");

	const { setDateRange, dateRange, datesList, dateRangeDurationType, changePeriod, resetDate } = useDateRange();

	const vehicles: Course[] = [
		{
			Id: 14123,
			Vehicle: {
				Id: 51235123,
				Plates: "WS GG1232",
				CustomName: "Test Name",
			},
			Event: {
				Name: "Wycieczka Gdańsk",
				StartDate: "15-07-2023 8:00",
				EndDate: "18-07-2023 22:00",
			},
		},
	];

	return (
		<CalendarContext.Provider value={{ dateRange }}>
			<div className={"h-full bg-white flex flex-col"}>
				<div className={"flex flex-row p-3"}>
					<div>
						<span className={"inline-flex"}>
							<button onClick={changePeriod.previousPeriod} className={"mr-2"}>
								<Icons.ArrowLeft />
							</button>
							<DateRangeComponent className={"font-bold"} />
							<button onClick={changePeriod.nextPeriod} className={"ml-2"}>
								<Icons.ArrowRight />
							</button>
							<button
								onClick={resetDate}
								className={
									"ml-6 border-0 rounded-md bg-blue-500 active:bg-blue-600 text-white px-2 py select-none"
								}
							>
								Dziś
							</button>
						</span>
					</div>

					<select
						onChange={(e) => setDateRange(e.target.value)}
						className={"text-sm border-0 active:border-0 p-1 ml-auto"}
					>
						<option value={DateRangeDurationEnum.Values.WEEK}>Tydzień</option>
						<option value={DateRangeDurationEnum.Values.TWO_WEEKS}>Dwa tygodnie</option>
						<option value={DateRangeDurationEnum.Values.MONTH}>Miesiąc</option>
					</select>
				</div>
				<Grid className={"grid-cols-layout-week grid-rows-layout-10 justify-items-stretch place-items-stretch"}>
					<GridHeader
						generateHoursEvery={6}
						className={"items-center justify-center flex"}
						title={<div className={"font-bold"}>Pojazdy</div>}
						dates={datesList}
						highlightWhenWeekend
					/>
					<>
						<GridRow rowIndex={0} />
					</>
					{/*TODO dodac zabezpieczenie ze jak pole jest za duze to zeby tekst sie chował*/}
				</Grid>
			</div>
		</CalendarContext.Provider>
	);
}
