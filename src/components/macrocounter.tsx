/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, Text, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

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

  return (
    <View style={styles.container}>
      {/* SVG with progress circles */}
      <Svg
        width="500"
        height="500"
        viewBox="0 0 200 400"
        style={styles.svgContainer}
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
      <View style={styles.box} />

      {/* Text for Proteins */}
      <Text style={styles.proteinsText}>Proteins</Text>
      {/* Text for Carbs */}
      <Text style={styles.carbsText}>Carbs</Text>
      {/* Text for Fats */}
      <Text style={styles.fatsText}>Fats</Text>

      {/* Text for remaining Proteins */}
      <Text style={styles.remainingProteinsText}>{remainingProteins}g</Text>
      {/* Text for remaining Carbs */}
      <Text style={styles.remainingCarbsText}>{remainingCarbs}g</Text>
      {/* Text for remaining Fats */}
      <Text style={styles.remainingFatsText}>{remainingFats}g</Text>
      {/* Text for word left 1 */}
      <Text style={styles.leftTextOne}>left</Text>
      {/* Text for word left 2 */}
      <Text style={styles.leftTextTwo}>left</Text>
      {/* Text for word left 3 */}
      <Text style={styles.leftTextThree}>left</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Dark background for the whole screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute', // Position the SVG container absolutely within the parent
    zIndex: 1, // Ensure it stays on top of the box
    top: -205, // Position the SVG at the top of the screen
  },
  box: {
    width: '90%', // Width of the box (adjust as needed)
    height: 170, // Height of the box (adjust as needed)
    top: -240, // Adjust the position of the box to ensure it appears below the SVG
    padding: 20,
    backgroundColor: '#333333', // Slightly different color for the box
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // For Android shadow effect
  },
  proteinsText: {
    fontSize: 18,
    color: '#fff',
    position: 'absolute',
    top: -165, // Positioning text below the SVG circles
    left: 50, // Adjust positioning as needed
    fontWeight: 'bold',
  },
  carbsText: {
    fontSize: 18,
    color: '#fff',
    position: 'absolute',
    top: -165, // Positioning text below the first text
    left: 175, // Adjust positioning as needed
    fontWeight: 'bold',
  },
  fatsText: {
    fontSize: 18,
    color: '#fff',
    position: 'absolute',
    top: -165, // Positioning text below the second text
    left: 300, // Adjust positioning as needed
    fontWeight: 'bold',
  },
  remainingProteinsText: {
    fontSize: 24,
    color: '#fff',
    position: 'absolute',
    top: -108, // Positioning text below the Proteins label
    left: 43, // Adjust positioning as needed
    width: 80, // Adjust width to create space for larger values like 100g
    textAlign: 'center', // Center align text to prevent shifting
  },
  remainingCarbsText: {
    fontSize: 24,
    color: '#fff',
    position: 'absolute',
    top: -108, // Positioning text below the Carbs label
    left: 162, // Adjust positioning as needed
    width: 80, // Adjust width to create space for larger values like 100g
    textAlign: 'center', // Center align text to prevent shifting
  },
  remainingFatsText: {
    fontSize: 24,
    color: '#fff',
    position: 'absolute',
    top: -108, // Positioning text below the Fats label
    left: 280, // Adjust positioning as needed
    width: 80, // Adjust width to create space for larger values like 100g
    textAlign: 'center', // Center align text to prevent shifting
  },
  leftTextOne: {
    fontSize: 15,
    color: '#fff',
    position: 'absolute',
    top: -80, // Positioning text below the Fats label
    left: 307, // Adjust positioning as needed
  },
  leftTextTwo: {
    fontSize: 15,
    color: '#fff',
    position: 'absolute',
    top: -80, // Positioning text below the Fats label
    left: 190, // Adjust positioning as needed
  },
  leftTextThree: {
    fontSize: 15,
    color: '#fff',
    position: 'absolute',
    top: -80, // Positioning text below the Fats label
    left: 70, // Adjust positioning as needed
  },
});
