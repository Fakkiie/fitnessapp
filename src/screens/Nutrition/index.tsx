/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Nutrition from '../../components/caloriecounter';
import Macro from '../../components/macrocounter';

const getCurrentDate = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return `Today: ${new Intl.DateTimeFormat('en-US', options).format(today)}`;
};

export default function NutritionMainScreen({
  navigation,
}: {
  navigation: any;
}) {
  const handleAddMealPress = () => {
    navigation.navigate('AddMeal');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#141414' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Nutrition />
        </SafeAreaView>

        <SafeAreaView style={{ flex: 1 }}>
          <Macro />
        </SafeAreaView>

        <View style={styles.greyBox} />
        <View style={styles.greyBox2} />

        <Text style={styles.dateText}>{getCurrentDate()}</Text>
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity style={styles.fab} onPress={handleAddMealPress}>
        <Text style={styles.addMealButtonText}>+ Add Meal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  greyBox: {
    position: 'absolute',
    top: 475,
    left: 20,
    width: '42.5%',
    height: 180,
    backgroundColor: '#333333',
    borderRadius: 10,
  },
  greyBox2: {
    position: 'absolute',
    top: 475,
    left: 210,
    width: '42.5%',
    height: 180,
    backgroundColor: '#333333',
    borderRadius: 10,
  },
  dateText: {
    position: 'absolute',
    top: 55,
    left: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    zIndex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 30, // Adjust to be a little above the bottom of the screen
    right: 20, // Adjust to be a little away from the right edge
    width: '90%',
    height: 80,
    backgroundColor: 'red',
    borderRadius: 35, // Circular shape
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Shadow for a floating effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, // Elevation for Android to give the floating effect
  },
  addMealButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
