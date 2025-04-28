import React, { useEffect, useRef } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	TextInput,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TablerClose from '../svg/TablerClose';

import {
	CurrentWorkout as CurrentWorkoutType,
	getCurrentWorkout,
	addSetByWorkoutExerciseId,
	WorkoutExercise,
	removeSetByWorkoutExerciseId,
} from 'src/storage/storage';
import { ScrollView } from 'react-native-gesture-handler';
import TablerDelete from '../svg/TablerDelete';
import TablerMinus from '../svg/TablerMinus';
import TablerAdd from '../svg/TablerAdd';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RootStackParamList = {
	AddWorkout: undefined;
	Home: undefined;
};

export default function CurrentWorkout() {
	const currentWorkout = useRef<CurrentWorkoutType>(getCurrentWorkout());
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const [forceRender, setForceRender] = React.useState(false);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [
		updatingSetIndexAndWorkoutExercise,
		setUpdatingSetIndexAndWorkoutExercise,
	] = React.useState<{
		workoutExercise: WorkoutExercise;
		setIndex: number;
	} | null>(null);

	useEffect(() => {
		currentWorkout.current = getCurrentWorkout();
		setForceRender(!forceRender);
	}, []);

	const handleAddSet = (workoutExerciseId: string) => {
		addSetByWorkoutExerciseId(workoutExerciseId);
		currentWorkout.current = getCurrentWorkout();
		setForceRender(!forceRender);
	};

	const handleRemoveSet = (workoutExerciseId: string, setIndex: number) => {
		removeSetByWorkoutExerciseId(workoutExerciseId, setIndex);
		currentWorkout.current = getCurrentWorkout();
		setForceRender(!forceRender);
	};

	const handleEditSetPress = (
		workoutExercise: WorkoutExercise,
		setIndex: number
	) => {
		setUpdatingSetIndexAndWorkoutExercise({
			workoutExercise,
			setIndex,
		});
		setModalVisible(true);
	};

	return (
		<SafeAreaView className='flex-1 bg-base-100'>
			<View className='flex flex-row items-center justify-between px-4'>
				<TouchableOpacity
					onPress={() => {
						// navigation.;
					}}
				>
					<TablerClose color='white' width={28} height={28} />
				</TouchableOpacity>
				<Text className='text-2xl font-bold text-white'>
					Current Workout
				</Text>
				<TouchableOpacity
					onPress={() => {
						console.log(getCurrentWorkout());
					}}
				>
					<Text className='text-lg font-semibold text-white'>
						Finish
					</Text>
				</TouchableOpacity>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className='flex-1 px-6 pt-4'>
					{currentWorkout.current?.exercises &&
					currentWorkout.current.exercises?.length !== 0 ? (
						<View>
							{currentWorkout.current.exercises.map(
								(exercise) => (
									<View
										key={exercise.name}
										className='mb-4 rounded-xl h-fit flex'
									>
										<View className='flex flex-row items-center justify-between'>
											<View>
												<Text className='text-lg font-semibold text-white'>
													{exercise.name}
												</Text>
											</View>
											<View>
												<TouchableOpacity className='rounded-lg border border-base-200 p-1'>
													<Text className='text-xs text-white/50'>
														Unilateral
													</Text>
												</TouchableOpacity>
											</View>
										</View>
										<View className='w-full'>
											<View className='flex flex-row my-2'>
												<Text className='text-white font-medium w-1/4'>
													Set
												</Text>
												<Text className='text-white font-medium w-1/4'>
													Reps
												</Text>
												<Text className='text-white font-medium w-1/4'>
													Weight (lb)
												</Text>
											</View>
											{exercise.sets.map((set, index) => (
												<View
													key={index}
													className='flex flex-row items-center justify-between my-1'
												>
													<View className='flex flex-row items-center w-full'>
														<Text className='font-semibold text-white w-1/4'>
															{index + 1}
														</Text>
														<View className='w-1/4'>
															<TouchableOpacity
																onPress={() =>
																	handleEditSetPress(
																		exercise,
																		index
																	)
																}
																className='w-fit border border-base-200 rounded-lg py-2 px-3 mr-auto'
															>
																<Text className='text-white w-fit'>
																	{set.reps}
																</Text>
															</TouchableOpacity>
														</View>
														<View className='w-1/4'>
															<TouchableOpacity className='border border-base-200 rounded-lg py-2 px-3 mr-auto'>
																<Text className='text-white w-fit'>
																	{set.weight}
																</Text>
															</TouchableOpacity>
														</View>
														<View className='w-1/4 justify-end flex flex-row items-center'>
															<TouchableOpacity
																onPress={() =>
																	handleRemoveSet(
																		exercise.workoutExerciseId,
																		index
																	)
																}
															>
																<TablerDelete
																	color='white'
																	width={24}
																	height={24}
																/>
															</TouchableOpacity>
														</View>
													</View>
												</View>
											))}
											<TouchableOpacity
												className='mx-auto mt-2'
												onPress={() =>
													handleAddSet(
														exercise.workoutExerciseId
													)
												}
											>
												<Text className='text-primary font-semibold'>
													Add Set
												</Text>
											</TouchableOpacity>
										</View>
										<View className='h-[1px] w-full my-4 bg-base-200' />
									</View>
								)
							)}
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('AddWorkout')
								}
								className='w-[90%] mx-auto rounded-lg bg-primary p-2 flex flex-row items-center justify-center'
							>
								<Text className='text-white font-semibold text-lg'>
									Add Exercise
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<Text className='text-center text-white'>
							No exercises in current workout.
						</Text>
					)}
				</View>
			</ScrollView>
			<Modal
				animationType='fade'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<KeyboardAvoidingView>
					<TouchableOpacity
						activeOpacity={1}
						onPressOut={() => {
							setModalVisible(false);
						}}
						className='h-screen bg-black/50 flex flex-col justify-center items-center'
					>
						<TouchableWithoutFeedback>
							<View className='w-3/4 bg-base-100 rounded-lg p-4 shadow-lg'>
								<View className='flex flex-row justify-between items-center'>
									<Text className='text-white font-semibold text-lg'>
										{
											updatingSetIndexAndWorkoutExercise
												?.workoutExercise.name
										}
									</Text>
									<TouchableOpacity
										className='relative h-fit w-fit rounded-lg'
										onPress={() =>
											setModalVisible(!modalVisible)
										}
									>
										<TablerClose color='white' />
									</TouchableOpacity>
								</View>
								<View className='flex flex-row items-center justify-center my-4 '>
									<Text className='text-lg font-medium text-neutral w-1/4'>
										Reps
									</Text>
									<View className='flex flex-row items-center gap-3'>
										<TouchableOpacity>
											<TablerMinus color='white' />
										</TouchableOpacity>
										<TextInput
											className={`p-3 border-b border-b-base-200 focus:border-b-primary focus:border-b-2 transition-all`}
										/>
										<TouchableOpacity>
											<TablerAdd color='white' />
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</Modal>
		</SafeAreaView>
	);
}
