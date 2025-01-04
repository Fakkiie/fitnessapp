import { Stack } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { PaperProvider } from 'react-native-paper';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function Layout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
