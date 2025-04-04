import { createStackNavigator } from '@react-navigation/stack';

import { AddWorkout } from '../screens/alternative/addworkout';
import { ViewGrouped } from '../screens/alternative/viewgrouped';
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
    </Stack.Navigator>
  );
}
