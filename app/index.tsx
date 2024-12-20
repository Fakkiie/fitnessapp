import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = () => {
  const [currentTab, setCurrentTab] = React.useState('logworkout');

  const navigateTo = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <View style={styles.container}>
      {/* Dynamic content based on currentTab */}
      <View style={styles.content}>
        {currentTab === 'dataanalytics' && <Text>Data Analytics Content</Text>}
        {currentTab === 'logworkout' && <Text>Log Workout Content</Text>}
        {currentTab === 'nutrition' && <Text>Nutrition Content</Text>}
      </View>

      {/* Custom Navigation Bar */}
      <View style={styles.navBar}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigateTo('nutrition')}>
            <MaterialCommunityIcons
              name={currentTab === 'nutrition' ? 'food-apple' : 'food-apple-outline'}
              size={40}
              color={currentTab === 'nutrition' ? '#ffffff' : '#aaaaaa'}
            />
            <Text style={styles.navLabel}>Nutrition</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => navigateTo('logworkout')}>
            <MaterialCommunityIcons name="plus" size={36} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigateTo('dataanalytics')}>
            <MaterialCommunityIcons
              name={currentTab === 'dataanalytics' ? 'graph' : 'graph-outline'}
              size={40}
              color={currentTab === 'dataanalytics' ? '#ffffff' : '#aaaaaa'}
            />
            <Text style={styles.navLabel}>Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    height: 90,
    paddingHorizontal: 14,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -3,
  },
  navLabel: {
    color: '#cccccc',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  plusButton: {
    backgroundColor: '#ff5722',
    width: 130,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: -100,
    marginBottom: 0,
  },
});

export default Home;
