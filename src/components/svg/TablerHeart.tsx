import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'src/interfaces';

function TablerHeart(props: SvgProps) {
	return (
		<Svg width={28} height={28} viewBox='0 0 24 24' {...props}>
			<Path
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M19.5 12.572L12 20l-7.5-7.428A5 5 0 1112 6.006a5 5 0 117.5 6.572'
			/>
		</Svg>
	);
}

export default TablerHeart;
