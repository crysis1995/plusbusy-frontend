import React from "react";
import { DateRangeType } from "../../utils/Calendar/DateRange";
import dayjs from "dayjs";

type ValueType = {
	dateRange: DateRangeType;
};

const CalendarContext = React.createContext<ValueType>({
	dateRange: { start: dayjs(), end: dayjs() },
});

export default CalendarContext;
