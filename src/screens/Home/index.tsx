import { Text, View } from "react-native";
import MuscleAnatomyBack from "../../components/svg/MuscleAnatomyBack";
import MuscleAnatomyFront from "src/components/svg/MuscleAnatomyFront";

export function Home() {
	return (
		<View className='flex-1 justify-center items-center bg-base-100'>
			<Text className='text-4xl font-semibold text-neutral text-center absolute top-12'>
				Lift Lab
			</Text>
			<View className='flex flex-row justify-between items-center gap-10'>
				<MuscleAnatomyFront />
				<MuscleAnatomyBack />
			</View>
		</View>
	);
}
