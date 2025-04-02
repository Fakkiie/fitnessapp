/* eslint-disable @typescript-eslint/no-use-before-define */
import { Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import tw from "twrnc";

import { useMacros } from "./MacrosContext"; // Import the useMacros hook to access global macros

export default function Macro() {
	// Set goal values for each macro
	const goalProteins = 150; // grams
	const goalCarbs = 150; // grams
	const goalFats = 50; // grams

	// Access global macro values using the useMacros hook
	const { totalProtein, totalCarbs, totalFat } = useMacros();

	// Function to calculate the strokeDasharray based on the eaten and goal values
	const calculateDashArray = (eaten: number, goal: number) => {
		const percentage = (eaten / goal) * 100;
		const circumference = 2 * Math.PI * 32.5; // Circle circumference (r = 32.5)
		return circumference * (percentage / 100); // Stroke dasharray value
	};

	// Calculate how much is left for each macro, ensuring it doesn't go below 0
	const remainingProteins = Math.max(goalProteins - totalProtein, 0);
	const remainingCarbs = Math.max(goalCarbs - totalCarbs, 0);
	const remainingFats = Math.max(goalFats - totalFat, 0);

	return (
		<View
			style={tw`flex flex-col bg-base-100 mx-4 rounded-lg py-10 h-fit justify-center items-center`}
		>
			{/* SVG with progress circles */}
			<View style={tw`flex flex-row gap-10`}>
				<View className='flex flex-col items-center justify-center'>
					<View className='relative h-fit flex items-center justify-center'>
						<Svg className='h-20 w-20 flex items-center justify-center'>
							{/* Background circle 1 */}
							<Circle
								cx='50%'
								cy='50%'
								r='32.5'
								stroke='#323232'
								strokeWidth='8'
								fill='none'
							/>
							{/* Progress circle 1 */}
							<Circle
								cx='50%'
								cy='50%'
								r='32.5'
								stroke='#A5DD9B'
								strokeWidth='8'
								fill='none'
								strokeDasharray={`${calculateDashArray(totalCarbs, goalCarbs)} ${2 * Math.PI * 32.5 - calculateDashArray(totalCarbs, goalCarbs)}`}
								strokeDashoffset={50} // Start position
								strokeLinecap='round'
							/>
						</Svg>
						<Text className='text-xl text-white text-center absolute'>
							{remainingProteins}g
						</Text>
					</View>
					{/* Text for Proteins */}
					<Text style={tw`text-lg text-white font-bold`}>
						Proteins
					</Text>
					{/* Text for remaining Proteins */}
				</View>

				<View className='flex flex-col items-center justify-center'>
					<View className='relative h-fit flex items-center justify-center'>
						<Svg className='h-20 w-20 flex items-center justify-center'>
							{/* Background circle 1 */}
							<Circle
								cx='50%'
								cy='50%'
								r='32.5'
								stroke='#323232'
								strokeWidth='8'
								fill='none'
							/>
							{/* Progress circle 1 */}
							<Circle
								cx='50%'
								cy='50%'
								r='32.5'
								stroke='#A5DD9B'
								strokeWidth='8'
								fill='none'
								strokeDasharray={`${calculateDashArray(totalFat, goalFats)} ${2 * Math.PI * 32.5 - calculateDashArray(totalFat, goalFats)}`}
								strokeDashoffset={50} // Start position
								strokeLinecap='round'
							/>
						</Svg>
						{/* Text for remaining Carbs */}
						<Text className='text-xl text-white text-center absolute'>
							{remainingCarbs}g
						</Text>
					</View>
					{/* Text for Carbs */}
					<Text style={tw`text-lg text-white font-bold`}>Carbs</Text>
				</View>

				<View className='flex flex-col items-center justify-center'>
					<View className='relative h-fit flex items-center justify-center'>
						<Svg className='h-20 w-20 flex items-center justify-center'>
							{/* Background circle 1 */}
							<Circle
								cx='50%'
								cy='50%'
								r='32.5'
								stroke='#323232'
								strokeWidth='8'
								fill='none'
							/>
							{/* Progress circle 1 */}
							<Circle
								cx='50%'
								cy='50%'
								r='32.5'
								stroke='#A5DD9B'
								strokeWidth='8'
								fill='none'
								strokeDasharray={`${calculateDashArray(totalProtein, goalProteins)} ${2 * Math.PI * 32.5 - calculateDashArray(totalProtein, goalProteins)}`}
								strokeDashoffset={50} // Start position
								strokeLinecap='round'
							/>
						</Svg>
						{/* Text for remaining Fats */}
						<Text className='text-xl text-white text-center absolute'>
							{remainingFats}g
						</Text>
					</View>
					{/* Text for Fats */}
					<Text style={tw`text-lg text-white font-bold`}>Fats</Text>
				</View>
			</View>
		</View>
	);
}
