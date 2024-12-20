import * as React from 'react';
import { View, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Animated, 
  Platform, 
  ScrollView, 
  SafeAreaView, 
  I18nManager 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = () => {
  const [currentTab, setCurrentTab] = React.useState('logworkout');
  const [pressedTab, setPressedTab] = React.useState(null);

  const navigateTo = (tab) => {
    setCurrentTab(tab);
  };

  const handlePressIn = (tab) => {
    setPressedTab(tab);
  };

  const handlePressOut = () => {
    setPressedTab(null);
  };

  const getIconColor = (tab) => {
    if (tab === currentTab) {
      return '#FF6347'; // Highlighted color when active (e.g., Tomato red)
    } else if (tab === pressedTab) {
      return '#FF4500'; // Pressed state color (e.g., OrangeRed)
    } else {
      return '#aaaaaa'; // Default color when not active or pressed
    }
  };

  return (
    <View style={styles.container}>
      {/* Dynamic content based on currentTab */}
      <View style={styles.content}>
        {currentTab === 'dataanalytics' && <Text>Data Analytics Content</Text>}
        {currentTab === 'home' && <Text>Log Workout Content</Text>}
        {currentTab === 'previousworkout' && <Text>Previous Workout</Text>}
        {currentTab === 'nutrition' && <Text>Nutrition Content</Text>}
        {currentTab === 'goals' && <Text>Goals Content</Text>}
      </View>

      {/* Custom Navigation Bar */}
      <View style={styles.navBar}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigateTo('nutrition')}
            onPressIn={() => handlePressIn('nutrition')}
            onPressOut={handlePressOut}>
            <MaterialCommunityIcons
              name={currentTab === 'nutrition' ? 'food-apple' : 'food-apple-outline'}
              size={35}
              color={getIconColor('nutrition')}
            />
            <Text style={styles.navLabel}>Nutrition</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigateTo('goals')}
            onPressIn={() => handlePressIn('goals')}
            onPressOut={handlePressOut}>
            <MaterialCommunityIcons
              name={currentTab === 'goals' ? 'target' : 'target'}
              size={35}
              color={getIconColor('goals')}
            />
            <Text style={styles.navLabel}>Goals</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigateTo('home')}
            onPressIn={() => handlePressIn('home')}
            onPressOut={handlePressOut}>
            <MaterialCommunityIcons
              name={currentTab === 'home' ? 'home' : 'home'}
              size={35}
              color={getIconColor('home')}
            />
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigateTo('previousworkout')}
            onPressIn={() => handlePressIn('previousworkout')}
            onPressOut={handlePressOut}>
            <MaterialCommunityIcons
              name={currentTab === 'previousworkout' ? 'calendar-month' : 'calendar-month-outline'}
              size={35}
              color={getIconColor('previousworkout')}
            />
            <Text style={styles.navLabel}>Log</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigateTo('dataanalytics')}
            onPressIn={() => handlePressIn('dataanalytics')}
            onPressOut={handlePressOut}>
            <MaterialCommunityIcons
              name={currentTab === 'dataanalytics' ? 'graph' : 'graph-outline'}
              size={35}
              color={getIconColor('dataanalytics')}
            />
            <Text style={styles.navLabel}>Analysis</Text>
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
    height: 100,
    paddingHorizontal: 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  navLabel: {
    color: '#cccccc',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default Home;

