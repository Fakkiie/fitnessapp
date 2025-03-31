import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export function Log() {
  return (
    <View className="flex-1 items-center justify-center bg-base-100">
      <ScrollView contentContainerStyle={tw`grow justify-center items-center `}>
        <Text className="absolute left-8 top-32 z-10 text-center text-2xl font-semibold text-white">
          Workout Library
        </Text>
        <Text
          style={tw`text-2xl font-semibold text-white text-center absolute top-300 left-8 z-2`}
        >
          Penis
        </Text>
        <View
          style={tw`center top-[110px] left-[0px] w-[92%] h-[1500px] bg-[#333333] rounded-lg`}
        />
      </ScrollView>

      {/* fab */}
      <TouchableOpacity
        style={tw`absolute bottom-[30px] right-[20px] w-[90%] h-[80px] bg-red-500 rounded-full justify-center items-center shadow-lg`}
        onPress={() => console.log('Add Workout')}
      >
        <Text style={tw`text-white text-[20px] font-bold`}>Log Workout</Text>
      </TouchableOpacity>
    </View>
  );
}
