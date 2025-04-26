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
	children?: ReactNode;
	maxHeight?: number; // Optional prop to control dropdown height
	defaultExpanded?: 0 | 1; // Optional prop to control initial state
	noScrollChildren?: ReactNode;
	paddingBottom?: number;
	onPress?: any; // Optional prop for onPress event
	holdDownToOpen?: boolean; // Optional prop to control hold down to open
	onHoldDownPress?: any; // Optional prop for onHoldDownPress event
	delayLongPress?: number; // Optional prop for delayLongPress event
	showCarret?: boolean; // Optional prop to show caret
	className?: string; // Optional prop for additional class names
}

export default function CollapsibleDropdown({
	title,
	children,
	maxHeight, // Default max height if not provided
	defaultExpanded = 0, // Default to collapsed state
	noScrollChildren,
	paddingBottom = 0,
	onPress,
	holdDownToOpen = false,
	onHoldDownPress,
	delayLongPress = 200,
	showCarret = true,
}: CollapsibleDropdownProps) {
	const [expanded, setExpanded] = useState<boolean>(
		defaultExpanded === 0 ? false : true
	);
	const [contentHeight, setContentHeight] = useState<number>(0);
	const [measured, setMeasured] = useState(false);

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
				[0, maxHeight ? maxHeight : contentHeight] // Interpolating height based on progress
			),
			opacity: interpolate(progress.value, [0, 1], [0, 1]),
			paddingBottom: interpolate(
				progress.value,
				[0, 1],
				[0, paddingBottom]
			),
		};
	});

	return (
		<View
			className={`rounded-lg overflow-hidden px-4 py-2 border border-base-200`}
		>
			{!measured && (
				<View
					style={{ position: 'absolute', opacity: 0, zIndex: -1 }}
					onLayout={(event) => {
						setContentHeight(event.nativeEvent.layout.height);
						setMeasured(true);
					}}
				>
					{children}
				</View>
			)}
			<TouchableOpacity
				onPress={
					holdDownToOpen
						? expanded
							? toggleDropdown
							: onPress
								? onPress
								: undefined
						: onPress
							? onPress
							: toggleDropdown
				}
				onLongPress={
					holdDownToOpen
						? onHoldDownPress
							? onHoldDownPress
							: toggleDropdown
						: undefined
				}
				delayLongPress={onHoldDownPress ? delayLongPress : 300}
				className='flex flex-row items-center justify-between'
			>
				<Text className='font-semibold text-lg text-neutral'>
					{title}
				</Text>
				{showCarret && <TablerChevronDown />}
			</TouchableOpacity>

			{noScrollChildren ? noScrollChildren : null}

			{measured && (
				<Animated.View
					style={[animatedStyle]}
					className='overflow-hidden'
				>
					<View>{children}</View>
				</Animated.View>
			)}
		</View>
	);
}
