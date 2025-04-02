import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";

import NutritionStack from "src/components/NutritionStack";
import { Analysis } from "../src/screens/Analysis";
import { Goals } from "../src/screens/Goals";
import { Home } from "../src/screens/Home";
import { Log } from "../src/screens/Log";

const Tab = createBottomTabNavigator();

const createTabBarIcon =
	(source: string, label: string) =>
	({ focused }: { focused: boolean }) => {
		return (
			<View
				className={`flex flex-col items-center justify-center transition-all h-fit ${focused ? "-mb-4" : "-mb-0"}`}
			>
				<View>
					<Icon
						source={source}
						color={focused ? "#0D7377" : "#ECF0F1"}
						size={focused ? 32 : 26}
					/>
				</View>
				{focused && (
					<Text
						style={{}}
						className={`w-full text-white transition-all duration-1000 ${focused ? "opacity-100" : "opacity-0"}`}
					>
						{label}
					</Text>
				)}
			</View>
		);
	};

export default function App() {
	return (
		<View className='w-screen h-screen bg-base-100'>
			<Tab.Navigator
				initialRouteName='Home'
				screenOptions={{
					animation: "shift",
					headerShown: false,
					tabBarStyle: {
						backgroundColor: "#1E1E1E",
						height: 90,
						paddingTop: 10,
					},
					tabBarShowLabel: false,
				}}
			>
				<Tab.Screen
					name='Goals'
					component={Goals}
					options={{
						tabBarIcon: createTabBarIcon("flag", "Goals"),
					}}
				/>
				<Tab.Screen
					name='Workout'
					component={Log}
					options={{
						tabBarIcon: createTabBarIcon("dumbbell", "Workout"),
					}}
				/>
				<Tab.Screen
					name='Home'
					component={Home}
					options={{
						tabBarIcon: createTabBarIcon("home", "Home"),
					}}
				/>
				<Tab.Screen
					name='Nutrition'
					component={NutritionStack}
					options={{
						tabBarIcon: createTabBarIcon("food-apple", "Nutrition"),
					}}
				/>
				<Tab.Screen
					name='Analysis'
					component={Analysis}
					options={{
						tabBarIcon: createTabBarIcon("graph", "Analysis"),
					}}
				/>
			</Tab.Navigator>
		</View>
	);
}
