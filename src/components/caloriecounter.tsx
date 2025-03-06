/* eslint-disable @typescript-eslint/no-use-before-define */
import { FontAwesome } from '@expo/vector-icons';
import type { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import { useMacros } from './MacrosContext';

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
    <View style={styles.container}>
      {/* Box with a slightly different color */}
      <View style={styles.box}>
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

        {/* Calories Information */}
        <View style={styles.caloriesContainer}>
          <View style={styles.caloriesRow}>
            <FontAwesome
              name="flag"
              size={20}
              color="#00FFFF"
              style={styles.icon}
            />
            <Text style={styles.caloriesText}>Goal: {goalCalories}</Text>
          </View>

          <View style={styles.caloriesRow}>
            <FontAwesome
              name="cutlery"
              size={20}
              color="#00FFFF"
              style={styles.icon}
            />
            <Text style={styles.caloriesText}>Eaten: {caloriesEaten}</Text>
          </View>

          <View style={styles.caloriesRow}>
            <FontAwesome
              name="heart"
              size={20}
              color="#00FFFF"
              style={styles.icon}
            />
            <Text style={styles.caloriesText}>Exercise: {caloriesBurned}</Text>
          </View>
        </View>

        {/* Remaining Calories */}
        <View style={styles.remainingContainer}>
          <Text style={styles.remainingText}>Remaining</Text>
          <Text style={styles.caloriesNumber}>{caloriesLeft}</Text>
          <Text style={styles.remainingCalText}>Calories</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Dark background for the whole screen
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  box: {
    width: '90%', // Width of the box (adjust as needed)
    height: 170, // Height of the box (adjust as needed)
    top: -40, // Position the box slightly lower
    padding: 20,
    backgroundColor: '#333333', // Slightly different color for the box
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // For Android shadow effect
  } as ViewStyle,
  caloriesContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 20,
    left: 140, // Position the text slightly to the left
    top: -140, // Position the text slightly higher
  } as ViewStyle,
  caloriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    fontFamily: 'Avenir',
  } as ViewStyle,
  icon: {
    marginRight: 10,
    top: 15,
  } as ViewStyle,
  caloriesText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    top: 15,
  } as TextStyle,
  remainingContainer: {
    alignItems: 'center',
    marginTop: 20,
  } as ViewStyle,
  remainingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    left: -98, // Position the text slightly to the right
    top: -200, // Position the number slightly higher
  } as TextStyle,
  caloriesNumber: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    left: -98, // Position the number slightly to the right
    top: -243, // Position the number slightly higher
    textAlign: 'center',
  } as TextStyle,
  remainingCalText: {
    // the word calories
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: -290, // Positioning text below the Fats label
    left: 110, // Adjust positioning as needed
  } as TextStyle,
});
