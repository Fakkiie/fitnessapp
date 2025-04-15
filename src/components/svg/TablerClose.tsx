import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'src/interfaces';

function TablerClose(props: SvgProps) {
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
			className='icon icon-tabler icons-tabler-outline icon-tabler-x'
			{...props}
		>
			<Path d='M0 0h24v24H0z' stroke='none' />
			<Path d='M18 6L6 18M6 6l12 12' />
		</Svg>
	);
}

export default TablerClose;
