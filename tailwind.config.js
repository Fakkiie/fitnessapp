/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#0D7377',
				'primary-content': '#323232',
				'primary-focus': '#0a5659',
				secondary: '#14FFEC',
				'secondary-content': '#323232',
				accent: 'var(--accent)',
				'accent-content': '#323232',
				neutral: '#ECF0F1',
				'neutral-content': '#323232',
				success: '#A5DD9B',
				'success-content': '#323232',
				warning: 'var(--warning)',
				'warning-content': '#323232',
				danger: 'var(--danger)',
				'danger-content': '#323232',
				info: 'var(--info)',
				'info-content': '#323232',
				'base-100': '#212121',
				'base-200': '#323232',
				'base-300': '#d3d3d3',
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
		},
	},
	plugins: [],
};
