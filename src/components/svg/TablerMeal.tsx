import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'src/interfaces';

function TablerMeal(props: SvgProps) {
	return (
		<Svg width={28} height={28} viewBox='0 0 24 24' {...props}>
			<Path
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M4 11h16a1 1 0 011 1v.5c0 1.5-2.517 5.573-4 6.5v1a1 1 0 01-1 1H8a1 1 0 01-1-1v-1c-1.687-1.054-4-5-4-6.5V12a1 1 0 011-1m8-7a2.4 2.4 0 00-1 2 2.4 2.4 0 001 2m4-4a2.4 2.4 0 00-1 2 2.4 2.4 0 001 2M8 4a2.4 2.4 0 00-1 2 2.4 2.4 0 001 2'
			/>
		</Svg>
	);
}

export default TablerMeal;
