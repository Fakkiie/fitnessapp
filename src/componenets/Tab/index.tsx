// import { Text, TouchableOpacity, View } from 'react-native';

// export function TabBar() {
//   const navigateTo = (tab) => {
//     setCurrentTab(tab);
//   };

//   const handlePressIn = (tab) => {
//     setPressedTab(tab);
//   };

//   const handlePressOut = () => {
//     setPressedTab(null);
//   };

//   const getIconColor = (tab) => {
//     if (tab === currentTab) {
//       return '#FF6347'; // Highlighted color when active
//     }
//     if (tab === pressedTab) {
//       return '#FF4500'; // Pressed state color
//     }
//     return '#aaaaaa'; // Default color
//   };

//   return (
//     <View className="h-20 flex-row items-center bg-gray-900 px-3">
//       <View className="flex-1 items-center">
//         <TouchableOpacity
//           className="mb-1 items-center justify-center"
//           onPress={() => navigateTo('nutrition')}
//           onPressIn={() => handlePressIn('nutrition')}
//           onPressOut={handlePressOut}
//         >
//           <MaterialCommunityIcons
//             name={
//               currentTab === 'nutrition' ? 'food-apple' : 'food-apple-outline'
//             }
//             size={35}
//             color={getIconColor('nutrition')}
//           />
//           <Text className="mt-1 text-center text-sm text-gray-400">
//             Nutrition
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View className="flex-1 items-center">
//         <TouchableOpacity
//           className="mb-1 items-center justify-center"
//           onPress={() => navigateTo('goals')}
//           onPressIn={() => handlePressIn('goals')}
//           onPressOut={handlePressOut}
//         >
//           <MaterialCommunityIcons
//             name={currentTab === 'goals' ? 'target' : 'target'}
//             size={35}
//             color={getIconColor('goals')}
//           />
//           <Text className="mt-1 text-center text-sm text-gray-400">Goals</Text>
//         </TouchableOpacity>
//       </View>

//       <View className="flex-1 items-center">
//         <TouchableOpacity
//           className="mb-1 items-center justify-center"
//           onPress={() => navigateTo('home')}
//           onPressIn={() => handlePressIn('home')}
//           onPressOut={handlePressOut}
//         >
//           <MaterialCommunityIcons
//             name={currentTab === 'home' ? 'home' : 'home'}
//             size={35}
//             color={getIconColor('home')}
//           />
//           <Text className="mt-1 text-center text-sm text-gray-400">Home</Text>
//         </TouchableOpacity>
//       </View>

//       <View className="flex-1 items-center">
//         <TouchableOpacity
//           className="mb-1 items-center justify-center"
//           onPress={() => navigateTo('previousworkout')}
//           onPressIn={() => handlePressIn('previousworkout')}
//           onPressOut={handlePressOut}
//         >
//           <MaterialCommunityIcons
//             name={
//               currentTab === 'previousworkout'
//                 ? 'calendar-month'
//                 : 'calendar-month-outline'
//             }
//             size={35}
//             color={getIconColor('previousworkout')}
//           />
//           <Text className="mt-1 text-center text-sm text-gray-400">Log</Text>
//         </TouchableOpacity>
//       </View>

//       <View className="flex-1 items-center">
//         <TouchableOpacity
//           className="mb-1 items-center justify-center"
//           onPress={() => navigateTo('dataanalytics')}
//           onPressIn={() => handlePressIn('dataanalytics')}
//           onPressOut={handlePressOut}
//         >
//           <MaterialCommunityIcons
//             name={currentTab === 'dataanalytics' ? 'graph' : 'graph-outline'}
//             size={35}
//             color={getIconColor('dataanalytics')}
//           />
//           <Text className="mt-1 text-center text-sm text-gray-400">
//             Analysis
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }
