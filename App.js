// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Image,
//   TouchableHighlight,
//   Pressable,
// } from "react-native";
// import { TouchableWithoutFeedback } from "react-native-web";
// import WelcomeScreen from "./app/screen/WelcomeScreen";

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <WelcomeScreen />
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./app/screen/WelcomeScreen";

// You’ll create these later
import StepsScreen from "./app/screen/StepsScreen";
import FoodScreen from "./app/screen/FoodScreen";
import SleepScreen from "./app/screen/SleepScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Steps" component={StepsScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="Sleep" component={SleepScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
