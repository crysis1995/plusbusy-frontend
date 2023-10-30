import React from "react";

export const TextInput = ({
	type,
	placeholder = "",
	ref = undefined,
}: {
	type: React.HTMLInputTypeAttribute;
	placeholder?: string;
	ref?: React.LegacyRef<HTMLInputElement>;
}) => {
	return (
		<input
			className="block w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-blue-800 placeholder:text-slate-400"
			type={type}
			placeholder={placeholder}
			ref={ref}
		/>
	);
};
