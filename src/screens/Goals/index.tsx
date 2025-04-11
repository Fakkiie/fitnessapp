import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Goals() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-base-100">
      <Text className="absolute top-12 text-center font-serif text-4xl font-semibold text-white">
        Goals
      </Text>
    </SafeAreaView>
  );
}
