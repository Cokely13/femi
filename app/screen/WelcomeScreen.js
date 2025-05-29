// import React, { useEffect, useState } from "react";
// import { useFocusEffect } from "@react-navigation/native";
// import {
//   Text,
//   StyleSheet,
//   ImageBackground,
//   View,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";

// function WelcomeScreen({ navigation }) {
//   const [userData, setUserData] = useState({
//     sleep: [],
//     food: [],
//     steps: [],
//   });
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = "http://192.168.1.166:8080"; // ← Use your local IP
//   const userId = 1;

//   useFocusEffect(
//     React.useCallback(() => {
//       const fetchUserData = async () => {
//         try {
//           const [sleepRes, foodRes, stepsRes] = await Promise.all([
//             fetch(`${BASE_URL}/api/sleeps?userId=${userId}`),
//             fetch(`${BASE_URL}/api/foods?userId=${userId}`),
//             fetch(`${BASE_URL}/api/steps?userId=${userId}`),
//           ]);

//           const [sleep, food, steps] = await Promise.all([
//             sleepRes.json(),
//             foodRes.json(),
//             stepsRes.json(),
//           ]);

//           setUserData({ sleep, food, steps });
//           setLoading(false);
//         } catch (err) {
//           console.error("Failed to load user data", err);
//           setLoading(false);
//         }
//       };

//       fetchUserData();
//     }, [])
//   );

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#1e90ff" />
//         <Text style={{ marginTop: 10 }}>Loading your data...</Text>
//       </View>
//     );
//   }

//   return (
//     <ImageBackground
//       style={styles.container}
//       source={require("../assets/icon.png")}
//       resizeMode="cover"
//     >
//       <View style={styles.content}>
//         <Text style={styles.title}>Welcome to WellnessTracker</Text>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() =>
//             navigation.navigate("Steps", { steps: userData.steps })
//           }
//         >
//           <Text style={styles.buttonText}>View Step History</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("Food", { food: userData.food })}
//         >
//           <Text style={styles.buttonText}>View Food History</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() =>
//             navigation.navigate("Sleep", { sleep: userData.sleep })
//           }
//         >
//           <Text style={styles.buttonText}>View Sleep History</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.inputButton]}
//           onPress={
//             () => navigation.navigate("EnterInfo", { userId, BASE_URL }) // pass this for reuse
//           }
//         >
//           <Text style={styles.buttonText}>Enter Today’s Info</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   content: {
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 30,
//     color: "#333",
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#1e90ff",
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 8,
//     marginVertical: 10,
//     width: 200,
//   },
//   inputButton: {
//     backgroundColor: "#4CAF50",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     textAlign: "center",
//   },
// });

// export default WelcomeScreen;

import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

function WelcomeScreen({ navigation }) {
  const [userData, setUserData] = useState({
    sleep: [],
    food: [],
    steps: [],
  });
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://192.168.1.166:8080"; // your local IP
  const userId = 1;

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const [sleepRes, foodRes, stepsRes] = await Promise.all([
            fetch(`${BASE_URL}/api/sleeps?userId=${userId}`),
            fetch(`${BASE_URL}/api/foods?userId=${userId}`),
            fetch(`${BASE_URL}/api/steps?userId=${userId}`),
          ]);

          const [sleep, food, steps] = await Promise.all([
            sleepRes.json(),
            foodRes.json(),
            stepsRes.json(),
          ]);

          setUserData({ sleep, food, steps });
          setLoading(false);
        } catch (err) {
          console.error("Failed to load user data", err);
          setLoading(false);
        }
      };

      fetchUserData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={{ marginTop: 10 }}>Loading your data...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/icon.png")}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to WellnessTracker</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Steps", { steps: userData.steps })
          }
        >
          <Text style={styles.buttonText}>View Step History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Food", { food: userData.food })}
        >
          <Text style={styles.buttonText}>View Food History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Sleep", { sleep: userData.sleep })
          }
        >
          <Text style={styles.buttonText}>View Sleep History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.inputButton]}
          onPress={() => navigation.navigate("EnterInfo", { userId, BASE_URL })}
        >
          <Text style={styles.buttonText}>Enter Today’s Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.goalButton]}
          onPress={() =>
            navigation.navigate("EnterGoals", { userId, BASE_URL })
          }
        >
          <Text style={styles.buttonText}>Enter or View Goals</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: 200,
  },
  inputButton: {
    backgroundColor: "#4CAF50",
  },
  goalButton: {
    backgroundColor: "#FF8C00",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default WelcomeScreen;
