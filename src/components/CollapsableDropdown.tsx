import React, { useState, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	interpolate,
} from 'react-native-reanimated';

import TablerChevronDown from './svg/TablerChevronDown';

// Props type definition
interface CollapsibleDropdownProps {
	title: string;
	children: ReactNode;
	maxHeight?: number; // Optional prop to control dropdown height
	defaultExpanded?: 0 | 1; // Optional prop to control initial state
	noScrollChildren?: ReactNode;
}

export default function CollapsibleDropdown({
	title,
	children,
	maxHeight = 250, // Default max height if not provided
	defaultExpanded = 0, // Default to collapsed state
	noScrollChildren,
}: CollapsibleDropdownProps) {
	const [expanded, setExpanded] = useState<boolean>(
		defaultExpanded === 0 ? false : true
	);
	const progress = useSharedValue<number>(defaultExpanded);

	const toggleDropdown = () => {
		const next = expanded ? 0 : 1;
		setExpanded(!expanded);
		progress.value = withTiming(next, { duration: 300 });
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			height: interpolate(
				progress.value,
				[0, 1],
				[0, maxHeight] // Interpolating height based on progress
			),
			opacity: interpolate(progress.value, [0, 1], [0, 1]),
		};
	});

	return (
		<View className='rounded-lg overflow-hidden px-4 py-2 border border-base-200'>
			<TouchableOpacity
				onPress={toggleDropdown}
				className='flex flex-row items-center justify-between'
			>
				<Text className='font-semibold text-lg text-neutral'>
					{title}
				</Text>
				<TablerChevronDown />
			</TouchableOpacity>

			{noScrollChildren ? noScrollChildren : null}

			<Animated.View
				style={[animatedStyle]}
				className={'overflow-y-scroll'}
			>
				<View>{children}</View>
			</Animated.View>
		</View>
	);
}
