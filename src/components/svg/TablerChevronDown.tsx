import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TablerChevronDown() {
	return (
		<Svg width={24} height={24} viewBox='0 0 24 24'>
			<Path
				fill='none'
				stroke='white'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M6 9l6 6 6-6'
			/>
		</Svg>
	);
}

export default TablerChevronDown;
