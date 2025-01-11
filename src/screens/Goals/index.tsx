import { StyleSheet, Text, View } from 'react-native';

export function Goals() {
  return (
    <View style={[styles.container, { backgroundColor: '#141414' }]}>
      <Text style={styles.text}>App Name</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32, // Adjusted text size
    fontWeight: '600', // Slightly lighter font weight
    color: 'white',
    textAlign: 'center', // Center the text horizontally
    position: 'absolute', // Position text manually
    top: 50, // Adjust this value to control vertical position
    fontFamily: 'Times New Roman', // Replace with your desired font
  },
});
