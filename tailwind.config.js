/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#0D7377",
				"primary-content": "#323232",
				secondary: "#14FFEC",
				"secondary-content": "#323232",
				accent: "var(--accent)",
				"accent-content": "var(--accent-content)",
				neutral: "#ECF0F1",
				"neutral-content": "#323232",
				success: "#A5DD9B",
				"success-content": "#323232",
				warning: "#F6F193",
				"warning-content": "#323232",
				danger: "#FF8080",
				"danger-content": "#323232",
				info: "#7BD3EA",
				"info-content": "var(--info-content)",
				"base-100": "#212121",
				"base-200": "#323232",
				"base-300": "var(--base300)",
				background: "#212121",
				foreground: "#323232",
			},
		},
	},
	plugins: [],
};
