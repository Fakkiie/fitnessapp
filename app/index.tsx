import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";
import NutritionStack from "src/components/nutritionstack";
import { View } from "react-native";

// Import the stack navigator for Nutrition
import { Analysis } from "../src/screens/Analysis";
import { Goals } from "../src/screens/Goals";
import { Home } from "../src/screens/Home";
import { Log } from "../src/screens/Log";

const Tab = createBottomTabNavigator();

const HomeIcon = (props: { focused: any }) => (
	<Icon
		source="home"
		color={props.focused ? "#0D7377" : "#ECF0F1"}
		size={30}
	/>
);
const GoalsIcon = (props: { focused: any }) => (
	<Icon source="flag" color={props.focused ? "red" : "white"} size={30} />
);
const LogsIcon = (props: { focused: any }) => (
	<Icon source="dumbbell" color={props.focused ? "red" : "white"} size={30} />
);
const NutritionIcon = (props: { focused: any }) => (
	<Icon
		source="food-apple"
		color={props.focused ? "red" : "white"}
		size={30}
	/>
);
const AnalysisIcon = (props: { focused: any }) => (
	<Icon source="graph" color={props.focused ? "red" : "white"} size={30} />
);

const App = () => {
	return (
		<View className="w-screen h-screen bg-base-100">
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={{
					animation: "shift",
					headerShown: false,
					tabBarStyle: { backgroundColor: "#1E1E1E" },
					tabBarInactiveTintColor: "white",
					tabBarActiveTintColor: "red",
					tabBarLabelStyle: { fontSize: 12 },
				}}
			>
				<Tab.Screen
					name="Goals"
					options={{
						tabBarIcon: GoalsIcon,
						tabBarLabelStyle: { color: "white" },
					}}
					component={Goals}
				/>
				<Tab.Screen
					name="Workout"
					options={{
						tabBarIcon: LogsIcon,
						tabBarLabelStyle: { color: "white" },
					}}
					component={Log}
				/>
				<Tab.Screen
					name="Home"
					options={{
						tabBarIcon: HomeIcon,
						tabBarLabelStyle: { color: "white" },
					}}
					component={Home}
				/>
				<Tab.Screen
					name="Nutrition"
					options={{
						tabBarIcon: NutritionIcon,
						tabBarLabelStyle: { color: "white" },
					}}
					component={NutritionStack} // Use the stack navigator for Nutrition
				/>
				<Tab.Screen
					name="Analysis"
					options={{
						tabBarIcon: AnalysisIcon,
						tabBarLabelStyle: { color: "white" },
					}}
					component={Analysis}
				/>
			</Tab.Navigator>
		</View>
	);
};

export default App;
