/* eslint-disable @typescript-eslint/no-use-before-define */
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

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
    <View className="flex-1 bg-base-100 p-4">
      <ScrollView
        contentContainerStyle={tw`flex flex-col`}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView className="h-fit flex-1">
          <Nutrition />
        </SafeAreaView>

        <SafeAreaView className="h-fit flex-1">
          <Macro />
        </SafeAreaView>

        <Text className="absolute left-[20px] top-[55px] z-10 text-lg font-bold text-white">
          {getCurrentDate()}
        </Text>
      </ScrollView>

      {/* fab */}
      <TouchableOpacity
        style={tw`w-[90%] mx-auto h-[80px] bg-red-500 rounded-full justify-center items-center shadow-lg`}
        onPress={handleAddMealPress}
      >
        <Text style={tw`text-white text-[20px] font-bold`}>+ Add Meal</Text>
      </TouchableOpacity>
    </View>
  );
}
