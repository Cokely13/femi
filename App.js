import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Provider } from "react-redux";
// import store from "./app/store"; //

// Screens
import WelcomeScreen from "./app/screen/WelcomeScreen";
import StepsScreen from "./app/screen/StepsScreen";
import FoodScreen from "./app/screen/FoodScreen";
import SleepScreen from "./app/screen/SleepScreen";
import EnterInfoScreen from "./app/screen/EnterInfoScreen";
import EnterGoals from "./app/screen/EnterGoals"; //
import TodayGoals from "./app/screen/TodayGoals";
import GoalTimerScreen from "./app/screen/GoalTimerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="TodayGoals" component={TodayGoals} />
        <Stack.Screen name="GoalTimer" component={GoalTimerScreen} />
        <Stack.Screen name="Steps" component={StepsScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="Sleep" component={SleepScreen} />
        <Stack.Screen name="EnterInfo" component={EnterInfoScreen} />
        <Stack.Screen name="EnterGoals" component={EnterGoals} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}
