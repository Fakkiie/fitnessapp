/* eslint-disable @typescript-eslint/no-use-before-define */
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
// import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';
import AddMealModel from 'src/components/nutrition/AddMealModel';

import Nutrition from '../../components/Nutrition';
import Macro from '../../components/Macro';
import { clearMeals } from 'src/storage/storage';

const getCurrentDate = () => {
	const today = new Date();
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return `Today: ${new Intl.DateTimeFormat('en-US', options).format(today)}`;
};

export default function NutritionMainScreen() {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View className='flex h-full flex-col bg-base-100 px-4 py-10'>
			<Text className='z-10 mx-8 mt-16 h-fit text-lg font-bold text-neutral'>
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
				onPress={() => setModalVisible(true)}
			>
				<Text style={tw`text-white text-[20px] font-bold`}>
					+ Add Meal
				</Text>
			</TouchableOpacity>
			<TouchableOpacity className='' onPress={() => clearMeals()}>
				<Text className='text-center text-primary text-sm font-semibold'>
					Wipe Meals
				</Text>
			</TouchableOpacity>
			<AddMealModel
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
		</View>
	);
}
