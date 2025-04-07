import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Meal, getMealsEatenToday } from 'src/storage/storage';
import TablerNoMeat from '../svg/TablerNoMeat';

export default function TodaysMealList({
	modalVisible,
}: {
	modalVisible: boolean;
}) {
	const [meals, setMeals] = useState<Meal[]>(getMealsEatenToday());

	useEffect(() => {
		const interval = setInterval(() => {
			setMeals(getMealsEatenToday());
		}, 60000); // Update every minute

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		setMeals(getMealsEatenToday());
	}, [modalVisible]);

	useEffect(() => {
		console.log('MEals', meals);
	}, [meals]);

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
					<View className='flex flex-col items-center justify-center h-[250px] border'>
						<TablerNoMeat color='#ECF0F180' />
						<Text className='text-neutral/50 text-lg'>
							No meals eaten today.
						</Text>
					</View>
				) : (
					meals.map((meal, index) => (
						<View
							key={index}
							className='flex flex-row justify-between items-center py-3'
						>
							<View className='flex flex-col w-full gap-1'>
								<View className='flex flex-row items-center justify-between'>
									<Text className='text-neutral/80 font-semibold'>
										{index + 1}. {meal.name}
									</Text>
									<Text className='text-neutral/50 text-xs font-semibold'>
										{new Date(meal.date).toLocaleTimeString(
											[],
											{
												hour: '2-digit',
												minute: '2-digit',
											}
										)}
									</Text>
								</View>
								<View className='flex flex-wrap flex-row justify-between'>
									<Text className='text-secondary/50 text-xs font-semibold'>
										Protein: {meal.protein}g
									</Text>
									<Text className='text-secondary/50 text-xs font-semibold'>
										Carbs: {meal.carbs}g
									</Text>
									<Text className='text-secondary/50 text-xs font-semibold'>
										Fat: {meal.fat}g
									</Text>
									<Text className='text-secondary/50 text-xs font-semibold'>
										Calories: {meal.calories}kcal
									</Text>
								</View>
							</View>
						</View>
					))
				)}
			</ScrollView>
		</View>
	);
}
