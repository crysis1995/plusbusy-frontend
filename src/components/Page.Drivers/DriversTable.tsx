import React, { useState } from "react";
import { Driver } from "../../services/Api";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

const defaultData: Driver[] = [
	{
		Id: 1,
		Name: "Jan",
		Email: "jan.kowalski@gmail.com",
		Surname: "Kowalski",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 2,
		Name: "Adam",
		Email: "adam.nowak@gmail.com",
		Surname: "Nowak",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 3,
		Name: "Sasha",
		Email: null,
		Surname: "Drivskoj",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 1,
		Name: "Jan",
		Email: "jan.kowalski@gmail.com",
		Surname: "Kowalski",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 2,
		Name: "Adam",
		Email: "adam.nowak@gmail.com",
		Surname: "Nowak",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 3,
		Name: "Sasha",
		Email: null,
		Surname: "Drivskoj",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 1,
		Name: "Jan",
		Email: "jan.kowalski@gmail.com",
		Surname: "Kowalski",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 2,
		Name: "Adam",
		Email: "adam.nowak@gmail.com",
		Surname: "Nowak",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 3,
		Name: "Sasha",
		Email: null,
		Surname: "Drivskoj",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 1,
		Name: "Jan",
		Email: "jan.kowalski@gmail.com",
		Surname: "Kowalski",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 2,
		Name: "Adam",
		Email: "adam.nowak@gmail.com",
		Surname: "Nowak",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 3,
		Name: "Sasha",
		Email: null,
		Surname: "Drivskoj",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 1,
		Name: "Jan",
		Email: "jan.kowalski@gmail.com",
		Surname: "Kowalski",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 2,
		Name: "Adam",
		Email: "adam.nowak@gmail.com",
		Surname: "Nowak",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
	{
		Id: 3,
		Name: "Sasha",
		Email: null,
		Surname: "Drivskoj",
		IsEmailConfirmed: false,
		IsPhoneConfirmed: false,
		Phone: null,
	},
];

const columnsHelper = createColumnHelper<Driver>();

const columns = [
	columnsHelper.accessor("Name", {
		cell: (props) => props.getValue(),
		header: "Imię",
	}),
	columnsHelper.accessor("Surname", {
		cell: (props) => props.getValue(),
		header: "Nazwisko",
	}),
	columnsHelper.accessor("Phone", {
		cell: (props) => props.getValue(),
		header: "Telefon",
	}),
	columnsHelper.accessor("Email", {
		cell: (props) => props.getValue(),
	}),
	// columnsHelper.accessor("IsEmailConfirmed", {
	// 	cell: (props) => (props.getValue() ? "Tak" : "Nie"),
	// 	header: "Email potwierdzony?",
	// }),
	// columnsHelper.accessor("IsPhoneConfirmed", {
	// 	cell: (props) => (props.getValue() ? "Tak" : "Nie"),
	// 	header: "Telefon potwierdzony?",
	// }),
	columnsHelper.display({
		id: 'actions',
		header:"Actions",
		cell: props => <div >{props.row.original.Id}</div>,
	}),
];

const DriversTable: React.FC = function () {
	const [filters, setFilters] = useState(true);

	const [data, setData] = React.useState(() => [...defaultData]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<div className={""}>
			<div className="flex items-center">
				<div className="sm:flex-auto">
					<h1 className="text-xl font-semibold text-gray-900">Kierowcy</h1>
					<p className="mt-2 text-sm text-gray-700">Lista kierowców dodanych do bazy</p>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					test
				</div>
			</div>
			<div className="mt-8 shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 ">
				<table className="min-w-full divide-y divide-gray-300 h-50">
					<thead className="bg-gray-50 ">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										scope="col"
										className="p-4 text-left text-sm font-semibold text-gray-900"
									>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white overflow-y-scroll ">
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DriversTable;
