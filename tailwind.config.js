/** @type {import("tailwindcss").Config} */
module.exports = {
	mode: "jit",
	content: ["node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			gridTemplateColumns: {
				"layout-week": "200px repeat(calc(24 * 7), minmax(0, 1fr))",
				"layout-2weeks": "200px repeat(calc(12 * 14), minmax(0, 1fr))",
			},
			gridTemplateRows: {
				"layout-10": "30px",
			},
			gridColumn: {
				"week-one-day": "span 24 / span 24",
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
