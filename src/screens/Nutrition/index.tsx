/* eslint-disable @typescript-eslint/no-use-before-define */
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import Nutrition from "../../components/caloriecounter";
import Macro from "../../components/macrocounter";

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
		<View style={tw`bg-[#141414] flex-1 p-4`}>
			<ScrollView
				contentContainerStyle={tw`flex flex-col`}
				showsVerticalScrollIndicator={false}
			>
				<SafeAreaView className="border h-fit flex-1">
					<Nutrition />
				</SafeAreaView>

				<SafeAreaView className="border h-fit flex-1">
					<Macro />
				</SafeAreaView>

				<Text
					style={tw`absolute top-[55px] left-[20px] text-[18px] font-bold text-white z-10`}
				>
					{getCurrentDate()}
				</Text>
			</ScrollView>

			{/* fab */}
			<TouchableOpacity
				style={tw`w-[90%] mx-auto h-[80px] bg-red-500 rounded-full justify-center items-center shadow-lg`}
				onPress={handleAddMealPress}
			>
				<Text style={tw`text-white text-[20px] font-bold`}>
					+ Add Meal
				</Text>
			</TouchableOpacity>
		</View>
	);
}
