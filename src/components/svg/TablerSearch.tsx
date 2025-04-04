import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'src/interfaces';

function TablerSearch(props: SvgProps) {
	return (
		<Svg
			width={20}
			height={20}
			viewBox='0 0 24 24'
			fill='none'
			stroke={props.color || 'white'}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='icon icon-tabler icons-tabler-outline icon-tabler-search'
			{...props}
		>
			<Path d='M0 0h24v24H0z' stroke='none' />
			<Path d='M3 10a7 7 0 1014 0 7 7 0 10-14 0M21 21l-6-6' />
		</Svg>
	);
}

export default TablerSearch;
