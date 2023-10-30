import dayjs from "dayjs";
import durationPlugin, { Duration } from "dayjs/plugin/duration";
import isSameOrAfterPlugin from "dayjs/plugin/isSameOrAfter";
import isSameOrBeforePlugin from "dayjs/plugin/isSameOrBefore";
import { useCallback, useMemo, useState } from "react";
import { z } from "zod";

dayjs.extend(durationPlugin);
dayjs.extend(isSameOrAfterPlugin);
dayjs.extend(isSameOrBeforePlugin);

export const DateRangeDurationEnum = z.enum(["WEEK", "TWO_WEEKS", "MONTH"]);
export const DateRangeDurationWithCustomEnum = z.enum(["CUSTOM"]);

export class DateRange {
	private readonly startDate = dayjs();
	private readonly rangeDuration: z.mergeTypes<
		z.infer<typeof DateRangeDurationEnum>,
		z.infer<typeof DateRangeDurationWithCustomEnum>
	> = DateRangeDurationEnum.Values.WEEK;
	private readonly endDate: dayjs.Dayjs;

	constructor({
		rangeDuration,
		startDate,
		endDate,
	}: {
		rangeDuration?: z.mergeTypes<
			z.infer<typeof DateRangeDurationEnum>,
			z.infer<typeof DateRangeDurationWithCustomEnum>
		>;
		startDate?: dayjs.Dayjs;
		endDate?: dayjs.Dayjs;
	}) {
		rangeDuration && (this.rangeDuration = rangeDuration);
		startDate && (this.startDate = startDate);
		endDate && rangeDuration === DateRangeDurationWithCustomEnum.Values.CUSTOM
			? (this.endDate = endDate)
			: (this.endDate = this.getEndDate());
	}

	getEndDate() {
		return this.startDate.add(this.getDuration());
	}

	getDuration() {
		const durationMap: { [key in z.infer<typeof DateRangeDurationEnum>]: Duration } = {
			[DateRangeDurationEnum.Values.MONTH]: dayjs.duration(1, "months"),
			[DateRangeDurationEnum.Values.TWO_WEEKS]: dayjs.duration(14, "days"),
			[DateRangeDurationEnum.Values.WEEK]: dayjs.duration(7, "days"),
		};
		return durationMap[this.rangeDuration as z.infer<typeof DateRangeDurationEnum>];
	}

	generateDates() {
		const outputDates: dayjs.Dayjs[] = [];
		let currDate = this.startDate;
		while (true) {
			if (currDate.isSameOrAfter(this.endDate, "date")) {
				break;
			}
			outputDates.push(currDate);
			currDate = currDate.add(dayjs.duration(1, "days"));
		}
		return outputDates;
	}

	getDateRange(): DateRangeType {
		return { start: this.startDate, end: this.endDate };
	}
}

export default function useDateRange() {
	const [currentDate, setCurrentDate] = useState(dayjs());
	const [dateRangeDuration, setDateRangeDuration] = useState<z.infer<typeof DateRangeDurationEnum>>(
		DateRangeDurationEnum.Values.WEEK
	);
	const dateObject = new DateRange({
		startDate: currentDate,
		rangeDuration: dateRangeDuration,
	});

	const changePeriod = useMemo(() => {
		const daysToMoveMap: {
			[key in z.infer<typeof DateRangeDurationEnum>]: {
				count: number;
				type: dayjs.ManipulateType;
			};
		} = {
			[DateRangeDurationEnum.Values.WEEK]: { count: 7, type: "day" },
			[DateRangeDurationEnum.Values.TWO_WEEKS]: { count: 14, type: "days" },
			[DateRangeDurationEnum.Values.MONTH]: { count: 1, type: "months" },
		};

		const daysToMove = daysToMoveMap[dateRangeDuration];
		return {
			nextPeriod: () => setCurrentDate((current) => current.add(daysToMove.count, daysToMove.type)),
			previousPeriod: () => setCurrentDate((current) => current.subtract(daysToMove.count, daysToMove.type)),
		};
	}, [dateRangeDuration]);

	const setDateRange = useCallback((value: string) => {
		let result = DateRangeDurationEnum.safeParse(value);
		result.success && setDateRangeDuration(DateRangeDurationEnum.parse(result.data));
	}, []);

	const resetDate = useCallback(() => setCurrentDate(dayjs()), []);

	return {
		setDateRange,
		resetDate,
		dateRangeDurationType: dateRangeDuration,
		changePeriod,
		dateRange: dateObject.getDateRange(),
		datesList: dateObject.generateDates(),
	};
}

export type DateRangeType = { start: dayjs.Dayjs; end: dayjs.Dayjs };
