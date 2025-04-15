import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
	CreateGroup: undefined;
	// Add other routes here if needed
};
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getWorkoutGroups, WorkoutGroup } from 'src/storage/storage';

import SvgComponent from '../svg/BackButton';

export default function ViewGrouped() {
	const [groups, setGroups] = useState<WorkoutGroup[]>([]);
	const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	useEffect(() => {
		const loadGroups = () => {
			const storedGroups = getWorkoutGroups();
			console.log('Loaded Workout Groups:', storedGroups);
			setGroups(storedGroups);
		};
		loadGroups();
	}, []);

	const handleGroupPress = (groupId: string) => {
		setExpandedGroup((prev) => (prev === groupId ? null : groupId));
	};

	return (
		<SafeAreaView className='flex-1 bg-base-100'>
			<View className='flex-1 px-4 pb-28 pt-10 '>
				{/* Header */}
				<View className='mb-4 flex-row items-center justify-between'>
					<Text className='flex-1 text-center text-2xl font-bold text-white'>
						Grouped Workouts
					</Text>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<SvgComponent />
					</TouchableOpacity>
				</View>

				{/* Scrollable Groups */}
				<ScrollView showsVerticalScrollIndicator={false}>
					{groups.length === 0 ? (
						<Text className='text-center text-white'>
							No groups yet.
						</Text>
					) : (
						groups.map((group) => (
							<View
								key={group.id}
								className='mb-4 py-3 px-4 rounded-xl border border-white/20 bg-white/10 h-fit flex'
							>
								<TouchableOpacity
									className=''
									onPress={() => handleGroupPress(group.id!)}
								>
									<Text className='text-lg font-semibold text-white'>
										{group.name}
									</Text>
								</TouchableOpacity>

								<View className=' rounded-lg'>
									{expandedGroup === group.id &&
										group.exercises.map((exercise, i) => (
											<View>
												<View
													key={exercise.id}
													className='rounded p-1 bg-base-100 h-fit flex-row flex justify-between'
												>
													<View className='flex-col flex justify-evenly'>
														<Text className='font-medium text-white'>
															{exercise.name}
														</Text>
														<View>
															<Text className='text-xs font-light text-white capitalize'>
																{exercise.force +
																	' • ' +
																	exercise.equipment}
															</Text>
														</View>
													</View>
													<View className='flex flex-col max-w-[50%]'>
														<Text className='text-sm text-white capitalize text-right'>
															{exercise.primaryMuscles.join(
																', '
															)}
														</Text>
														<Text className='text-xs text-gray-300 text-right truncate'>
															{exercise.secondaryMuscles.join(
																', '
															)}
														</Text>
													</View>
												</View>
												{i <
													group.exercises.length -
														1 && (
													<View className='h-[1px] my-1 w-full bg-white/20' />
												)}
											</View>
										))}
								</View>
							</View>
						))
					)}
				</ScrollView>
			</View>

			{/* Fixed Bottom Button */}
			<View className='absolute inset-x-0 bottom-0 bg-base-100 px-4 py-5'>
				<TouchableOpacity
					className='items-center justify-center rounded-lg border-2 border-primary p-4'
					onPress={() => navigation.navigate('CreateGroup')}
				>
					<Text className='text-lg font-semibold text-white'>
						+ Create New Group
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
