/* eslint-disable @typescript-eslint/no-use-before-define */
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import Nutrition from "../../components/Nutrition";
import Macro from "../../components/Macro";

const getCurrentDate = () => {
	const today = new Date();
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	return `Today: ${new Intl.DateTimeFormat("en-US", options).format(today)}`;
};

export default function NutritionMainScreen({
	navigation,
}: {
	navigation: any;
}) {
	const handleAddMealPress = () => {
		navigation.navigate("AddMeal");
	};

	return (
		<View className='bg-base-100 flex flex-col px-4 py-10 h-full'>
			<Text className='mt-16 mx-8 font-bold text-neutral z-10 text-lg h-fit'>
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
				className='w-[90%] mx-auto h-20 bg-primary rounded-full justify-center items-center shadow-lg'
				onPress={handleAddMealPress}
			>
				<Text style={tw`text-white text-[20px] font-bold`}>
					+ Add Meal
				</Text>
			</TouchableOpacity>
		</View>
	);
}
