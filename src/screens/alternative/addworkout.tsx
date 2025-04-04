import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgComponent from 'src/components/svg/BackButton';

import exercises from '../../data/exercises.json';

const MUSCLE_GROUPS = [
  'abdominals',
  'biceps',
  'triceps',
  'shoulders',
  'chest',
  'lats',
  'traps',
  'calves',
  'abductors',
  'middle back',
  'glutes',
  'hamstrings',
  'lower back',
  'adductors',
  `quadriceps`,
  'forearms',
  'neck', // rename sternocalvical to neck
  'obliques',
];

export function AddWorkout() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const handleGroupPress = (group: string) => {
    setExpandedGroup((prev) => (prev === group ? null : group));
  };

  const handleSelectExercise = (exercise: any) => {
    console.log('Selected:', exercise.name);
    // add modal eventaully
  };

  const renderExerciseItem = ({ item }: { item: any }) => (
    <View>
      <TouchableOpacity
        className="rounded p-2"
        onPress={() => handleSelectExercise(item)}
      >
        <Text className="text-lg font-bold text-white">{item.name}</Text>
        <Text className="text-sm capitalize text-white">
          {item.primaryMuscles.join(', ')} | {item.equipment}
        </Text>
        <Text className="text-xs capitalize text-white">
          {item.force} • {item.mechanic}
        </Text>
      </TouchableOpacity>
      <View className="my-2 h-[1px] w-full bg-gray-400 " />
    </View>
  );

  // search for exercises
  const searchResults = exercises.filter((ex) => {
    const q = searchQuery.toLowerCase();
    return (
      ex.name.toLowerCase().includes(q) ||
      ex.primaryMuscles.some((m) => m.toLowerCase().includes(q)) ||
      ex.secondaryMuscles.some((m) => m.toLowerCase().includes(q))
    );
  });

  const exercisesInGroup = (group: string) =>
    exercises.filter((ex) => ex.primaryMuscles.includes(group));

  return (
    <SafeAreaView className="flex-1 bg-base-100 p-4">
      {/* Header */}
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-white">Add Workout</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgComponent />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        className="mb-4 rounded bg-white p-3 text-black"
        placeholder="Search exercises or muscles..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Show search results if a character is in the search bar  */}
        {searchQuery.trim().length > 0 ? (
          <>
            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={renderExerciseItem}
                scrollEnabled={false}
              />
            ) : (
              <Text className="ml-2 text-sm text-white">
                No matching exercises found.
              </Text>
            )}
          </>
        ) : (
          // show expandable groups
          MUSCLE_GROUPS.map((group) => {
            const groupExercises = exercisesInGroup(group);
            const capitalized = group.charAt(0).toUpperCase() + group.slice(1);

            return (
              <View key={group} className="mb-4">
                <TouchableOpacity
                  className="rounded bg-base-200 p-3"
                  onPress={() => handleGroupPress(group)}
                >
                  <Text className="text-lg font-bold text-white">
                    {capitalized}
                  </Text>
                </TouchableOpacity>

                {expandedGroup === group && groupExercises.length > 0 && (
                  <FlatList
                    data={groupExercises}
                    keyExtractor={(item) => item.id}
                    renderItem={renderExerciseItem}
                    scrollEnabled={false}
                  />
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
