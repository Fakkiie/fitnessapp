import { useNavigation } from 'expo-router';
import { Button, Text, View } from 'react-native';

export function ViewGrouped() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-center bg-base-100">
      <Text className="text-xl text-white">Grouped Workouts</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
