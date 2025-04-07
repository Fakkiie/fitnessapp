import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'src/interfaces';

function TablerFlag(props: SvgProps) {
	return (
		<Svg width={28} height={28} viewBox='0 0 24 24' {...props}>
			<Path
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M5 5a5 5 0 017 0 5 5 0 007 0v9a5 5 0 01-7 0 5 5 0 00-7 0zm0 16v-7'
			/>
		</Svg>
	);
}

export default TablerFlag;
