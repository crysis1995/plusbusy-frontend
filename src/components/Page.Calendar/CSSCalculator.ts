type Settings = {
	resolution: number;
	startDay: number;
};

export default function CalculateGridColumns(
	start: { day: number; hour: number },
	end: { day: number; hour: number },
	settings: Settings = {
		resolution: 24,
		startDay: 2,
	}
) {
	const startCol = settings.startDay + (start.day - 1) * settings.resolution + start.hour;
	const endCol = settings.startDay + (end.day - 1) * settings.resolution + end.hour;

	return { start: startCol, end: endCol };
}
