import "";
import CalculateGridColumns from "./CSSCalculator";

describe("CSSCalculator", () => {
	describe("should return proper start and end column", () => {
		it("when day 1 and hour 0", () => {
			const result = CalculateGridColumns({ day: 1, hour: 0 }, { day: 1, hour: 3 });
			expect(result.start).toEqual(2)
			expect(result.end).toEqual(5)
		});
		it("when day 1 and hour 3", () => {
			const result = CalculateGridColumns({ day: 1, hour: 3 }, { day: 1, hour: 23 });
			expect(result.start).toEqual(5)
			expect(result.end).toEqual(25)
		});
		it("when day 1 and hour 3", () => {
			const result = CalculateGridColumns({ day: 2, hour: 0 }, { day: 3, hour: 3 });
			expect(result.start).toEqual(26)
			expect(result.end).toEqual(53)
		});
	})
});
