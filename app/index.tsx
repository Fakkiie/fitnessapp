import * as React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
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
      return '#FF6347'; // Highlighted color when active
    } else if (tab === pressedTab) {
      return '#FF4500'; // Pressed state color
    } else {
      return '#aaaaaa'; // Default color
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black ">
      {/* Dynamic content based on currentTab */}
      <View className="flex-1 justify-center items-center h-full">
        {currentTab === 'dataanalytics' && <Text className="text-white">Data Analytics Content</Text>}
        {currentTab === 'home' && <Text className="text-white">Log Workout Content</Text>}
        {currentTab === 'previousworkout' && <Text className="text-white">Previous Workout</Text>}
        {currentTab === 'nutrition' && <Text className="text-white">Nutrition Content</Text>}
        {currentTab === 'goals' && <Text className="text-white">Goals Content</Text>}
      </View>

      {/* Custom Navigation Bar */}
      <View className="flex-row items-center bg-gray-900 h-20 px-3">
        <View className="flex-1 items-center">
          <TouchableOpacity
            className="items-center justify-center mb-1"
            onPress={() => navigateTo('nutrition')}
            onPressIn={() => handlePressIn('nutrition')}
            onPressOut={handlePressOut}>
            <MaterialCommunityIcons
              name={currentTab === 'nutrition' ? 'food-apple' : 'food-apple-outline'}
              size={35}
              color={getIconColor('nutrition')}
            />
            <Text className="text-gray-400 text-sm mt-1 text-center">Nutrition</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity
            className="items-center justify-center mb-1"
            onPress={() => navigateTo('goals')}
            onPressIn={() => handlePressIn('goals')}
            onPressOut={handlePressOut}>
            <MaterialCommunityIcons
              name={currentTab === 'goals' ? 'target' : 'target'}
              size={35}
              color={getIconColor('goals')}
            />
            <Text className="text-gray-400 text-sm mt-1 text-center">Goals</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity
            className="items-center justify-center mb-1"
            onPress={() => navigateTo('home')}
            onPressIn={() => handlePressIn('home')}
            onPressOut={handlePressOut}>
            <MaterialCommunityIcons
              name={currentTab === 'home' ? 'home' : 'home'}
              size={35}
              color={getIconColor('home')}
            />
            <Text className="text-gray-400 text-sm mt-1 text-center">Home</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity
            className="items-center justify-center mb-1"
            onPress={() => navigateTo('previousworkout')}
            onPressIn={() => handlePressIn('previousworkout')}
            onPressOut={handlePressOut}>
            <MaterialCommunityIcons
              name={currentTab === 'previousworkout' ? 'calendar-month' : 'calendar-month-outline'}
              size={35}
              color={getIconColor('previousworkout')}
            />
            <Text className="text-gray-400 text-sm mt-1 text-center">Log</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity
            className="items-center justify-center mb-1"
            onPress={() => navigateTo('dataanalytics')}
            onPressIn={() => handlePressIn('dataanalytics')}
            onPressOut={handlePressOut}>
            <MaterialCommunityIcons
              name={currentTab === 'dataanalytics' ? 'graph' : 'graph-outline'}
              size={35}
              color={getIconColor('dataanalytics')}
            />
            <Text className="text-gray-400 text-sm mt-1 text-center">Analysis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
