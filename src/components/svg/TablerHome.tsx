import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'src/interfaces';

function TablerHome(props?: SvgProps) {
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
			className='icon icon-tabler icons-tabler-outline icon-tabler-smart-home'
			{...props}
		>
			<Path d='M0 0h24v24H0z' stroke='none' />
			<Path d='M19 8.71l-5.333-4.148a2.666 2.666 0 00-3.274 0L5.059 8.71a2.665 2.665 0 00-1.029 2.105v7.2a2 2 0 002 2h12a2 2 0 002-2v-7.2c0-.823-.38-1.6-1.03-2.105M16 15c-2.21 1.333-5.792 1.333-8 0' />
		</Svg>
	);
}

export default TablerHome;
