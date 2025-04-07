/* eslint-disable @typescript-eslint/no-use-before-define */
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import { useMacros } from './MacrosContext';
import TablerFlag from './svg/TablerFlag';
import TablerMeal from './svg/TablerMeal';
import TablerHeart from './svg/TablerHeart';

export default function Nutrition() {
	// Get global macros state
	const { totalCalories } = useMacros();

	const caloriesEaten = totalCalories; // Use the global value for calories eaten
	const caloriesBurned = 600; // Assuming calories burned is still static for now
	const goalCalories = 2500 + caloriesBurned; // Example goal calories
	const caloriesLeft = Math.max(0, goalCalories - caloriesEaten); // Ensure non-negative remaining calories

	// Calculate progress circle values
	const percentage = (caloriesEaten / goalCalories) * 100;
	const circumference = 2 * Math.PI * 50; // Circle circumference
	const strokeDasharray = circumference * (percentage / 100);

	return (
		<View className='flex items-center justify-center'>
			{/* Box with a slightly different color */}
			<View className='mx-10 flex h-fit flex-col items-center rounded-lg bg-base-100'>
				<Text className='text-xl font-bold text-white'>Calories</Text>
				<View className='mx-4 flex flex-row items-center justify-between'>
					<View className='relative flex flex-col items-center justify-center'>
						<Svg width='120' height='130' viewBox='0 0 120 130'>
							{/* Background circle */}
							<Circle
								cx='50%'
								cy='50%'
								r='50'
								stroke='#323232'
								strokeWidth='11'
								fill='none'
							/>
							{/* Progress circle */}
							<Circle
								cx='50%'
								cy='50%'
								r='50'
								stroke='#2F8F9D'
								strokeWidth='11'
								fill='none'
								strokeDashoffset={78}
								strokeDasharray={`${strokeDasharray} ${circumference - strokeDasharray}`}
								strokeLinecap='round'
							/>
						</Svg>
						{/* Remaining Calories */}
						<View className='absolute'>
							<Text className='text-xs font-bold text-white'>
								Remaining
							</Text>
							<Text className='text-center text-2xl font-bold text-white'>
								{caloriesLeft}
							</Text>
						</View>
					</View>

					{/* Calories Information */}
					<View className='mt-5 items-start justify-center px-5'>
						<View className='mb-3 flex flex-row items-center gap-2'>
							<TablerFlag color='#328E6E' />
							<Text className='text-lg font-bold text-white'>
								Goal: {goalCalories}
							</Text>
						</View>

						<View className='mb-3 flex flex-row items-center gap-2'>
							<TablerMeal color='#67AE6E' />
							<Text className='text-lg font-bold text-white'>
								Eaten: {caloriesEaten}
							</Text>
						</View>

						<View className='mb-3 flex flex-row items-center gap-2'>
							<TablerHeart color='#90C67C' />
							<Text className='text-lg font-bold text-white'>
								Exercise: {caloriesBurned}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
