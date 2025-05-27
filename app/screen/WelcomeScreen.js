// import React from "react";
// import {
//   Text,
//   StyleSheet,
//   ImageBackground,
//   View,
//   TouchableOpacity,
// } from "react-native";

// function WelcomeScreen({ navigation }) {
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
//           onPress={() => navigation.navigate("Steps")}
//         >
//           <Text style={styles.buttonText}>Track Steps</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("Food")}
//         >
//           <Text style={styles.buttonText}>Track Food</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("Sleep")}
//         >
//           <Text style={styles.buttonText}>Track Sleep</Text>
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
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     textAlign: "center",
//   },
// });

// export default WelcomeScreen;

import React, { useEffect, useState } from "react";
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

  const BASE_URL = "http://192.168.1.166:8080"; // ← Use your local IP
  const userId = 1;

  useEffect(() => {
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
      } catch (err) {
        console.error("Failed to load user data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
          <Text style={styles.buttonText}>Track Steps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Food", { food: userData.food })}
        >
          <Text style={styles.buttonText}>Track Food</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Sleep", { sleep: userData.sleep })
          }
        >
          <Text style={styles.buttonText}>Track Sleep</Text>
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default WelcomeScreen;
