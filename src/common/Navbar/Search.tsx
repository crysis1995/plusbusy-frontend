import React from "react";

const Search = () => {
	return (
		<div className="flex flex-row group rounded px-2 py-1 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-4 h-4 stroke-gray-400"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>

			<input className="bg-transparent ml-2 text-gray-400 text-sm" />
		</div>
	);
};

export default Search;
