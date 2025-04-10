import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
	Meal,
	getMealsEatenToday,
	removeMealEatenToday,
} from 'src/storage/storage';
import TablerNoMeat from '../svg/TablerNoMeat';
import ReanimatedSwipeable, {
	SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
	SharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TablerDelete from '../svg/TablerDelete';
import { useMacros } from '../MacrosContext';

export default function TodaysMealList({
	modalVisible,
	handleDeleteSliding,
}: {
	modalVisible: boolean;
	handleDeleteSliding: (isSliding: boolean) => void;
}) {
	const [meals, setMeals] = useState<Meal[]>(getMealsEatenToday());
	const reanimatedRef = useRef<SwipeableMethods>(null);
	const { removeMacros } = useMacros();

	useEffect(() => {
		const interval = setInterval(() => {
			setMeals(getMealsEatenToday());
		}, 60000); // Update every minute

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		setMeals(getMealsEatenToday());
	}, [modalVisible]);

	function RightAction(drag: SharedValue<number>, meal: Meal) {
		const styleAnimation = useAnimatedStyle(() => {
			return {
				transform: [{ translateX: drag.value + 70 }],
			};
		});

		return (
			<Reanimated.View style={styleAnimation}>
				<View className='w-16 h-full flex items-center justify-center'>
					<TouchableOpacity
						onPress={() => {
							const res = removeMealEatenToday(meal.id);
							if (res) {
								setMeals(getMealsEatenToday());
								removeMacros(
									meal.protein,
									meal.fat,
									meal.carbs,
									meal.calories
								);
							}
							drag.value = 0;
							handleDeleteSliding(false);
						}}
					>
						<TablerDelete color='white' />
					</TouchableOpacity>
				</View>
			</Reanimated.View>
		);
	}

	return (
		<View className='mx-4 mb-4'>
			<Text className='text-lg font-bold text-neutral mx-auto'>
				Meals Eaten Today
			</Text>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className='h-[250px]'
			>
				{meals.length === 0 ? (
					<View className='flex flex-col items-center justify-center h-[250px]'>
						<TablerNoMeat color='#ECF0F180' />
						<Text className='text-neutral/50 text-lg'>
							No meals eaten today.
						</Text>
					</View>
				) : (
					meals.map((meal, index) => (
						<GestureHandlerRootView key={index}>
							<ReanimatedSwipeable
								ref={reanimatedRef}
								friction={2}
								enableTrackpadTwoFingerGesture
								overshootLeft={false}
								leftThreshold={0}
								rightThreshold={50}
								renderRightActions={(
									_: SharedValue<number>,
									drag: SharedValue<number>
								) => {
									return RightAction(drag, meal);
								}}
								onSwipeableClose={() => {
									handleDeleteSliding(false);
								}}
								onSwipeableOpenStartDrag={() => {
									handleDeleteSliding(true);
								}}
								onSwipeableOpen={() => {
									handleDeleteSliding(true);
								}}
								onSwipeableWillOpen={() => {
									handleDeleteSliding(true);
								}}
								onSwipeableCloseStartDrag={() => {
									handleDeleteSliding(false);
								}}
								onSwipeableWillClose={() => {
									handleDeleteSliding(false);
								}}
							>
								<View
									key={index}
									className='flex flex-row justify-between items-center py-3 w-full'
								>
									<View className='flex flex-col w-full gap-1'>
										<View className='flex flex-row items-center justify-between'>
											<Text className='text-neutral/80 font-semibold'>
												{index + 1}. {meal.name}
											</Text>
											<Text className='text-neutral/50 text-xs font-semibold'>
												{new Date(
													meal.date
												).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</Text>
										</View>
										<View className='flex flex-wrap flex-row gap-2'>
											<View className='border rounded-full border-[#3BACB6] p-0.5 px-1 bg-[#3BACB680]'>
												<Text className='text-white/80 text-xs font-semibold'>
													Protein: {meal.protein}g
												</Text>
											</View>
											<View className='border rounded-full border-[#82DBD8] p-0.5 px-1 bg-[#82DBD880]'>
												<Text className='text-white/80 text-xs font-semibold'>
													Carbs: {meal.carbs}g
												</Text>
											</View>
											<View className='border rounded-full border-[#B3E8E5] p-0.5 px-1 bg-[#B3E8E580]'>
												<Text className='text-white/80 text-xs font-semibold'>
													Fat: {meal.fat}g
												</Text>
											</View>
											<View className='border rounded-full border-[#2F8F9D] p-0.5 px-1 bg-[#2F8F9D80]'>
												<Text className='text-white/80 text-xs font-semibold'>
													Calories: {meal.calories}
													kcal
												</Text>
											</View>
										</View>
									</View>
								</View>
							</ReanimatedSwipeable>
						</GestureHandlerRootView>
					))
				)}
			</ScrollView>
		</View>
	);
}
