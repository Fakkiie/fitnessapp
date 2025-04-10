/* eslint-disable @typescript-eslint/no-use-before-define */
import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
// import { SafeAreaView } from "react-native-safe-area-context";
import AddMealModel from 'src/components/nutrition/AddMealModel';

import Nutrition from '../../components/Nutrition';
import Macro from '../../components/Macro';
import TodaysMealList from 'src/components/nutrition/TodaysMealList';
import {
	clearMeals,
	clearMealsEatenToday,
	resetMacros,
} from 'src/storage/storage';
import TablerPlus from 'src/components/svg/TablerPlus';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

const getCurrentDate = () => {
	const today = new Date();
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return `Today: ${new Intl.DateTimeFormat('en-US', options).format(today)}`;
};

export default function NutritionMainScreen() {
	const [modalVisible, setModalVisible] = useState(false);
	const isSlidingRef = React.useRef(false);
	const [isSlidingState, setIsSlidingState] = useState(false);

	const progress = useSharedValue(1);

	function handleDeleteSliding(isSliding: boolean) {
		isSlidingRef.current = isSliding;
		setIsSlidingState(isSliding);
		const next = isSlidingRef.current ? 0 : 1;
		progress.value = withTiming(next, { duration: 300 });
	}

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(progress.value, [0, 1], [0, 1]),
		};
	});

	return (
		<SafeAreaView className='flex h-full flex-col bg-base-100'>
			<Text className='z-10 mx-8 h-fit text-lg font-bold text-neutral'>
				{getCurrentDate()}
			</Text>

			<View className='h-[1px] bg-neutral/20 w-[90%] my-4 mx-auto' />
			<View className='flex flex-col items-center'>
				<Nutrition />
				<Macro />
			</View>

			<View className='relative'>
				<View className='h-[1px] bg-neutral/20 w-[90%] my-4 mx-auto' />
				<TodaysMealList
					modalVisible={modalVisible}
					handleDeleteSliding={handleDeleteSliding}
				/>

				{/* fab */}
				<Animated.View
					style={[animatedStyle]}
					pointerEvents={isSlidingState ? 'none' : 'auto'}
				>
					<TouchableOpacity
						className={`mx-auto h-12 w-12 bg-primary rounded-full justify-center items-center shadow-lg absolute bottom-6 right-6 ${
							isSlidingRef.current
								? 'pointer-events-none'
								: 'pointer-events-auto'
						}`}
						onPress={() => {
							if (isSlidingRef.current) return;
							setModalVisible(true);
						}}
					>
						<TablerPlus color='white' />
					</TouchableOpacity>
				</Animated.View>
			</View>
			<View className='flex flex-row justify-between items-center mx-12 mb-4'>
				<TouchableOpacity className='' onPress={() => clearMeals()}>
					<Text className='text-center text-primary text-sm font-semibold'>
						Wipe Meals
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className=''
					onPress={() => clearMealsEatenToday()}
				>
					<Text className='text-center text-primary text-sm font-semibold'>
						Wipe Meals Eaten
					</Text>
				</TouchableOpacity>
				<TouchableOpacity className='' onPress={() => resetMacros()}>
					<Text className='text-center text-primary text-sm font-semibold'>
						Reset Macros
					</Text>
				</TouchableOpacity>
			</View>
			<AddMealModel
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
		</SafeAreaView>
	);
}
