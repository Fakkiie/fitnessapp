import { createStackNavigator } from '@react-navigation/stack';
import { CreateGroup } from 'src/components/workout/creategroup';

import { AddWorkout } from '../components/workout/addworkout';
import ViewGrouped from '../components/workout/viewgrouped';
import { Log } from '../screens/Log/index';

const Stack = createStackNavigator();

export default function WorkoutStack() {
  return (
    <Stack.Navigator
      initialRouteName="Log"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Log" component={Log} />
      <Stack.Screen name="ViewGrouped" component={ViewGrouped} />
      <Stack.Screen name="AddWorkout" component={AddWorkout} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
    </Stack.Navigator>
  );
}
