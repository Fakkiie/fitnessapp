import { createStackNavigator } from '@react-navigation/stack';
import { CreateGroup } from 'src/components/workout/CreateGroup';

import { AddWorkout } from '../components/workout/AddWorkout';
import ViewGrouped from '../components/workout/ViewGrouped';
import { Log } from '../screens/Log/index';
import CurrentWorkout from '../components/workout/CurrentWorkout';

import { useEffect, useRef } from 'react';
import {
	CurrentWorkout as CurrentWorkoutType,
	getCurrentWorkout,
} from 'src/storage/storage';

const Stack = createStackNavigator();

export default function WorkoutStack() {
	const hasCurrentWorkout = useRef<boolean>(
		getCurrentWorkout() ? true : false
	);
	useEffect(() => {
		const currentWorkout: CurrentWorkoutType = getCurrentWorkout();
		console.log('Current Workout', currentWorkout?.exercises);
		if (currentWorkout) {
			hasCurrentWorkout.current = true;
		} else {
			hasCurrentWorkout.current = false;
		}
	}, []);

	return (
		<Stack.Navigator
			initialRouteName={
				hasCurrentWorkout.current ? 'CurrentWorkout' : 'Log'
			}
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
			}}
		>
			<Stack.Screen name='Log' component={Log} />
			<Stack.Screen name='CurrentWorkout' component={CurrentWorkout} />
			<Stack.Screen name='ViewGrouped' component={ViewGrouped} />
			<Stack.Screen name='AddWorkout' component={AddWorkout} />
			<Stack.Screen name='CreateGroup' component={CreateGroup} />
		</Stack.Navigator>
	);
}
