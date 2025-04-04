import { Text, TouchableOpacity, View } from 'react-native';

export function Log({ navigation }: { navigation: any }) {
  return (
    <View className="mt-auto flex h-full flex-col items-center justify-end bg-base-100 pb-10 pt-20">
      <View className="w-[90%] space-y-4">
        <TouchableOpacity
          className="items-center justify-center rounded-lg border-2 border-primary p-4"
          onPress={() => navigation.navigate('AddWorkout')}
        >
          <Text className="text-lg font-semibold text-white">Log Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center justify-center rounded-lg border-2 border-primary p-4"
          onPress={() => navigation.navigate('ViewGrouped')}
        >
          <Text className="text-lg font-semibold text-white">View Grouped</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
