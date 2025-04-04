/* eslint-disable @typescript-eslint/no-use-before-define */
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

import Macro from '../../components/Macro';
import Nutrition from '../../components/Nutrition';

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
    <View className="flex h-full flex-col bg-base-100 px-4 py-10">
      <Text className="z-10 mx-8 mt-16 h-fit text-lg font-bold text-neutral">
        {getCurrentDate()}
      </Text>
      <ScrollView
        contentContainerStyle={tw`flex flex-col gap-10 my-10`}
        showsVerticalScrollIndicator={false}
      >
        <Nutrition />

        <Macro />
      </ScrollView>

      {/* fab */}
      <TouchableOpacity
        className="mx-auto h-20 w-[90%] items-center justify-center rounded-full bg-primary shadow-lg"
        onPress={handleAddMealPress}
      >
        <Text style={tw`text-white text-[20px] font-bold`}>+ Add Meal</Text>
      </TouchableOpacity>
    </View>
  );
}
