import { Text, View } from 'react-native';
import tw from 'twrnc';

export function Log() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-[#141414]`}>
      <Text
        style={tw`text-4xl font-semibold text-white text-center absolute top-12`}
      >
        Workout
      </Text>
    </View>
  );
}
