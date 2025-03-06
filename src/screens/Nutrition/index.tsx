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
    <View style={tw`flex-1 bg-[#141414]`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow`}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={tw`flex-1`}>
          <Nutrition />
        </SafeAreaView>

        <SafeAreaView style={tw`flex-1`}>
          <Macro />
        </SafeAreaView>

        <View
          style={tw`absolute top-[475px] left-[20px] w-[42.5%] h-[180px] bg-[#333333] rounded-lg`}
        />
        <View
          style={tw`absolute top-[475px] left-[210px] w-[42.5%] h-[180px] bg-[#333333] rounded-lg`}
        />

        <Text
          style={tw`absolute top-[55px] left-[20px] text-[18px] font-bold text-white z-10`}
        >
          {getCurrentDate()}
        </Text>
      </ScrollView>

      {/* fab */}
      <TouchableOpacity
        style={tw`absolute bottom-[30px] right-[20px] w-[90%] h-[80px] bg-red-500 rounded-full justify-center items-center shadow-lg`}
        onPress={handleAddMealPress}
      >
        <Text style={tw`text-white text-[20px] font-bold`}>+ Add Meal</Text>
      </TouchableOpacity>
    </View>
  );
}
