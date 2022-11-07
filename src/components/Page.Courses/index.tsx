import React from "react";
import CoursesTable from "./CoursesTable";

export default function CoursesPage() {
	return (
		<div className="h-full bg-white flex flex-col">
			<div className={"p-3 flex flex-row justify-between"}>
				<div className={"flex flex-row w-fit items-center"}>
					<div className={"text-xl font-medium "}>Lista kursów</div>
					<div className="ml-3">
						<button
							className={
								"border border-blue-500 rounded-lg text-sm px-2 py-1 hover:bg-blue-500 hover:text-white"
							}
						>
							Dodaj kurs +
						</button>
					</div>
				</div>
				<div>
					<div className={"group inline-flex items-center"}>
						<span
							className={
								"text-sm invisible group-hover:visible p-3 group-hover:text-gray-400 font-medium"
							}
						>
							Edytuj
						</span>
						<button className={""}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6 stroke-gray-400 group-hover:stroke-black"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className={"p-3"}>
				<CoursesTable></CoursesTable>
			</div>
		</div>
	);
}
