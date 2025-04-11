import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MuscleAnatomyFemaleBack from 'src/components/svg/MuscleAnatomyFemaleBack';
import MuscleAnatomyFemaleFront from 'src/components/svg/MuscleAnatomyFemaleFront';
import MuscleAnatomyFront from 'src/components/svg/MuscleAnatomyFront';

import MuscleAnatomyBack from '../../components/svg/MuscleAnatomyBack';

export function Home() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-base-100">
      <Text className="absolute top-12 text-center text-4xl font-semibold text-neutral">
        Lift Lab
      </Text>
      <View className="flex flex-row items-center justify-between gap-10">
        <MuscleAnatomyFront />
        <MuscleAnatomyBack />
      </View>
      <View className="flex flex-row items-center justify-between gap-10">
        <MuscleAnatomyFemaleFront />
        <MuscleAnatomyFemaleBack />
      </View>
    </SafeAreaView>
  );
}
