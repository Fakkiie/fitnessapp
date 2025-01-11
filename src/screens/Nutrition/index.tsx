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

export default function MyScreen({ navigation }: { navigation: any }) {
  const handleAddMealPress = () => {
    navigation.navigate('AddMeal');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#141414' }}>
      <Text style={styles.dateText}>{getCurrentDate()}</Text>

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

        {/* Add Meal Button */}
        <TouchableOpacity
          style={styles.addMealButton}
          onPress={handleAddMealPress}
        >
          <Text style={styles.addMealButtonText}>+ Add Meal</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  greyBox: {
    position: 'absolute',
    top: 453,
    left: 20,
    width: '90%',
    height: 200,
    backgroundColor: '#4B4B4B',
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
  addMealButton: {
    position: 'absolute',
    top: 670,
    left: 20,
    backgroundColor: 'red',
    width: '90%',
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMealButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
