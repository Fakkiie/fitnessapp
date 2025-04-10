module.exports = (api) => {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						'@': './src', // Path alias
					},
				},
			],
			'nativewind/babel',
			'react-native-reanimated/plugin',
		],
	};
};
