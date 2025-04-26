import { createStackNavigator } from '@react-navigation/stack';

import { MacrosProvider } from '../components/MacrosContext';
import AddMealScreen from '../screens/alternative/addmeal';
import NutritionMainScreen from '../screens/Nutrition/index';

const Stack = createStackNavigator();

export default function NutritionStack() {
	return (
		<MacrosProvider>
			<Stack.Navigator
				initialRouteName='NutritionMain'
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
				}}
			>
				<Stack.Screen
					name='NutritionMain'
					component={NutritionMainScreen}
				/>
				<Stack.Screen name='AddMeal' component={AddMealScreen} />
			</Stack.Navigator>
		</MacrosProvider>
	);
}
