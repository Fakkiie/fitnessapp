import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'src/interfaces';

function TablerBarbell(props?: SvgProps) {
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
			className='icon icon-tabler icons-tabler-outline icon-tabler-barbell'
			{...props}
		>
			<Path d='M0 0h24v24H0z' stroke='none' />
			<Path d='M2 12h1M6 8H4a1 1 0 00-1 1v6a1 1 0 001 1h2M6 7v10a1 1 0 001 1h1a1 1 0 001-1V7a1 1 0 00-1-1H7a1 1 0 00-1 1zM9 12h6M15 7v10a1 1 0 001 1h1a1 1 0 001-1V7a1 1 0 00-1-1h-1a1 1 0 00-1 1zM18 8h2a1 1 0 011 1v6a1 1 0 01-1 1h-2M22 12h-1' />
		</Svg>
	);
}

export default TablerBarbell;
