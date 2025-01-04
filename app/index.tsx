// eslint-disable-next-line import/no-extraneous-dependencies
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

import { Analysis } from '../src/screens/Analysis';
import { Goals } from '../src/screens/Goals';
import { Home } from '../src/screens/Home';
import { Log } from '../src/screens/Log';
import { Nutrition } from '../src/screens/Nutrition';

const Tab = createBottomTabNavigator();

const HomeIcon = () => <Icon source="home" color="black" size={20} />;
const GoalsIcon = () => <Icon source="flag" color="black" size={20} />;
const LogsIcon = () => <Icon source="calendar-month" color="black" size={20} />;
const NutritionIcon = () => (
  <Icon source="food-apple" color="black" size={20} />
);
const AnalysisIcon = () => <Icon source="graph" color="black" size={20} />;

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, animation: 'shift' }}
      >
        <Tab.Screen
          name="Goals"
          options={{ tabBarIcon: GoalsIcon }}
          component={Goals}
        />
        <Tab.Screen
          name="Logs"
          options={{ tabBarIcon: LogsIcon }}
          component={Log}
        />
        <Tab.Screen
          name="Home"
          options={{ tabBarIcon: HomeIcon }}
          component={Home}
        />
        <Tab.Screen
          name="Nutrition"
          options={{ tabBarIcon: NutritionIcon }}
          component={Nutrition}
        />
        <Tab.Screen
          name="Analysis"
          options={{ tabBarIcon: AnalysisIcon }}
          component={Analysis}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
