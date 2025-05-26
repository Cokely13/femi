// import React from "react";
// import { Text, Image, StyleSheet, ImageBackground, View } from "react-native";

// function WelcomeScreen(props) {
//   return (
//     <ImageBackground
//       style={styles.container}
//       source={require("../assets/icon.png")}
//       resizeMode="cover"
//     >
//       <View style={styles.content}>
//         <Text style={styles.text}>Welcome to the App</Text>
//         <View style={styles.loginButton} />
//         <View style={styles.registerButton} />
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   loginButton: {
//     width: 50,
//     height: 70,
//     backgroundColor: "#fc5c65",
//     marginTop: 20,
//     marginLeft: 0,
//     borderWidth: 2,
//     borderColor: "green", // or any contrasting color
//   },
//   registerButton: {
//     width: 50,
//     height: 70,
//     backgroundColor: "#4ecdc4",
//     marginTop: 0,
//     marginLeft: 0,
//     borderWidth: 2,
//     borderColor: "green", // or any contrasting color
//   },
// });

// export default WelcomeScreen;

import React from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";

function WelcomeScreen({ navigation }) {
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
          onPress={() => navigation.navigate("Steps")}
        >
          <Text style={styles.buttonText}>Track Steps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Food")}
        >
          <Text style={styles.buttonText}>Track Food</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Sleep")}
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
