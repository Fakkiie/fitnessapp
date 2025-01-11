/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, Text, View } from 'react-native';

export function Log() {
  return (
    <View style={[styles.container, { backgroundColor: '#141414' }]}>
      {/* Title at the top */}
      <Text style={styles.title}>Log Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Push title to the top
    paddingTop: 50, // Add spacing from the top
  },
  title: {
    fontSize: 24, // Change font size
    fontWeight: 'bold', // Make it bold
    color: 'white', // White text color
    textAlign: 'center', // Center align the text
  },
});
