import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
	FlatList,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Modal,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgComponent from 'src/components/svg/BackButton';

import exercises_json from '../../data/exercises.json';

import { Exercise, getWorkoutGroups, WorkoutGroup } from 'src/storage/storage';
import CollapsibleDropdown from '../CollapsableDropdown';
import TablerClose from '../svg/TablerClose';

const MUSCLE_GROUPS = [
	'abdominals',
	'biceps',
	'triceps',
	'shoulders',
	'chest',
	'lats',
	'traps',
	'calves',
	'abductors',
	'adductors',
	'middle back',
	'lower back',
	'glutes',
	'hamstrings',
	`quadriceps`,
	'forearms',
	'neck', // rename sternocalvical to neck
	'obliques',
];

export function AddWorkout() {
	const exercises: Exercise[] = exercises_json;

	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState('');
	const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
	const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
	const [workoutName, setWorkoutName] = useState('');
	const [workoutGroups, setWorkoutGroups] = useState<WorkoutGroup[]>([]);
	const [modalVisible, setModalVisible] = useState(true);
	const [selectedWorkout, setSelectedWorkout] = useState<WorkoutGroup | null>(
		null
	);

	const handleGroupPress = (group: string) => {
		setExpandedGroup((prev) => (prev === group ? null : group));
	};

	const handleGroupedWorkoutPress = (workoutGroup: WorkoutGroup) => {
		console.log(workoutGroup);
	};

	const handleSelectExercise = (exercise: Exercise) => {
		toggleExercise(exercise.name);
	};

	useEffect(() => {
		setWorkoutGroups(getWorkoutGroups());
	}, []);

	const toggleExercise = (exerciseName: string) => {
		setSelectedExercises((prev: Exercise[]) => {
			const exercise = exercises.find((e) => e.name === exerciseName);
			if (!exercise) return prev;

			if (prev.some((e) => e.name === exerciseName)) {
				const updatedExercises: Exercise[] = prev.filter(
					(e) => e.name !== exerciseName
				);
				return updatedExercises;
			} else {
				return [...prev, exercise];
			}
		});
	};

	const renderExerciseItem = ({ item }: { item: Exercise }) => {
		const selected = selectedExercises.find((e) => e.name === item.name);
		return (
			<View>
				<TouchableOpacity
					className={`rounded p-2 mt-2 ${selected ? 'bg-green-700' : 'bg-transparent'}`}
					onPress={() => handleSelectExercise(item)}
				>
					<Text className='text font-semibold text-white pb-1'>
						{item.name}
					</Text>
					<Text className='text-xs capitalize text-white'>
						{item.equipment}
					</Text>
				</TouchableOpacity>
				<View className='mt-2 h-[1px] w-full bg-gray-400 ' />
			</View>
		);
	};

	// search for exercises
	const searchResults = exercises.filter((ex) => {
		const q = searchQuery.toLowerCase();
		return (
			ex.name.toLowerCase().includes(q) ||
			ex.primaryMuscles.some((m) => m.toLowerCase().includes(q)) ||
			ex.secondaryMuscles.some((m) => m.toLowerCase().includes(q))
		);
	});

	const exercisesInGroup = (group: string) =>
		exercises.filter((ex) => ex.primaryMuscles.find((e) => e === group));

	return (
		<SafeAreaView className='flex-1 bg-base-100 px-4 pt-4 -mb-8'>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View className='mb-4 flex-row items-center justify-between'>
					<Text className='text-2xl font-bold text-white'>
						Log Workout
					</Text>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<SvgComponent />
					</TouchableOpacity>
				</View>

				<CollapsibleDropdown
					title='New Workout'
					maxHeight={500}
					paddingBottom={10}
				>
					{/* Search */}
					<TextInput
						className='mb-4 mt-2 rounded bg-white p-3 text-black'
						placeholder='Search exercises or muscles...'
						placeholderTextColor='#999'
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
					<ScrollView className='max-h-[75%]'>
						{/* Show search results if a character is in the search bar  */}
						{searchQuery.trim().length > 0 ? (
							<>
								{searchResults.length > 0 ? (
									<FlatList
										data={searchResults}
										keyExtractor={(item) => item.id}
										renderItem={renderExerciseItem}
										scrollEnabled={false}
									/>
								) : (
									<Text className='ml-2 text-sm text-white'>
										No matching exercises found.
									</Text>
								)}
							</>
						) : (
							// show expandable groups
							MUSCLE_GROUPS.map((group) => {
								const groupExercises = exercisesInGroup(group);

								return (
									<View key={group} className='mb-4'>
										<TouchableOpacity
											className='rounded bg-base-200 p-3'
											onPress={() =>
												handleGroupPress(group)
											}
										>
											<Text className='text-lg font-bold text-white capitalize'>
												{group}
											</Text>
										</TouchableOpacity>

										{expandedGroup === group &&
											groupExercises.length > 0 && (
												<FlatList
													data={groupExercises}
													keyExtractor={(item) =>
														item.id
													}
													renderItem={
														renderExerciseItem
													}
													scrollEnabled={false}
												/>
											)}
									</View>
								);
							})
						)}
					</ScrollView>
					<TouchableOpacity
						className={`rounded p-2 mt-4 mb-12 bg-primary ${selectedExercises.length === 0 ? 'opacity-50' : ' opacity-100'}`}
						disabled={selectedExercises.length === 0}
						onPress={() => setModalVisible(true)}
					>
						<Text className='text-neutral w-full text-center text-lg font-semibold'>
							Start Workout
						</Text>
					</TouchableOpacity>
				</CollapsibleDropdown>
				<View className='mt-4 py-4'>
					<Text className='text-lg text-white font-semibold mb-2'>
						Grouped Workouts
					</Text>

					<View>
						<ScrollView
							showsVerticalScrollIndicator={false}
							className='mb-12'
						>
							{workoutGroups.length === 0 ? (
								<Text className='text-center text-white'>
									No groups yet.
								</Text>
							) : (
								workoutGroups.map((group) => (
									<View className='mb-2' key={group.id}>
										<CollapsibleDropdown
											title={group.name}
											paddingBottom={10}
											holdDownToOpen={true}
											showCarret={false}
											onPress={() =>
												handleGroupedWorkoutPress(group)
											}
										>
											<View>
												{group.exercises.map(
													(exercise) => (
														<View
															key={exercise.id}
															className='rounded'
														>
															<View className='h-[1px] w-full bg-base-200 my-2' />
															<Text className='text font-semibold text-white pb-1'>
																{exercise.name}
															</Text>
															<Text className='text-xs capitalize text-white'>
																{
																	exercise.equipment
																}
															</Text>
														</View>
													)
												)}
											</View>
										</CollapsibleDropdown>
									</View>
								))
							)}
						</ScrollView>
					</View>
				</View>
			</ScrollView>

			{/* Start New Workout Modal */}
			{/* <Modal
				animationType='fade'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View className='flex-1 justify-center items-center bg-black/50'>
					<View className='w-11/12 h-fit bg-base-100 rounded-lg p-4 shadow-lg relative'>
						<View className='flex flex-row justify-between items-center'>
							<Text className='text-white font-semibold text-lg'>
								Start Workout
							</Text>
							<TouchableOpacity
								className='relative h-fit w-fit rounded-lg'
								onPress={() => setModalVisible(!modalVisible)}
							>
								<TablerClose color='white' />
							</TouchableOpacity>
						</View>
						<View className='h-[1px] w-full bg-base-200 my-2' />
						<View>
							<TextInput
								className='rounded-lg py-2 text-white px-3 w-full bg-base-200 mb-2'
								placeholder='│ Name your workout'
								placeholderTextColor='#999'
								value={workoutName}
								onChangeText={setWorkoutName}
							/>
						</View>
						<ScrollView className='max-h-96 rounded bg-base-200 border-base-200 border p-2'>
							{selectedExercises.map((exercise, index) => (
								<View key={exercise.id} className='rounded'>
									{index !== 0 && (
										<View className='h-[1px] w-full bg-base-100 my-2' />
									)}
									<Text className='text font-semibold text-white pb-1'>
										{exercise.name}
									</Text>
									<Text className='text-xs capitalize text-white'>
										{exercise.equipment}
									</Text>
								</View>
							))}
						</ScrollView>
						<TouchableOpacity className='mt-4 rounded p-2 bg-primary'>
							<Text className='w-full text-neutral text-lg font-semibold text-center'>
								Start Workout
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal> */}
		</SafeAreaView>
	);
}
