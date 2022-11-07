import React from "react";
import classNames from "classnames";

export default function CalendarPage() {
	const items = Array.from(Array(8).keys());
	return (
		<div className={"h-full bg-white flex flex-col"}>
			<div className={"text-xl p-3 font-medium"}>Kalendarz</div>
			<div className={"flex h-full w-full"}>
				<>
					{items.map((x) => (
						<div
							className={
								"first:min-w-[300px] w-full h-full first:border-l border-r border-t border-b border-gray-200 p-3 group"
							}
							key={x}
						>
							<div
								className={classNames("h-full ", {
									"bg-red-200": () => (x + 1) % 7 === 0,
								})}
							>
								{x + 1}
							</div>
						</div>
					))}
				</>
			</div>
		</div>
	);
}
