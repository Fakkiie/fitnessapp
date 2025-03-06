/* eslint-disable @typescript-eslint/no-use-before-define */
import { Text, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import tw from 'twrnc';

import { useMacros } from './MacrosContext'; // Import the useMacros hook to access global macros

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

  // Reusable component for "left" text
  const LeftText = ({ style }: { style: any }) => (
    <Text style={style}>left</Text>
  );

  return (
    <View style={tw`flex-1 bg-[#141414] justify-center items-center`}>
      {/* SVG with progress circles */}
      <Svg
        width="500"
        height="500"
        viewBox="0 0 200 400"
        style={tw`absolute z-1 -top-[205px]`}
      >
        {/* Background circle 1 */}
        <Circle
          cx="6"
          cy="95"
          r="32.5"
          stroke="#fff"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle 1 */}
        <Circle
          cx="6"
          cy="95"
          r="32.5"
          stroke="#3CB371"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${calculateDashArray(totalProtein, goalProteins)} ${2 * Math.PI * 32.5 - calculateDashArray(totalProtein, goalProteins)}`}
          strokeDashoffset={50} // Start position
          strokeLinecap="round"
        />
        {/* Background circle 2 */}
        <Circle
          cx="101"
          cy="95"
          r="32.5"
          stroke="#fff"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle 2 */}
        <Circle
          cx="101"
          cy="95"
          r="32.5"
          stroke="#4169E1"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${calculateDashArray(totalCarbs, goalCarbs)} ${2 * Math.PI * 32.5 - calculateDashArray(totalCarbs, goalCarbs)}`}
          strokeDashoffset={50} // Start position
          strokeLinecap="round"
        />
        {/* Background circle 3 */}
        <Circle
          cx="195"
          cy="95"
          r="32.5"
          stroke="#fff"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle 3 */}
        <Circle
          cx="195"
          cy="95"
          r="32.5"
          stroke="#FF69B4"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${calculateDashArray(totalFat, goalFats)} ${2 * Math.PI * 32.5 - calculateDashArray(totalFat, goalFats)}`}
          strokeDashoffset={50} // Start position
          strokeLinecap="round"
        />
      </Svg>

      {/* Independent Box */}
      <View
        style={tw`w-[90%] h-[170px] -top-[240px] p-5 bg-[#333333] rounded-lg shadow-lg shadow-black/10`}
      />

      {/* Text for Proteins */}
      <Text
        style={tw`absolute text-lg text-white -top-[165px] left-[50px] font-bold`}
      >
        Proteins
      </Text>
      {/* Text for Carbs */}
      <Text
        style={tw`absolute text-lg text-white -top-[165px] left-[175px] font-bold`}
      >
        Carbs
      </Text>
      {/* Text for Fats */}
      <Text
        style={tw`absolute text-lg text-white -top-[165px] left-[300px] font-bold`}
      >
        Fats
      </Text>

      {/* Text for remaining Proteins */}
      <Text
        style={tw`absolute text-2xl text-white -top-[108px] left-[43px] w-[80px] text-center`}
      >
        {remainingProteins}g
      </Text>
      {/* Text for remaining Carbs */}
      <Text
        style={tw`absolute text-2xl text-white -top-[108px] left-[162px] w-[80px] text-center`}
      >
        {remainingCarbs}g
      </Text>
      {/* Text for remaining Fats */}
      <Text
        style={tw`absolute text-2xl text-white -top-[108px] left-[280px] w-[80px] text-center`}
      >
        {remainingFats}g
      </Text>
      {/* Reusable "left" text */}
      <LeftText
        style={tw`absolute text-base text-white -top-[80px] left-[307px]`}
      />
      <LeftText
        style={tw`absolute text-base text-white -top-[80px] left-[190px]`}
      />
      <LeftText
        style={tw`absolute text-base text-white -top-[80px] left-[70px]`}
      />
    </View>
  );
}
