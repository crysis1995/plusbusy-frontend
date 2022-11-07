import React from "react";
import DriversTable from "./DriversTable";

const people = [
	{ name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
	// More people...
]

function Example() {
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-xl font-semibold text-gray-900">Users</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all the users in your account including their name, title, email and role.
					</p>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						type="button"
						className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
					>
						Add user
					</button>
				</div>
			</div>
			<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
				<table className="min-w-full divide-y divide-gray-300">
					<thead className="bg-gray-50">
					<tr>
						<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
							Name
						</th>
						<th
							scope="col"
							className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
						>
							Title
						</th>
						<th
							scope="col"
							className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
						>
							Email
						</th>
						<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
							Role
						</th>
						<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
							<span className="sr-only">Edit</span>
						</th>
					</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
					{people.map((person) => (
						<tr key={person.email}>
							<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
								{person.name}
								<dl className="font-normal lg:hidden">
									<dt className="sr-only">Title</dt>
									<dd className="mt-1 truncate text-gray-700">{person.title}</dd>
									<dt className="sr-only sm:hidden">Email</dt>
									<dd className="mt-1 truncate text-gray-500 sm:hidden">{person.email}</dd>
								</dl>
							</td>
							<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{person.title}</td>
							<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{person.email}</td>
							<td className="px-3 py-4 text-sm text-gray-500">{person.role}</td>
							<td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
								<a href="#" className="text-indigo-600 hover:text-indigo-900">
									Edit<span className="sr-only">, {person.name}</span>
								</a>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	)
}




const DriversPage: React.FC = () => {
	return (
		<div className={"h-full bg-white flex flex-col"}>
			<div className={"flex flex-row justify-between"}>
				<div className={"flex flex-row w-fit items-center"}>
					<div className={"text-xl font-medium "}>Lista kierowców</div>
					<button className="ml-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6 stroke-gray-400 hover:stroke-gray-600"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
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
			<div className={"pt-3"}>
				{/*<Example/>*/}
				<DriversTable />
			</div>
		</div>
	);
};

export default DriversPage;
