import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'src/interfaces';

function TablerAnalyze(props?: SvgProps) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='icon icon-tabler icons-tabler-outline icon-tabler-analyze'
			{...props}
		>
			<Path d='M0 0h24v24H0z' stroke='none' />
			<Path d='M20 11a8.1 8.1 0 00-6.986-6.918A8.095 8.095 0 004.995 8M4 13a8.1 8.1 0 0015 3' />
			<Path d='M18 16a1 1 0 102 0 1 1 0 10-2 0M4 8a1 1 0 102 0 1 1 0 10-2 0M9 12a3 3 0 106 0 3 3 0 10-6 0' />
		</Svg>
	);
}

export default TablerAnalyze;
