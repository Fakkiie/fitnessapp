import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Analysis() {
	return (
		<SafeAreaView className='flex-1 justify-center items-center bg-base-100'>
			<Text className='text-4xl font-semibold text-neutral text-center absolute top-12 font-serif'>
				Analysis Screen
			</Text>
		</SafeAreaView>
	);
}
