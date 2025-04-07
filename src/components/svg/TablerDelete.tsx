import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'src/interfaces';

function TablerDelete(props: SvgProps) {
	return (
		<Svg width={32} height={32} viewBox='0 0 24 24' {...props}>
			<Path
				fill='none'
				stroke='white'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3'
			/>
		</Svg>
	);
}

export default TablerDelete;
