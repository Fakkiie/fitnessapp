import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'src/interfaces';

function TablerPlus(props: SvgProps) {
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
			className='icon icon-tabler icons-tabler-outline icon-tabler-plus'
			{...props}
		>
			<Path d='M0 0h24v24H0z' stroke='none' />
			<Path d='M12 5v14M5 12h14' />
		</Svg>
	);
}

export default TablerPlus;
