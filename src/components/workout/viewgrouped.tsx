import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { WorkoutGroup } from 'src/storage/storage';
import { getWorkoutGroups } from 'src/storage/storage';

import SvgComponent from '../svg/BackButton';

export default function ViewGrouped() {
  const navigation = useNavigation();
  const [groups, setGroups] = useState<WorkoutGroup[]>([]);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  useEffect(() => {
    const loadGroups = () => {
      const storedGroups = getWorkoutGroups();
      console.log('Loaded Workout Groups:', storedGroups);
      setGroups(storedGroups);
    };
    loadGroups();
  }, []);

  const handleGroupPress = (groupId: string) => {
    setExpandedGroup((prev) => (prev === groupId ? null : groupId));
  };

  const renderExerciseItem = ({ item }: { item: string }) => (
    <View className="mb-2 p-2">
      <Text className="text-lg font-bold text-white">{item}</Text>
      {/* Optional: you could store full exercise data later for full detail */}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-base-100">
      <View className="flex-1 px-4 pb-28 pt-10">
        {/* Header */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="flex-1 text-center text-2xl font-bold text-white">
            Grouped Workouts
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgComponent />
          </TouchableOpacity>
        </View>

        {/* Scrollable Groups */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {groups.length === 0 ? (
            <Text className="text-center text-white">No groups yet.</Text>
          ) : (
            groups.map((group) => (
              <View
                key={group.id}
                className="mb-4 rounded-xl border border-white/20 bg-white/10 p-4"
              >
                <TouchableOpacity onPress={() => handleGroupPress(group.id!)}>
                  <Text className="mb-2 text-lg font-semibold text-white">
                    {group.name}
                  </Text>
                </TouchableOpacity>

                {expandedGroup === group.id && (
                  <FlatList
                    data={group.exercises}
                    keyExtractor={(item, index) => `${group.id}-${index}`}
                    renderItem={renderExerciseItem}
                    scrollEnabled={false}
                  />
                )}
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/* Fixed Bottom Button */}
      <View className="absolute inset-x-0 bottom-0 bg-base-100 px-4 py-5">
        <TouchableOpacity
          className="items-center justify-center rounded-lg border-2 border-primary p-4"
          onPress={() => navigation.navigate('CreateGroup')}
        >
          <Text className="text-lg font-semibold text-white">
            + Create New Group
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
