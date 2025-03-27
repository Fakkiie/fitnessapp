/* eslint-disable @typescript-eslint/no-use-before-define */
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";

import { useMacros } from "./MacrosContext";

export default function Nutrition() {
	// Get global macros state
	const { totalCalories } = useMacros();

	const caloriesEaten = totalCalories; // Use the global value for calories eaten
	const caloriesBurned = 600; // Assuming calories burned is still static for now
	const goalCalories = 2500 + caloriesBurned; // Example goal calories
	const caloriesLeft = Math.max(0, goalCalories - caloriesEaten); // Ensure non-negative remaining calories

	// Calculate progress circle values
	const percentage = (caloriesEaten / goalCalories) * 100;
	const circumference = 2 * Math.PI * 50; // Circle circumference
	const strokeDasharray = circumference * (percentage / 100);

	return (
		<View className="flex items-center justify-center bg-[#141414]">
			{/* Box with a slightly different color */}
			<View className="mt-5 mx-10 py-4 h-fit flex flex-col items-center rounded-lg bg-[#333333] shadow-md shadow-black">
				<Text className="text-xl font-bold text-white">Calories</Text>
				<View className="flex flex-row items-center justify-between mx-4 mb-4">
					<View className="flex flex-col items-center justify-center relative">
						<Svg width="120" height="130" viewBox="0 0 120 130">
							{/* Background circle */}
							<Circle
								cx="60"
								cy="70"
								r="50"
								stroke="#fff"
								strokeWidth="11"
								fill="none"
							/>
							{/* Progress circle */}
							<Circle
								cx="60"
								cy="70"
								r="50"
								stroke="#FF0000"
								strokeWidth="11"
								fill="none"
								strokeDasharray={`${strokeDasharray} ${circumference - strokeDasharray}`}
								strokeDashoffset={75} // Start position
								strokeLinecap="round"
							/>
						</Svg>
						{/* Remaining Calories */}
						<View className="absolute top-12">
							<Text className="text-xs font-bold text-white">
								Remaining
							</Text>
							<Text className="text-center text-2xl font-bold text-white">
								{caloriesLeft}
							</Text>
						</View>
					</View>

					{/* Calories Information */}
					<View className="mt-5 items-start justify-center px-5">
						<View className="mb-3 flex-row flex gap-2 items-center">
							<FontAwesome
								name="flag"
								size={20}
								color="#00FFFF"
								className="mr-2"
							/>
							<Text className="text-lg font-bold text-white">
								Goal: {goalCalories}
							</Text>
						</View>

						<View className="mb-3 flex-row flex gap-2 items-center">
							<FontAwesome
								name="cutlery"
								size={20}
								color="#00FFFF"
								className="mr-2"
							/>
							<Text className="text-lg font-bold text-white">
								Eaten: {caloriesEaten}
							</Text>
						</View>

						<View className="mb-3 flex-row flex items-center gap-2">
							<FontAwesome
								name="heart"
								size={20}
								color="#00FFFF"
								className="mr-2"
							/>
							<Text className="text-lg font-bold text-white">
								Exercise: {caloriesBurned}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
