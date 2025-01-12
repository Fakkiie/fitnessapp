/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useMacros } from '../../components/MacrosContext'; // Import the useMacros hook

// Add Meal Screen Component
export default function AddMealScreen() {
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [calories, setCalories] = useState('');

  const { addMacros } = useMacros();

  const navigation = useNavigation();

  const handleNumericInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (value === '') {
      setter('0');
      return;
    }
    const parsedValue = Math.max(0, parseFloat(value));
    setter(parsedValue.toString());
  };

  const handleSaveMeal = () => {
    const eatenProtein = parseFloat(protein) || 0;
    const eatenFat = parseFloat(fat) || 0;
    const eatenCarbs = parseFloat(carbs) || 0;
    const caloriesEaten = parseFloat(calories) || 0;

    addMacros(eatenProtein, eatenFat, eatenCarbs, caloriesEaten);

    setProtein('');
    setFat('');
    setCarbs('');
    setCalories('');

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header Component from React Navigation */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Form Inputs */}
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Protein (g)"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={protein}
          onChangeText={(text) => handleNumericInput(text, setProtein)}
        />
        <TextInput
          style={styles.input}
          placeholder="Carbs (g)"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={carbs}
          onChangeText={(text) => handleNumericInput(text, setCarbs)}
        />
        <TextInput
          style={styles.input}
          placeholder="Fat (g)"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={fat}
          onChangeText={(text) => handleNumericInput(text, setFat)}
        />
        <TextInput
          style={styles.input}
          placeholder="Calories"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={calories}
          onChangeText={(text) => handleNumericInput(text, setCalories)}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveMeal}>
        <Text style={styles.saveButtonText}>Save Meal</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#222',
  },
  header: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
  backButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  inputBox: {
    backgroundColor: '#4B4B4B',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    top: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#222',
  },
  saveButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    top: 100,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
