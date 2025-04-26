import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearWorkoutGroups } from 'src/storage/storage';

import React, { useEffect } from 'react';

export function Log({ navigation }: { navigation: any }) {
	return (
		<SafeAreaView className='mt-auto flex h-full flex-col items-center justify-end bg-base-100'>
			<View className='w-[90%] space-y-4'>
				<TouchableOpacity
					className='items-center justify-center rounded-lg border-2 border-primary p-4'
					onPress={() => navigation.navigate('AddWorkout')}
				>
					<Text className='text-lg font-semibold text-white'>
						Log Workout
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className='items-center justify-center rounded-lg border-2 border-primary p-4'
					onPress={() => navigation.navigate('ViewGrouped')}
				>
					<Text className='text-lg font-semibold text-white'>
						View Grouped
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={clearWorkoutGroups}>
					<Text className='text-lg font-semibold text-white'>
						Clear Workouts
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
