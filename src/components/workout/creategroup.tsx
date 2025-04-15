import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
	FlatList,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgComponent from 'src/components/svg/BackButton';
import { addWorkoutGroup, Exercise } from 'src/storage/storage';

import exercises_json from '../../data/exercises.json';

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
	'middle back',
	'glutes',
	'hamstrings',
	'lower back',
	'adductors',
	'quadriceps',
	'forearms',
	'neck',
	'obliques',
];

export function CreateGroup() {
	const exercises: Exercise[] = exercises_json;
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState('');
	const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
	const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
	const [groupName, setGroupName] = useState('');

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

	const saveGroup = () => {
		if (groupName.trim() && selectedExercises.length > 0) {
			addWorkoutGroup({
				name: groupName.trim(),
				exercises: selectedExercises,
			});
			navigation.goBack();
		}
	};

	const handleGroupPress = (group: string) => {
		setExpandedGroup((prev) => (prev === group ? null : group));
	};

	const handleSelectExercise = (exercise: Exercise) => {
		toggleExercise(exercise.name);
	};

	const renderExerciseItem = ({ item }: { item: Exercise }) => {
		const selected = selectedExercises.find((e) => e.name === item.name);
		return (
			<View>
				<TouchableOpacity
					className={`rounded p-2 mt-2 ${
						selected ? 'bg-green-700' : 'bg-transparent'
					}`}
					onPress={() => handleSelectExercise(item)}
				>
					<Text className='text-lg font-bold text-white'>
						{item.name}
					</Text>
					<Text className='text-sm capitalize text-white'>
						{item.primaryMuscles.join(', ')} | {item.equipment}
					</Text>
					<Text className='text-xs capitalize text-white'>
						{item.force} • {item.mechanic}
					</Text>
				</TouchableOpacity>
				<View className='mt-2 h-[1px] w-full bg-gray-400 ' />
			</View>
		);
	};

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
		<SafeAreaView className='flex-1 bg-base-100 p-4'>
			{/* Header */}
			<View className='mb-4 flex-row items-center justify-between'>
				<Text className='text-2xl font-bold text-white'>
					Create Group
				</Text>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<SvgComponent />
				</TouchableOpacity>
			</View>

			{/* Search */}
			<TextInput
				className='mb-4 rounded bg-white p-3 text-black'
				placeholder='Search exercises or muscles...'
				placeholderTextColor='#999'
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			<ScrollView showsVerticalScrollIndicator={false}>
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
					MUSCLE_GROUPS.map((group) => {
						const groupExercises = exercisesInGroup(group);
						const capitalized =
							group.charAt(0).toUpperCase() + group.slice(1);

						return (
							<View key={group} className='mb-4'>
								<TouchableOpacity
									className='rounded bg-base-200 p-3'
									onPress={() => handleGroupPress(group)}
								>
									<Text className='text-lg font-bold text-white'>
										{capitalized}
									</Text>
								</TouchableOpacity>

								{expandedGroup === group &&
									groupExercises.length > 0 && (
										<FlatList
											data={groupExercises}
											keyExtractor={(item) => item.id}
											renderItem={renderExerciseItem}
											scrollEnabled={false}
										/>
									)}
							</View>
						);
					})
				)}
			</ScrollView>

			{selectedExercises.length > 0 && (
				<KeyboardAvoidingView behavior='padding' className='mt-4'>
					<Text className='mb-2 text-white'>Group Name</Text>
					<TextInput
						placeholder='e.g., Push Day'
						placeholderTextColor='#ccc'
						value={groupName}
						onChangeText={setGroupName}
						className='mb-2 rounded-md bg-white px-4 py-2 text-black'
					/>
					<TouchableOpacity
						onPress={saveGroup}
						className='rounded-lg bg-primary p-3'
					>
						<Text className='text-center font-semibold text-white'>
							Save Group
						</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			)}
		</SafeAreaView>
	);
}
