import { createStackNavigator } from '@react-navigation/stack';

import AddMealScreen from '../screens/alternative/addmeal';
import NutritionMainScreen from '../screens/Nutrition/index';
import { MacrosProvider } from './MacrosContext';

const Stack = createStackNavigator();

const NutritionStack = () => {
  return (
    <MacrosProvider>
      <Stack.Navigator
        initialRouteName="NutritionMain"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="NutritionMain" component={NutritionMainScreen} />
        <Stack.Screen name="AddMeal" component={AddMealScreen} />
      </Stack.Navigator>
    </MacrosProvider>
  );
};

export default NutritionStack;
