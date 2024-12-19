import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';

const LogWorkoutRoute = () => (
  <View style={styles.routeContainer}>{/* Empty View */}</View>
);

const DataAnalyticsRoute = () => (
  <View style={styles.routeContainer}>{/* Empty View */}</View>
);

const NutritionRoute = () => (
  <View style={styles.routeContainer}>{/* Empty View */}</View>
);

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'logworkout',
      title: 'Log Workout',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {
      key: 'dataanalytics',
      title: 'Data Analysis',
      focusedIcon: 'graph',
      unfocusedIcon: 'graph-outline',
    },
    {
      key: 'nutrition',
      title: 'Nutrition',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    logworkout: LogWorkoutRoute,
    dataanalytics: DataAnalyticsRoute,
    nutrition: NutritionRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#1a1a1a' }}
      labeled
      shifting={false} // Prevents animations and keeps the bar consistent
      style={{ height: 100 }} // Increases height for larger buttons
      sceneAnimationEnabled={false} // Disables unnecessary animations
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Black background
  },
  routeContainer: {
    flex: 1,
    backgroundColor: '#121212', // Same background as the screen
  },
});

export default Home;
