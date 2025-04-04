import React, { useEffect, useState } from 'react';
import {
	Modal,
	Text,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Keyboard,
	ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Meal, storage, addMeal, loadMeals } from '../../storage/storage';
import { useMacros } from '../../components/MacrosContext';

import CollapsibleDropdown from '../CollapsableDropdown';
import TablerNoMeat from '../svg/TablerNoMeat';
import TablerSearch from '../svg/TablerSearch';

export default function AddMealModel({
	modalVisible,
	setModalVisible,
}: {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [protein, setProtein] = useState('');
	const [fat, setFat] = useState('');
	const [carbs, setCarbs] = useState('');
	const [calories, setCalories] = useState('');
	const [mealName, setMealName] = useState('');

	const [pastMealSearch, setPastMealSearch] = useState('');

	const [pastMeals, setPastMeals] = useState<Meal[]>(
		storage.getString('meals')
			? JSON.parse(storage.getString('meals')!)
			: []
	);
	const [filteredMeals, setFilteredMeals] = useState(pastMeals);
	useEffect(() => {
		setFilteredMeals(
			pastMeals.filter((meal: Meal) =>
				meal.name.toLowerCase().includes(pastMealSearch.toLowerCase())
			)
		);
	}, [pastMealSearch, pastMeals]);

	useEffect(() => {
		setPastMeals(
			storage.getString('meals')
				? JSON.parse(storage.getString('meals')!)
				: []
		);
	}, [modalVisible]);

	const { addMacros } = useMacros();

	const handleNumericInput = (
		value: string,
		setter: React.Dispatch<React.SetStateAction<string>>
	) => {
		if (value === '') {
			setter('0');
			return;
		}
		const parsedValue = Math.max(0, parseFloat(value));
		setter(parsedValue.toString());
	};

	const handleSaveMeal = ({
		protein,
		fat,
		carbs,
		calories,
		pastMeal,
	}: {
		protein: string;
		fat: string;
		carbs: string;
		calories: string;
		pastMeal: boolean;
	}) => {
		const eatenProtein = parseFloat(protein) || 0;
		const eatenFat = parseFloat(fat) || 0;
		const eatenCarbs = parseFloat(carbs) || 0;
		const caloriesEaten = parseFloat(calories) || 0;

		addMacros(eatenProtein, eatenFat, eatenCarbs, caloriesEaten);
		const meal = {
			name: mealName,
			protein: eatenProtein,
			fat: eatenFat,
			carbs: eatenCarbs,
			calories: caloriesEaten,
			date: new Date().toISOString(),
		};

		if (!pastMeal) {
			const ret = addMeal(meal);
			console.log('Stuff', ret);
			setPastMeals(ret);
		}

		setMealName('');
		setProtein('');
		setFat('');
		setCarbs('');
		setCalories('');

		setModalVisible(false);
	};

	return (
		<Modal
			animationType='fade'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}
		>
			<View className='flex-1 justify-center items-center bg-black/50'>
				<View className='w-11/12 h-fit bg-base-100 rounded-lg shadow-lg p-4 relative'>
					<View className='flex flex-row justify-between items-center mb-3'>
						<Text className='text-2xl font-semibold text-neutral text-center'>
							Add Meal
						</Text>
						<TouchableOpacity
							className='relative h-8 w-8 rounded-lg'
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Svg height='100%' width='100%' viewBox='1 1 34 34'>
								<Path
									scale={1.5}
									fill='white'
									d='m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z'
								></Path>
							</Svg>
						</TouchableOpacity>
					</View>
					{/* Past Meals */}
					<CollapsibleDropdown title='Past Meals' defaultExpanded={1}>
						<KeyboardAvoidingView>
							{/* Past Meal Search */}
							<View className='flex flex-row items-center justify-between gap-2'>
								<TextInput
									className='py-3 mt-2 text-neutral max-w-[90%]'
									placeholder='│ Search for past meals...'
									placeholderTextColor='#aaa'
									keyboardType='default'
									value={pastMealSearch}
									onChangeText={(text) => {
										setPastMealSearch(text);
									}}
								/>
								<TablerSearch color='#ECF0F180' />
							</View>
							{/* Past Meals List */}
							{filteredMeals.length ? (
								<ScrollView className='bg-base-100 rounded-lg mb-4 w-full h-full max-h-48 relative'>
									{filteredMeals.map(
										(meal: Meal, index: number) => (
											<TouchableOpacity
												key={index}
												className='border-b border-neutral/50 p-3 flex flex-row justify-between items-end'
												onPress={() => {
													console.log(meal);
													setProtein(
														meal.protein.toString()
													);
													setFat(meal.fat.toString());
													setCarbs(
														meal.carbs.toString()
													);
													setCalories(
														meal.calories.toString()
													);
													setMealName(
														meal.name.toString()
													);

													handleSaveMeal({
														protein:
															meal.protein.toString(),
														fat: meal.fat.toString(),
														carbs: meal.carbs.toString(),
														calories:
															meal.calories.toString(),
														pastMeal: true,
													});
												}}
											>
												<Text className='text-neutral/80 font-semibold'>
													{meal.name}
												</Text>
												<Text className='text-neutral/50 text-xs font-semibold'>
													{meal.date.split('T')[0]}
												</Text>
											</TouchableOpacity>
										)
									)}
								</ScrollView>
							) : (
								<View className='flex flex-col items-center justify-center h-full max-h-48'>
									<TablerNoMeat color='#ECF0F180' />
									<Text className='text-neutral/50 text-lg'>
										No past meals found.
									</Text>
								</View>
							)}
						</KeyboardAvoidingView>
					</CollapsibleDropdown>

					{/* New Custom Meals */}
					<View className='my-4'>
						<CollapsibleDropdown
							title='Make Custom Meal'
							maxHeight={180}
						>
							<KeyboardAvoidingView
								className='flex flex-col'
								behavior={
									Platform.OS === 'ios'
										? 'padding'
										: undefined
								}
							>
								{/* Form Inputs */}
								<View className='bg-base-100 rounded-lg my-2 w-full relative'>
									<TextInput
										className='border border-neutral/50 rounded-lg p-3 my-2 text-neutral'
										placeholder='Meal Name'
										placeholderTextColor='#aaa'
										keyboardType='default'
										value={mealName}
										onChangeText={(text) => {
											setMealName(text);
										}}
									/>
									<View className='flex flex-row m-0 justify-between'>
										<TextInput
											className='border border-neutral/50 w-[49%] rounded-lg p-3 my-2 text-neutral'
											placeholder='Protein (g)'
											placeholderTextColor='#aaa'
											keyboardType='numeric'
											value={protein}
											onChangeText={(text) => {
												if (text == '') setProtein('');
												else if (
													isNaN(parseFloat(text))
												)
													return;
												else
													handleNumericInput(
														text,
														setProtein
													);
											}}
										/>
										<TextInput
											className='border border-neutral/50 rounded-lg w-[49%] p-3 my-2 text-neutral'
											placeholder='Carbs (g)'
											placeholderTextColor='#aaa'
											keyboardType='numeric'
											value={carbs}
											onChangeText={(text) => {
												if (text == '') setCarbs('');
												else if (
													isNaN(parseFloat(text))
												)
													return;
												else
													handleNumericInput(
														text,
														setCarbs
													);
											}}
										/>
									</View>
									<View className='flex flex-row m-0 justify-between'>
										<TextInput
											className='border border-neutral/50 w-[49%] rounded-lg p-3 my-2 text-neutral'
											placeholder='Fat (g)'
											placeholderTextColor='#aaa'
											keyboardType='numeric'
											value={fat}
											onChangeText={(text) => {
												if (text == '') setFat('');
												else if (
													isNaN(parseFloat(text))
												)
													return;
												else
													handleNumericInput(
														text,
														setFat
													);
											}}
										/>
										<TextInput
											className='border border-neutral/50 w-[49%] rounded-lg p-3 my-2 text-neutral'
											placeholder='Calories'
											placeholderTextColor='#aaa'
											keyboardType='numeric'
											value={calories}
											onChangeText={(text) => {
												if (text == '') setCalories('');
												else if (
													isNaN(parseFloat(text))
												)
													return;
												else
													handleNumericInput(
														text,
														setCalories
													);
											}}
										/>
									</View>
								</View>
							</KeyboardAvoidingView>
						</CollapsibleDropdown>
					</View>
					{/* Save Button */}
					<TouchableOpacity
						className='bg-primary rounded-full mt-auto p-2 w-fit hover:bg-primary-focus'
						onPress={() =>
							handleSaveMeal({
								protein: protein,
								fat: fat,
								carbs: carbs,
								calories: calories,
								pastMeal: false,
							})
						}
					>
						<Text className='text-neutral text-lg font-semibold mx-auto'>
							Save Meal
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
